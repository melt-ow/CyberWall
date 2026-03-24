import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import StageSelectScreen from './src/screens/StageSelectScreen';
import BattleScreen from './src/screens/BattleScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultScreen from './src/screens/ResultScreen';
import UnitGuideScreen from './src/screens/UnitGuideScreen';
import EnemyGuideScreen from './src/screens/EnemyGuideScreen';
import { getStageById } from './src/data/stages';
import { getRandomQuizzes } from './src/data/quizzes';
import { saveStageResult } from './src/utils/storage';
import { StageData, QuizQuestion } from './src/types/game';

type Screen = 'home' | 'stageSelect' | 'battle' | 'quiz' | 'result' | 'unitGuide' | 'enemyGuide';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [currentStage, setCurrentStage] = useState<StageData | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<QuizQuestion | null>(null);
  const [quizResult, setQuizResult] = useState<{ correct: boolean } | null>(null);
  const [resultData, setResultData] = useState<{
    stars: number;
    score: number;
    quizCorrect: number;
    quizTotal: number;
    livesRemaining: number;
  } | null>(null);
  const quizQueueRef = useRef<QuizQuestion[]>([]);

  const handleNavigate = useCallback((target: string) => {
    setScreen(target as Screen);
  }, []);

  const handleSelectStage = useCallback((stageId: number) => {
    const stage = getStageById(stageId);
    if (!stage) {
      Alert.alert('エラー', 'ステージデータが見つかりません');
      return;
    }
    setCurrentStage(stage);
    setQuizResult(null);
    setResultData(null);
    // Pre-load quiz questions for this stage
    const categories = getCategoriesForChapter(stage.chapter);
    quizQueueRef.current = getRandomQuizzes(stage.waves.length + 2, categories);
    setScreen('battle');
  }, []);

  const handleQuizTrigger = useCallback(() => {
    const quiz = quizQueueRef.current.shift();
    if (quiz) {
      setCurrentQuiz(quiz);
      setScreen('quiz');
    }
  }, []);

  const handleQuizAnswer = useCallback((correct: boolean) => {
    setQuizResult({ correct });
    setTimeout(() => {
      setScreen('battle');
    }, 500);
  }, []);

  const handleBattleComplete = useCallback(
    async (stars: number, score: number, quizCorrect: number, quizTotal: number) => {
      if (!currentStage) return;

      const livesRemaining = stars > 0 ? Math.max(1, currentStage.lives) : 0;

      if (stars > 0) {
        const quizAcc = quizTotal > 0 ? quizCorrect / quizTotal : 1;
        await saveStageResult(currentStage.id, stars, score, quizAcc);
      }

      setResultData({ stars, score, quizCorrect, quizTotal, livesRemaining });
      setScreen('result');
    },
    [currentStage]
  );

  const handleNextStage = useCallback(() => {
    if (!currentStage || currentStage.id >= 50) return;
    handleSelectStage(currentStage.id + 1);
  }, [currentStage, handleSelectStage]);

  const handleRetry = useCallback(() => {
    if (!currentStage) return;
    handleSelectStage(currentStage.id);
  }, [currentStage, handleSelectStage]);

  const handleBattleBack = useCallback(() => {
    Alert.alert(
      'ゲームを中断',
      'ステージ選択に戻りますか？\n進行状況は保存されません。',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '戻る', onPress: () => setScreen('stageSelect') },
      ]
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {screen === 'home' && <HomeScreen onNavigate={handleNavigate} />}

      {screen === 'stageSelect' && (
        <StageSelectScreen
          onNavigate={handleNavigate}
          onSelectStage={handleSelectStage}
        />
      )}

      {screen === 'battle' && currentStage && (
        <BattleScreen
          stage={currentStage}
          onComplete={handleBattleComplete}
          onQuizTrigger={handleQuizTrigger}
          quizResult={quizResult}
          onBack={handleBattleBack}
        />
      )}

      {screen === 'quiz' && currentQuiz && (
        <QuizScreen question={currentQuiz} onAnswer={handleQuizAnswer} />
      )}

      {screen === 'result' && currentStage && resultData && (
        <ResultScreen
          stage={currentStage}
          stars={resultData.stars}
          score={resultData.score}
          quizCorrect={resultData.quizCorrect}
          quizTotal={resultData.quizTotal}
          livesRemaining={resultData.livesRemaining}
          onNext={handleNextStage}
          onRetry={handleRetry}
          onHome={() => setScreen('stageSelect')}
        />
      )}

      {screen === 'unitGuide' && (
        <UnitGuideScreen onBack={() => setScreen('home')} />
      )}

      {screen === 'enemyGuide' && (
        <EnemyGuideScreen onBack={() => setScreen('home')} />
      )}
    </View>
  );
}

function getCategoriesForChapter(chapter: number): string[] {
  switch (chapter) {
    case 1:
      return ['phishing', 'password', 'social_engineering'];
    case 2:
      return ['wifi', 'malware', 'phishing', 'password'];
    case 3:
      return ['encryption', 'backup', 'access_control'];
    case 4:
      return ['incident_response', 'access_control', 'encryption', 'advanced'];
    case 5:
      return ['advanced', 'incident_response', 'encryption'];
    default:
      return ['phishing'];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
});
