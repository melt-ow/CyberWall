import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerData, StageProgress } from '../types/game';

const PLAYER_DATA_KEY = 'cyberwall_player_data';

const DEFAULT_PLAYER_DATA: PlayerData = {
  stageProgress: {},
  totalScore: 0,
  highestStage: 0,
};

export async function loadPlayerData(): Promise<PlayerData> {
  try {
    const data = await AsyncStorage.getItem(PLAYER_DATA_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return { ...DEFAULT_PLAYER_DATA };
  } catch {
    return { ...DEFAULT_PLAYER_DATA };
  }
}

export async function savePlayerData(data: PlayerData): Promise<void> {
  try {
    await AsyncStorage.setItem(PLAYER_DATA_KEY, JSON.stringify(data));
  } catch {
    // silently fail
  }
}

export async function saveStageResult(
  stageId: number,
  stars: number,
  score: number,
  quizAccuracy: number
): Promise<PlayerData> {
  const data = await loadPlayerData();
  const existing = data.stageProgress[stageId];

  data.stageProgress[stageId] = {
    stageId,
    cleared: true,
    stars: existing ? Math.max(existing.stars, stars) : stars,
    bestScore: existing ? Math.max(existing.bestScore, score) : score,
    quizAccuracy: existing ? Math.max(existing.quizAccuracy, quizAccuracy) : quizAccuracy,
  };

  if (stageId > data.highestStage) {
    data.highestStage = stageId;
  }

  data.totalScore = Object.values(data.stageProgress).reduce(
    (sum, p) => sum + p.bestScore,
    0
  );

  await savePlayerData(data);
  return data;
}

export async function resetProgress(): Promise<void> {
  await AsyncStorage.removeItem(PLAYER_DATA_KEY);
}
