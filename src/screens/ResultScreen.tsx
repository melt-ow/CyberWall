import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { COLORS } from '../utils/theme';
import { StageData } from '../types/game';

interface Props {
  stage: StageData;
  stars: number;
  score: number;
  quizCorrect: number;
  quizTotal: number;
  livesRemaining: number;
  onNext: () => void;
  onRetry: () => void;
  onHome: () => void;
}

export default function ResultScreen({
  stage,
  stars,
  score,
  quizCorrect,
  quizTotal,
  livesRemaining,
  onNext,
  onRetry,
  onHome,
}: Props) {
  const scaleAnim = useState(new Animated.Value(0.5))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];
  const cleared = stars > 0;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const quizAccuracy =
    quizTotal > 0 ? Math.round((quizCorrect / quizTotal) * 100) : 100;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.resultCard, { transform: [{ scale: scaleAnim }] }]}
      >
        <Text style={styles.resultTitle}>
          {cleared ? 'STAGE CLEAR!' : 'GAME OVER'}
        </Text>
        <Text style={styles.stageName}>
          Stage {stage.id}: {stage.name}
        </Text>

        {/* Stars */}
        <View style={styles.starsRow}>
          {[1, 2, 3].map(i => (
            <Text
              key={i}
              style={[styles.star, i <= stars && styles.starActive]}
            >
              ★
            </Text>
          ))}
        </View>

        {/* Stats */}
        <Animated.View style={[styles.stats, { opacity: fadeAnim }]}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>スコア</Text>
            <Text style={styles.statValue}>{score.toLocaleString()}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>判断正答率</Text>
            <Text
              style={[
                styles.statValue,
                {
                  color:
                    quizAccuracy >= 80
                      ? COLORS.success
                      : quizAccuracy >= 50
                      ? COLORS.warning
                      : COLORS.danger,
                },
              ]}
            >
              {quizAccuracy}%
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>残りライフ</Text>
            <Text style={styles.statValue}>❤️ {livesRemaining}</Text>
          </View>
        </Animated.View>

        {/* Learning tip */}
        <Animated.View style={[styles.tipCard, { opacity: fadeAnim }]}>
          <Text style={styles.tipTitle}>📖 今日の学び</Text>
          <Text style={styles.tipText}>{stage.learningTip}</Text>
        </Animated.View>
      </Animated.View>

      {/* Buttons */}
      <Animated.View style={[styles.buttons, { opacity: fadeAnim }]}>
        {cleared && stage.id < 50 && (
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>次のステージへ →</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>もう一度プレイ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeButton} onPress={onHome}>
          <Text style={styles.homeButtonText}>ステージ選択に戻る</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  resultCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 4,
  },
  stageName: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  star: {
    fontSize: 40,
    color: COLORS.textMuted,
  },
  starActive: {
    color: COLORS.gold,
  },
  stats: {
    width: '100%',
    gap: 8,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.bg,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  tipCard: {
    width: '100%',
    backgroundColor: COLORS.primary + '10',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.primary + '30',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
  buttons: {
    marginTop: 24,
    gap: 10,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.bg,
  },
  retryButton: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  homeButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
