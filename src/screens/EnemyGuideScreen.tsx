import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/theme';
import { ENEMIES } from '../data/enemies';

interface Props {
  onBack: () => void;
}

export default function EnemyGuideScreen({ onBack }: Props) {
  const basicEnemies = ENEMIES.filter(e => !e.isAdvanced);
  const advancedEnemies = ENEMIES.filter(e => e.isAdvanced);

  const renderEnemyCard = (enemy: typeof ENEMIES[0]) => (
    <View key={enemy.id} style={[styles.card, { borderLeftColor: enemy.color }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.icon}>{enemy.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{enemy.name}</Text>
          {enemy.isAdvanced && (
            <Text style={styles.advancedBadge}>上級</Text>
          )}
        </View>
      </View>
      <Text style={styles.description}>{enemy.description}</Text>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>HP</Text>
          <Text style={styles.statValue}>{enemy.hp}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>速度</Text>
          <Text style={styles.statValue}>{enemy.speed}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>報酬</Text>
          <Text style={[styles.statValue, { color: COLORS.gold }]}>{enemy.reward}G</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← 戻る</Text>
        </TouchableOpacity>
        <Text style={styles.title}>サイバー攻撃図鑑</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.sectionTitle}>初級ステージ（一般社員向け）</Text>
        {basicEnemies.map(renderEnemyCard)}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
          上級ステージ（IT部門向け）
        </Text>
        {advancedEnemies.map(renderEnemyCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingTop: 60 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 16,
  },
  backButton: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.warning,
    marginBottom: 10,
  },
  list: { paddingHorizontal: 16, gap: 12, paddingBottom: 40 },
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  icon: { fontSize: 36 },
  name: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  advancedBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.danger,
    backgroundColor: COLORS.danger + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  description: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 10 },
  statsRow: { flexDirection: 'row', gap: 16 },
  stat: { alignItems: 'center' },
  statLabel: { fontSize: 11, color: COLORS.textMuted },
  statValue: { fontSize: 16, fontWeight: '700', color: COLORS.text },
});
