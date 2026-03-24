import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { COLORS } from '../utils/theme';
import { loadPlayerData } from '../utils/storage';
import { PlayerData } from '../types/game';

const { width } = Dimensions.get('window');

const CHAPTERS = [
  { id: 1, name: '新入社員編', color: '#4FC3F7', stages: '1-10', difficulty: 'EASY' },
  { id: 2, name: 'リモートワーク編', color: '#66BB6A', stages: '11-20', difficulty: 'NORMAL' },
  { id: 3, name: '情報漏洩防止編', color: '#FFA726', stages: '21-30', difficulty: 'HARD' },
  { id: 4, name: 'IT管理者編', color: '#EF5350', stages: '31-40', difficulty: 'EXPERT' },
  { id: 5, name: '専門家編', color: '#AB47BC', stages: '41-50', difficulty: 'MASTER' },
];

interface Props {
  onNavigate: (screen: string) => void;
  onSelectStage: (stageId: number) => void;
}

export default function StageSelectScreen({ onNavigate, onSelectStage }: Props) {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [selectedChapter, setSelectedChapter] = useState(1);

  useEffect(() => {
    loadPlayerData().then(setPlayerData);
  }, []);

  const highestStage = playerData?.highestStage ?? 0;

  const getStageStatus = (stageId: number) => {
    if (stageId === 1) return 'unlocked';
    if (stageId <= highestStage + 1) return 'unlocked';
    return 'locked';
  };

  const getStageStars = (stageId: number): number => {
    return playerData?.stageProgress[stageId]?.stars ?? 0;
  };

  const chapter = CHAPTERS[selectedChapter - 1];
  const startStage = (selectedChapter - 1) * 10 + 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('home')}>
          <Text style={styles.backButton}>← 戻る</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ステージ選択</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chapterTabs}
        contentContainerStyle={styles.chapterTabsContent}
      >
        {CHAPTERS.map(ch => (
          <TouchableOpacity
            key={ch.id}
            style={[
              styles.chapterTab,
              selectedChapter === ch.id && {
                backgroundColor: ch.color + '30',
                borderColor: ch.color,
              },
            ]}
            onPress={() => setSelectedChapter(ch.id)}
          >
            <Text
              style={[
                styles.chapterTabText,
                selectedChapter === ch.id && { color: ch.color },
              ]}
            >
              {ch.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.chapterInfo}>
        <View style={[styles.difficultyBadge, { backgroundColor: chapter.color + '30' }]}>
          <Text style={[styles.difficultyText, { color: chapter.color }]}>
            {chapter.difficulty}
          </Text>
        </View>
        <Text style={styles.chapterTitle}>{chapter.name}</Text>
        <Text style={styles.chapterStages}>STAGE {chapter.stages}</Text>
      </View>

      <ScrollView style={styles.stageGrid} contentContainerStyle={styles.stageGridContent}>
        <View style={styles.stageRow}>
          {Array.from({ length: 10 }, (_, i) => {
            const stageId = startStage + i;
            const status = getStageStatus(stageId);
            const stars = getStageStars(stageId);
            const isUnlocked = status === 'unlocked';

            return (
              <TouchableOpacity
                key={stageId}
                style={[
                  styles.stageCard,
                  !isUnlocked && styles.stageCardLocked,
                  stars > 0 && styles.stageCardCleared,
                ]}
                onPress={() => isUnlocked && onSelectStage(stageId)}
                disabled={!isUnlocked}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.stageNumber,
                    !isUnlocked && styles.stageNumberLocked,
                  ]}
                >
                  {stageId}
                </Text>
                {stars > 0 ? (
                  <Text style={styles.stars}>
                    {'★'.repeat(stars)}
                    {'☆'.repeat(3 - stars)}
                  </Text>
                ) : isUnlocked ? (
                  <Text style={styles.stageNew}>NEW</Text>
                ) : (
                  <Text style={styles.stageLock}>🔒</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 16,
  },
  backButton: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },
  chapterTabs: {
    maxHeight: 50,
    marginBottom: 16,
  },
  chapterTabsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chapterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bgCard,
  },
  chapterTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  chapterInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
  },
  chapterTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  chapterStages: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  stageGrid: {
    flex: 1,
  },
  stageGridContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  stageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  stageCard: {
    width: (width - 80) / 3,
    aspectRatio: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageCardLocked: {
    opacity: 0.4,
  },
  stageCardCleared: {
    borderColor: COLORS.primary + '60',
    backgroundColor: COLORS.primary + '10',
  },
  stageNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 4,
  },
  stageNumberLocked: {
    color: COLORS.textMuted,
  },
  stars: {
    fontSize: 14,
    color: COLORS.gold,
  },
  stageNew: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  stageLock: {
    fontSize: 16,
  },
});
