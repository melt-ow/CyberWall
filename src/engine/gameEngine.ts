import { ActiveEnemy, GameState, PlacedUnit, StageData, Wave } from '../types/game';
import { getEnemyById } from '../data/enemies';
import { getUnitById } from '../data/units';

let enemyCounter = 0;

export function createInitialState(stage: StageData): GameState {
  enemyCounter = 0;
  return {
    gold: stage.startingGold,
    lives: stage.lives,
    score: 0,
    wave: 0,
    phase: 'prep',
    placedUnits: [],
    activeEnemies: [],
    quizCorrect: 0,
    quizTotal: 0,
    damageDealt: 0,
  };
}

export function canPlaceUnit(
  state: GameState,
  unitId: string,
  row: number,
  col: number,
  mapLayout: number[][]
): boolean {
  const unit = getUnitById(unitId);
  if (!unit) return false;
  if (state.gold < unit.cost) return false;
  if (mapLayout[row]?.[col] !== 1) return false;
  if (state.placedUnits.some(u => u.row === row && u.col === col)) return false;
  return true;
}

export function placeUnit(
  state: GameState,
  unitId: string,
  row: number,
  col: number
): GameState {
  const unit = getUnitById(unitId);
  if (!unit) return state;

  return {
    ...state,
    gold: state.gold - unit.cost,
    placedUnits: [
      ...state.placedUnits,
      { unitId, row, col, level: 1, lastFireTime: 0 },
    ],
  };
}

export function spawnEnemy(enemyId: string, stage: StageData): ActiveEnemy | null {
  const enemy = getEnemyById(enemyId);
  if (!enemy) return null;

  // Scale HP based on stage
  const hpScale = 1 + (stage.id - 1) * 0.05;

  return {
    enemyId,
    hp: Math.round(enemy.hp * hpScale),
    maxHp: Math.round(enemy.hp * hpScale),
    pathIndex: 0,
    progress: 0,
    id: ++enemyCounter,
  };
}

export function updateEnemies(
  enemies: ActiveEnemy[],
  path: [number, number][],
  deltaTime: number
): { enemies: ActiveEnemy[]; leaked: number } {
  let leaked = 0;
  const updated: ActiveEnemy[] = [];

  for (const enemy of enemies) {
    if (enemy.hp <= 0) continue;

    const enemyDef = getEnemyById(enemy.enemyId);
    if (!enemyDef) continue;

    let { pathIndex, progress } = enemy;
    progress += (enemyDef.speed * deltaTime) / 1000;

    while (progress >= 1 && pathIndex < path.length - 1) {
      progress -= 1;
      pathIndex++;
    }

    if (pathIndex >= path.length - 1 && progress >= 1) {
      leaked++;
      continue;
    }

    updated.push({ ...enemy, pathIndex, progress });
  }

  return { enemies: updated, leaked };
}

function getEnemyPosition(
  enemy: ActiveEnemy,
  path: [number, number][]
): { x: number; y: number } {
  const idx = Math.min(enemy.pathIndex, path.length - 1);
  const nextIdx = Math.min(idx + 1, path.length - 1);
  const [r1, c1] = path[idx];
  const [r2, c2] = path[nextIdx];
  const p = Math.min(enemy.progress, 1);

  return {
    x: c1 + (c2 - c1) * p,
    y: r1 + (r2 - r1) * p,
  };
}

export function processAttacks(
  units: PlacedUnit[],
  enemies: ActiveEnemy[],
  path: [number, number][],
  currentTime: number
): { enemies: ActiveEnemy[]; units: PlacedUnit[]; goldEarned: number; damageDealt: number } {
  let goldEarned = 0;
  let damageDealt = 0;
  const updatedEnemies = enemies.map(e => ({ ...e }));
  const updatedUnits = units.map(u => ({ ...u }));

  for (const unit of updatedUnits) {
    const unitDef = getUnitById(unit.unitId);
    if (!unitDef) continue;

    const adjustedFireRate = unitDef.fireRate / (1 + (unit.level - 1) * 0.2);
    if (currentTime - unit.lastFireTime < adjustedFireRate) continue;

    // Find closest enemy in range
    let closest: { enemy: ActiveEnemy; dist: number } | null = null;
    for (const enemy of updatedEnemies) {
      if (enemy.hp <= 0) continue;
      const pos = getEnemyPosition(enemy, path);
      const dx = pos.x - unit.col;
      const dy = pos.y - unit.row;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const adjustedRange = unitDef.range + (unit.level - 1) * 0.3;
      if (dist <= adjustedRange) {
        if (!closest || dist < closest.dist) {
          closest = { enemy, dist };
        }
      }
    }

    if (closest) {
      const dmg = unitDef.damage * (1 + (unit.level - 1) * 0.3);
      closest.enemy.hp -= dmg;
      damageDealt += dmg;
      unit.lastFireTime = currentTime;

      if (closest.enemy.hp <= 0) {
        const enemyDef = getEnemyById(closest.enemy.enemyId);
        if (enemyDef) {
          goldEarned += enemyDef.reward;
        }
      }
    }
  }

  return {
    enemies: updatedEnemies.filter(e => e.hp > 0),
    units: updatedUnits,
    goldEarned,
    damageDealt,
  };
}

export function upgradeUnit(
  state: GameState,
  row: number,
  col: number
): GameState {
  const unitIndex = state.placedUnits.findIndex(
    u => u.row === row && u.col === col
  );
  if (unitIndex === -1) return state;

  const unit = state.placedUnits[unitIndex];
  if (unit.level >= 3) return state;

  const unitDef = getUnitById(unit.unitId);
  if (!unitDef) return state;

  const upgradeCost = Math.round(unitDef.cost * 0.75 * unit.level);
  if (state.gold < upgradeCost) return state;

  const newUnits = [...state.placedUnits];
  newUnits[unitIndex] = { ...unit, level: unit.level + 1 };

  return {
    ...state,
    gold: state.gold - upgradeCost,
    placedUnits: newUnits,
  };
}

export function calculateStars(
  livesRemaining: number,
  totalLives: number,
  quizAccuracy: number
): number {
  const lifeRatio = livesRemaining / totalLives;
  if (lifeRatio >= 0.8 && quizAccuracy >= 0.8) return 3;
  if (lifeRatio >= 0.5 && quizAccuracy >= 0.5) return 2;
  return 1;
}

export { getEnemyPosition };
