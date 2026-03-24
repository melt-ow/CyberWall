export interface DefenseUnit {
  id: string;
  name: string;
  icon: string;
  cost: number;
  damage: number;
  range: number;
  fireRate: number; // ms between attacks
  description: string;
  color: string;
  levelUpBonus: string;
}

export interface Enemy {
  id: string;
  name: string;
  icon: string;
  hp: number;
  speed: number; // cells per second
  reward: number;
  description: string;
  color: string;
  isAdvanced: boolean;
}

export interface PlacedUnit {
  unitId: string;
  row: number;
  col: number;
  level: number;
  lastFireTime: number;
}

export interface ActiveEnemy {
  enemyId: string;
  hp: number;
  maxHp: number;
  pathIndex: number;
  progress: number; // 0-1 between path points
  id: number; // unique instance id
}

export interface Wave {
  enemies: { enemyId: string; count: number; interval: number }[];
  delay: number; // delay before wave starts
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface StageData {
  id: number;
  name: string;
  chapter: number;
  chapterName: string;
  difficulty: 'EASY' | 'NORMAL' | 'HARD' | 'EXPERT' | 'MASTER';
  description: string;
  waves: Wave[];
  quizIds: string[];
  mapLayout: number[][]; // 0=path, 1=placeable, 2=blocked
  path: [number, number][];
  startingGold: number;
  lives: number;
  learningTip: string;
}

export interface GameState {
  gold: number;
  lives: number;
  score: number;
  wave: number;
  phase: 'prep' | 'battle' | 'quiz' | 'result';
  placedUnits: PlacedUnit[];
  activeEnemies: ActiveEnemy[];
  quizCorrect: number;
  quizTotal: number;
  damageDealt: number;
}

export interface StageProgress {
  stageId: number;
  cleared: boolean;
  stars: number; // 1-3
  bestScore: number;
  quizAccuracy: number;
}

export interface PlayerData {
  stageProgress: { [stageId: number]: StageProgress };
  totalScore: number;
  highestStage: number;
}
