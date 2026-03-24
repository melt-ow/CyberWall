import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { COLORS } from '../utils/theme';
import { QuizQuestion } from '../types/game';

interface Props {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
}

export default function QuizScreen({ question, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setShowResult(true);

    setTimeout(() => {
      onAnswer(index === question.correctIndex);
    }, 2500);
  };

  const isCorrect = selected === question.correctIndex;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.badge}>⚡ 判断ポイント</Text>
        <Text style={styles.categoryBadge}>{question.category}</Text>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>

      <View style={styles.options}>
        {question.options.map((option, index) => {
          let optionStyle = styles.option;
          let textStyle = styles.optionText;

          if (showResult) {
            if (index === question.correctIndex) {
              optionStyle = { ...styles.option, ...styles.optionCorrect };
              textStyle = { ...styles.optionText, ...styles.optionTextCorrect };
            } else if (index === selected) {
              optionStyle = { ...styles.option, ...styles.optionWrong };
              textStyle = { ...styles.optionText, ...styles.optionTextWrong };
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={[
                optionStyle,
                selected === index && !showResult && styles.optionSelected,
              ]}
              onPress={() => handleSelect(index)}
              disabled={selected !== null}
              activeOpacity={0.7}
            >
              <Text style={styles.optionNumber}>
                {String.fromCharCode(65 + index)}
              </Text>
              <Text style={[textStyle, { flex: 1 }]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {showResult && (
        <View style={styles.resultContainer}>
          <View
            style={[
              styles.resultBadge,
              { backgroundColor: isCorrect ? COLORS.success + '20' : COLORS.danger + '20' },
            ]}
          >
            <Text
              style={[
                styles.resultText,
                { color: isCorrect ? COLORS.success : COLORS.danger },
              ]}
            >
              {isCorrect ? '✓ 正解！ +50G & +200pts' : '✗ 不正解… 敵が出現！'}
            </Text>
          </View>
          <Text style={styles.explanation}>{question.explanation}</Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  badge: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.warning,
  },
  categoryBadge: {
    backgroundColor: COLORS.accent + '20',
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  questionCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 28,
  },
  options: {
    gap: 10,
  },
  option: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent + '10',
  },
  optionCorrect: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '15',
  },
  optionWrong: {
    borderColor: COLORS.danger,
    backgroundColor: COLORS.danger + '15',
  },
  optionNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textMuted,
    width: 24,
  },
  optionText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
  },
  optionTextCorrect: {
    color: COLORS.success,
    fontWeight: '600',
  },
  optionTextWrong: {
    color: COLORS.danger,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultBadge: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  explanation: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    backgroundColor: COLORS.bgCard,
    padding: 16,
    borderRadius: 12,
  },
});
