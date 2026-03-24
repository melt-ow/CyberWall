import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { COLORS, CELL_SIZE } from '../utils/theme';
import { DEFENSE_UNITS, getUnitById } from '../data/units';
import { getEnemyById } from '../data/enemies';
import {
  createInitialState,
  canPlaceUnit,
  placeUnit,
  spawnEnemy,
  updateEnemies,
  processAttacks,
  upgradeUnit,
  calculateStars,
  getEnemyPosition,
} from '../engine/gameEngine';
import { GameState, StageData, ActiveEnemy } from '../types/game';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_COLS = 8;
const GRID_ROWS = 6;
const ACTUAL_CELL = Math.floor((SCREEN_WIDTH - 32) / GRID_COLS);

interface Props {
  stage: StageData;
  onComplete: (stars: number, score: number, quizCorrect: number, quizTotal: number) => void;
  onQuizTrigger: () => void;
  quizResult: { correct: boolean } | null;
  onBack: () => void;
}

export default function BattleScreen({
  stage,
  onComplete,
  onQuizTrigger,
  quizResult,
  onBack,
}: Props) {
  const [gameState, setGameState] = useState<GameState>(createInitialState(stage));
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [waveEnemyQueue, setWaveEnemyQueue] = useState<
    { enemyId: string; spawnTime: number }[]
  >([]);
  const [battleStartTime, setBattleStartTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showPrepMessage, setShowPrepMessage] = useState(true);
  const [quizTriggered, setQuizTriggered] = useState(false);
  const [waveCleared, setWaveCleared] = useState(false);
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastTickRef = useRef(0);

  // Handle quiz result
  useEffect(() => {
    if (quizResult && quizTriggered) {
      setGameState(prev => {
        const newState = { ...prev };
        newState.quizTotal += 1;
        if (quizResult.correct) {
          newState.quizCorrect += 1;
          newState.gold += 50;
          newState.score += 200;
        } else {
          // Spawn penalty enemy
          const penaltyEnemy = spawnEnemy('phishing', stage);
          if (penaltyEnemy) {
            newState.activeEnemies = [...newState.activeEnemies, penaltyEnemy];
          }
        }
        return newState;
      });
      setQuizTriggered(false);
    }
  }, [quizResult]);

  // Start battle phase
  const startBattle = useCallback(() => {
    setShowPrepMessage(false);
    setGameState(prev => ({ ...prev, phase: 'battle' }));
    setBattleStartTime(Date.now());
    lastTickRef.current = Date.now();

    // Build enemy queue for current wave
    const wave = stage.waves[gameState.wave];
    if (!wave) return;

    const queue: { enemyId: string; spawnTime: number }[] = [];
    let time = wave.delay || 0;
    for (const group of wave.enemies) {
      for (let i = 0; i < group.count; i++) {
        queue.push({ enemyId: group.enemyId, spawnTime: time });
        time += group.interval;
      }
    }
    setWaveEnemyQueue(queue);
  }, [gameState.wave, stage]);

  // Game loop
  useEffect(() => {
    if (gameState.phase !== 'battle' || isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    gameLoopRef.current = setInterval(() => {
      const now = Date.now();
      const deltaTime = now - lastTickRef.current;
      lastTickRef.current = now;
      const elapsed = now - battleStartTime;

      setGameState(prev => {
        if (prev.phase !== 'battle') return prev;

        let newState = { ...prev };

        // Spawn enemies from queue
        setWaveEnemyQueue(prevQueue => {
          const toSpawn = prevQueue.filter(e => e.spawnTime * 1000 <= elapsed);
          const remaining = prevQueue.filter(e => e.spawnTime * 1000 > elapsed);

          if (toSpawn.length > 0) {
            const newEnemies = toSpawn
              .map(e => spawnEnemy(e.enemyId, stage))
              .filter(Boolean) as ActiveEnemy[];
            newState.activeEnemies = [...newState.activeEnemies, ...newEnemies];
          }

          return remaining;
        });

        // Update enemy positions
        const { enemies: movedEnemies, leaked } = updateEnemies(
          newState.activeEnemies,
          stage.path,
          deltaTime
        );
        newState.activeEnemies = movedEnemies;
        newState.lives -= leaked;

        // Process attacks
        const { enemies: attackedEnemies, units, goldEarned, damageDealt } =
          processAttacks(newState.placedUnits, newState.activeEnemies, stage.path, now);
        newState.activeEnemies = attackedEnemies;
        newState.placedUnits = units;
        newState.gold += goldEarned;
        newState.score += goldEarned * 10;
        newState.damageDealt += damageDealt;

        // Check game over
        if (newState.lives <= 0) {
          newState.lives = 0;
          newState.phase = 'result';
          return newState;
        }

        return newState;
      });
    }, 100);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState.phase, isPaused, battleStartTime, stage]);

  // Check wave completion
  useEffect(() => {
    if (gameState.phase !== 'battle') return;

    setWaveEnemyQueue(prev => {
      if (prev.length === 0 && gameState.activeEnemies.length === 0 && battleStartTime > 0) {
        // Wave cleared
        const nextWave = gameState.wave + 1;

        // Trigger quiz between waves
        if (!quizTriggered && stage.quizIds.length > 0 && nextWave <= stage.waves.length) {
          setQuizTriggered(true);
          onQuizTrigger();
          return prev;
        }

        if (nextWave >= stage.waves.length) {
          // All waves cleared
          setGameState(p => ({ ...p, phase: 'result' }));
        } else {
          // Next wave
          setGameState(p => ({ ...p, wave: nextWave, phase: 'prep' }));
          setShowPrepMessage(true);
        }
      }
      return prev;
    });
  }, [gameState.activeEnemies.length, gameState.phase, waveEnemyQueue]);

  // Auto complete when result phase
  useEffect(() => {
    if (gameState.phase === 'result') {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      const quizAcc =
        gameState.quizTotal > 0
          ? gameState.quizCorrect / gameState.quizTotal
          : 1;
      const stars =
        gameState.lives > 0
          ? calculateStars(gameState.lives, stage.lives, quizAcc)
          : 0;
      setTimeout(() => {
        onComplete(stars, gameState.score, gameState.quizCorrect, gameState.quizTotal);
      }, 500);
    }
  }, [gameState.phase]);

  const handleCellPress = (row: number, col: number) => {
    if (gameState.phase === 'result') return;

    // Check if there's already a unit here
    const existing = gameState.placedUnits.find(
      u => u.row === row && u.col === col
    );
    if (existing) {
      const unitDef = getUnitById(existing.unitId);
      if (existing.level < 3 && unitDef) {
        const cost = Math.round(unitDef.cost * 0.75 * existing.level);
        Alert.alert(
          `${unitDef.icon} ${unitDef.name} Lv.${existing.level}`,
          `Lv.${existing.level + 1}にアップグレード？\nコスト: ${cost}G`,
          [
            { text: 'キャンセル', style: 'cancel' },
            {
              text: 'アップグレード',
              onPress: () => setGameState(prev => upgradeUnit(prev, row, col)),
            },
          ]
        );
      }
      return;
    }

    if (selectedUnit && canPlaceUnit(gameState, selectedUnit, row, col, stage.mapLayout)) {
      setGameState(prev => placeUnit(prev, selectedUnit, row, col));
    }
  };

  const renderGrid = () => {
    const rows = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      const cells = [];
      for (let c = 0; c < GRID_COLS; c++) {
        const cellType = stage.mapLayout[r]?.[c] ?? 2;
        const placedUnit = gameState.placedUnits.find(
          u => u.row === r && u.col === c
        );
        const isPath = cellType === 0;
        const isPlaceable = cellType === 1;
        const canPlace =
          selectedUnit &&
          canPlaceUnit(gameState, selectedUnit, r, c, stage.mapLayout);

        cells.push(
          <TouchableOpacity
            key={`${r}-${c}`}
            style={[
              styles.cell,
              {
                width: ACTUAL_CELL,
                height: ACTUAL_CELL,
              },
              isPath && styles.cellPath,
              isPlaceable && styles.cellPlaceable,
              !isPath && !isPlaceable && styles.cellBlocked,
              canPlace && styles.cellHighlight,
            ]}
            onPress={() => handleCellPress(r, c)}
            activeOpacity={0.7}
          >
            {placedUnit && (
              <View style={styles.unitOnGrid}>
                <Text style={styles.unitEmoji}>
                  {getUnitById(placedUnit.unitId)?.icon}
                </Text>
                {placedUnit.level > 1 && (
                  <Text style={styles.unitLevel}>Lv{placedUnit.level}</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      }
      rows.push(
        <View key={r} style={styles.gridRow}>
          {cells}
        </View>
      );
    }
    return rows;
  };

  const renderEnemies = () => {
    return gameState.activeEnemies.map(enemy => {
      const pos = getEnemyPosition(enemy, stage.path);
      const enemyDef = getEnemyById(enemy.enemyId);
      if (!enemyDef) return null;

      const hpPercent = enemy.hp / enemy.maxHp;

      return (
        <View
          key={enemy.id}
          style={[
            styles.enemySprite,
            {
              left: 16 + pos.x * ACTUAL_CELL + ACTUAL_CELL * 0.1,
              top: pos.y * ACTUAL_CELL + ACTUAL_CELL * 0.1,
              width: ACTUAL_CELL * 0.8,
              height: ACTUAL_CELL * 0.8,
            },
          ]}
        >
          <Text style={styles.enemyEmoji}>{enemyDef.icon}</Text>
          <View style={styles.hpBarBg}>
            <View
              style={[
                styles.hpBar,
                {
                  width: `${hpPercent * 100}%`,
                  backgroundColor:
                    hpPercent > 0.5 ? COLORS.success : hpPercent > 0.25 ? COLORS.warning : COLORS.danger,
                },
              ]}
            />
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* Top HUD */}
      <View style={styles.hud}>
        <TouchableOpacity onPress={onBack} style={styles.hudButton}>
          <Text style={styles.hudButtonText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.hudInfo}>
          <Text style={styles.hudText}>❤️ {gameState.lives}</Text>
          <Text style={styles.hudText}>💰 {gameState.gold}</Text>
          <Text style={styles.hudText}>
            Wave {gameState.wave + 1}/{stage.waves.length}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsPaused(!isPaused)}
          style={styles.hudButton}
        >
          <Text style={styles.hudButtonText}>{isPaused ? '▶' : '⏸'}</Text>
        </TouchableOpacity>
      </View>

      {/* Stage name */}
      <View style={styles.stageHeader}>
        <Text style={styles.stageName}>
          Stage {stage.id}: {stage.name}
        </Text>
        <Text style={styles.stageChapter}>{stage.chapterName}</Text>
      </View>

      {/* Game Grid */}
      <View style={styles.gridContainer}>
        {renderGrid()}
        {renderEnemies()}
      </View>

      {/* Prep phase message */}
      {showPrepMessage && gameState.phase === 'prep' && (
        <View style={styles.prepOverlay}>
          <Text style={styles.prepTitle}>準備フェーズ</Text>
          <Text style={styles.prepSub}>
            ユニットを配置してください
          </Text>
          <TouchableOpacity style={styles.startButton} onPress={startBattle}>
            <Text style={styles.startButtonText}>
              Wave {gameState.wave + 1} 開始
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Unit selector */}
      <View style={styles.unitSelector}>
        <Text style={styles.unitSelectorTitle}>防御ユニット</Text>
        <View style={styles.unitList}>
          {DEFENSE_UNITS.map(unit => {
            const affordable = gameState.gold >= unit.cost;
            const isSelected = selectedUnit === unit.id;
            return (
              <TouchableOpacity
                key={unit.id}
                style={[
                  styles.unitCard,
                  isSelected && { borderColor: unit.color, backgroundColor: unit.color + '20' },
                  !affordable && styles.unitCardDisabled,
                ]}
                onPress={() =>
                  affordable && setSelectedUnit(isSelected ? null : unit.id)
                }
                activeOpacity={0.7}
              >
                <Text style={styles.unitCardEmoji}>{unit.icon}</Text>
                <Text
                  style={[
                    styles.unitCardCost,
                    !affordable && { color: COLORS.danger },
                  ]}
                >
                  {unit.cost}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Score display */}
      <View style={styles.scoreBar}>
        <Text style={styles.scoreText}>
          Score: {gameState.score.toLocaleString()}
        </Text>
        {gameState.quizTotal > 0 && (
          <Text style={styles.scoreText}>
            クイズ: {gameState.quizCorrect}/{gameState.quizTotal}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 50,
  },
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  hudButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.bgCard,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hudButtonText: {
    fontSize: 16,
    color: COLORS.text,
  },
  hudInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  hudText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  stageHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  stageName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  stageChapter: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  gridContainer: {
    marginHorizontal: 16,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gridRow: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: COLORS.border + '40',
  },
  cellPath: {
    backgroundColor: COLORS.path,
  },
  cellPlaceable: {
    backgroundColor: COLORS.placeable,
  },
  cellBlocked: {
    backgroundColor: COLORS.blocked,
  },
  cellHighlight: {
    backgroundColor: COLORS.primary + '30',
    borderColor: COLORS.primary + '60',
  },
  unitOnGrid: {
    alignItems: 'center',
  },
  unitEmoji: {
    fontSize: ACTUAL_CELL * 0.5,
  },
  unitLevel: {
    fontSize: 8,
    color: COLORS.gold,
    fontWeight: '700',
  },
  enemySprite: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enemyEmoji: {
    fontSize: ACTUAL_CELL * 0.45,
  },
  hpBarBg: {
    width: '100%',
    height: 3,
    backgroundColor: COLORS.bgCard,
    borderRadius: 2,
    marginTop: 1,
  },
  hpBar: {
    height: '100%',
    borderRadius: 2,
  },
  prepOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 22, 40, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  prepTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 8,
  },
  prepSub: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.bg,
  },
  unitSelector: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  unitSelectorTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  unitList: {
    flexDirection: 'row',
    gap: 8,
  },
  unitCard: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  unitCardDisabled: {
    opacity: 0.4,
  },
  unitCardEmoji: {
    fontSize: 22,
    marginBottom: 2,
  },
  unitCardCost: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gold,
  },
  scoreBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
});
