import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { COLORS } from '../utils/theme';
import { loadPlayerData } from '../utils/storage';
import { PlayerData } from '../types/game';

const { width } = Dimensions.get('window');

interface Props {
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: Props) {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  useEffect(() => {
    loadPlayerData().then(setPlayerData);
  }, []);

  const highestStage = playerData?.highestStage ?? 0;
  const totalScore = playerData?.totalScore ?? 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <View style={styles.header}>
        <Text style={styles.badge}>GAME PROPOSAL 2026</Text>
        <Text style={styles.title}>CyberWall</Text>
        <Text style={styles.subtitle}>
          サイバーセキュリティ × タワーディフェンス
        </Text>
        <Text style={styles.description}>
          遊びながら学ぶ、全社員向けセキュリティ研修ゲーム
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {highestStage > 0 ? `Stage ${highestStage}` : '---'}
          </Text>
          <Text style={styles.statLabel}>最高到達</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>
            {totalScore > 0 ? totalScore.toLocaleString() : '---'}
          </Text>
          <Text style={styles.statLabel}>トータルスコア</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => onNavigate('stageSelect')}
          activeOpacity={0.8}
        >
          <Text style={styles.playButtonText}>ステージ選択</Text>
          <Text style={styles.playButtonSub}>全50ステージ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => onNavigate('unitGuide')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>防御ユニット図鑑</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => onNavigate('enemyGuide')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>サイバー攻撃図鑑</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        Let's build a safer digital world — one game at a time.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  badge: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  buttons: {
    gap: 12,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.bg,
  },
  playButtonSub: {
    fontSize: 12,
    color: COLORS.bgLight,
    marginTop: 2,
  },
  secondaryButton: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.textMuted,
  },
});
