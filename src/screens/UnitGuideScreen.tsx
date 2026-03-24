import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/theme';
import { DEFENSE_UNITS } from '../data/units';

interface Props {
  onBack: () => void;
}

export default function UnitGuideScreen({ onBack }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← 戻る</Text>
        </TouchableOpacity>
        <Text style={styles.title}>防御ユニット一覧</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
        {DEFENSE_UNITS.map(unit => (
          <View key={unit.id} style={[styles.card, { borderLeftColor: unit.color }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.icon}>{unit.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{unit.name}</Text>
                <Text style={[styles.cost, { color: COLORS.gold }]}>
                  コスト: {unit.cost}
                </Text>
              </View>
            </View>
            <Text style={styles.description}>{unit.description}</Text>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>攻撃力</Text>
                <Text style={styles.statValue}>{unit.damage}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>射程</Text>
                <Text style={styles.statValue}>{unit.range}</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>攻撃速度</Text>
                <Text style={styles.statValue}>{unit.fireRate}ms</Text>
              </View>
            </View>
            <Text style={styles.levelUp}>📈 {unit.levelUpBonus}</Text>
          </View>
        ))}
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
  cost: { fontSize: 14, fontWeight: '600' },
  description: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 10 },
  statsRow: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  stat: { alignItems: 'center' },
  statLabel: { fontSize: 11, color: COLORS.textMuted },
  statValue: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  levelUp: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
});
