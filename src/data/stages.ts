import { StageData, Wave } from '../types/game';

// ============================================================
// Map Layout Legend:
//   0 = path (enemies walk here)
//   1 = placeable (units can be placed)
//   2 = blocked / decoration
// Grid: 8 columns x 6 rows  (mapLayout[row][col])
// ============================================================

// ----- PATH PATTERN A: Straight horizontal (top) -----
// Enemies go left-to-right across row 1
const mapA: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 1, 2, 1, 2, 1, 2],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
const pathA: [number, number][] = [
  [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
];

// ----- PATH PATTERN B: L-shape (down then right) -----
const mapB: number[][] = [
  [0, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 2, 1, 1, 2, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 2, 1, 1, 2, 1, 1],
];
const pathB: [number, number][] = [
  [0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7],
];

// ----- PATH PATTERN C: S-curve -----
const mapC: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0],
];
const pathC: [number, number][] = [
  [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
  [2, 6], [3, 6], [3, 5], [3, 4], [3, 3], [3, 2], [3, 1],
  [4, 1], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7],
];

// ----- PATH PATTERN D: Zigzag vertical -----
const mapD: number[][] = [
  [0, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 2, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 2, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
];
const pathD: [number, number][] = [
  [0, 0], [0, 1], [1, 1], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5],
  [3, 5], [4, 5], [4, 6], [4, 7], [5, 7],
];

// ----- PATH PATTERN E: U-turn -----
const mapE: number[][] = [
  [0, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 2, 1],
  [1, 2, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1],
  [1, 2, 1, 0, 1, 2, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0],
];
const pathE: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
  [5, 3], [5, 4], [5, 5], [5, 6], [5, 7],
];

// ----- PATH PATTERN F: Spiral-ish (for advanced chapters) -----
const mapF: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1],
];
const pathF: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 6], [2, 6], [3, 6], [4, 6], [4, 5], [4, 4],
  [3, 4], [2, 4], [2, 3], [2, 2], [2, 1],
  [3, 1], [4, 1], [5, 1], [5, 2], [5, 3], [5, 4],
];

// ----- PATH PATTERN G: Diagonal steps -----
const mapG: number[][] = [
  [0, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 1, 2, 1, 1],
  [1, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 1, 2, 1],
  [1, 2, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 0, 0],
];
const pathG: [number, number][] = [
  [0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3], [3, 3], [3, 4], [4, 4], [4, 5], [5, 5], [5, 6], [5, 7],
];

// ----- PATH PATTERN H: Double-back (hard) -----
const mapH: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
];
const pathH: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [1, 7], [2, 7], [2, 6], [2, 5], [2, 4], [2, 3], [2, 2], [2, 1], [2, 0],
  [3, 0], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7],
  [5, 7],
];

// ----- PATH PATTERN I: Cross pattern (expert) -----
const mapI: number[][] = [
  [1, 1, 1, 0, 1, 1, 1, 1],
  [1, 2, 1, 0, 1, 2, 1, 1],
  [1, 1, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1],
  [1, 2, 1, 1, 2, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 0],
];
const pathI: [number, number][] = [
  [0, 3], [1, 3], [2, 3], [2, 4], [2, 5], [2, 6], [3, 6], [4, 6], [5, 6], [5, 7],
];

// ----- PATH PATTERN J: Long winding (master) -----
const mapJ: number[][] = [
  [0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 1, 1, 1, 1],
];
const pathJ: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 3], [2, 4], [1, 4],
  [0, 4], [0, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6],
  [4, 5], [4, 4], [4, 3], [4, 2], [4, 1], [4, 0], [5, 0],
];

// ============================================================
//  STAGES: All 50 stages
// ============================================================

export const STAGES: StageData[] = [
  // ========================================
  // Chapter 1: 新入社員編 (Stages 1-10)
  // ========================================
  {
    id: 1,
    name: '初めてのセキュリティ',
    chapter: 1,
    chapterName: '新入社員編',
    difficulty: 'EASY',
    description: '会社のネットワークを守る第一歩。フィッシング攻撃を防ごう！',
    waves: [
      {
        enemies: [{ enemyId: 'phishing', count: 3, interval: 2000 }],
        delay: 1000,
      },
    ],
    quizIds: ['q001', 'q002', 'q003'],
    mapLayout: mapA,
    path: pathA,
    startingGold: 500,
    lives: 20,
    learningTip: 'フィッシングメールは送信元アドレスを必ず確認しましょう。',
  },
  {
    id: 2,
    name: 'パスワードの壁',
    chapter: 1,
    chapterName: '新入社員編',
    difficulty: 'EASY',
    description: 'ブルートフォース攻撃からアカウントを守れ！',
    waves: [
      {
        enemies: [{ enemyId: 'bruteforce', count: 4, interval: 1800 }],
        delay: 1000,
      },
    ],
    quizIds: ['q004', 'q005', 'q006'],
    mapLayout: mapA,
    path: pathA,
    startingGold: 480,
    lives: 20,
    learningTip: '強いパスワードは英数字・記号を組み合わせて12文字以上にしましょう。',
  },
  {
    id: 3,
    name: '不審なUSB',
    chapter: 1,
    chapterName: '新入社員編',
    difficulty: 'EASY',
    description: '拾ったUSBメモリに潜むマルウェアに注意！',
    waves: [
      {
        enemies: [{ enemyId: 'usb_malware', count: 3, interval: 2000 }],
        delay: 1000,
      },
    ],
    quizIds: ['q007', 'q008', 'q009'],
    mapLayout: mapB,
    path: pathB,
    startingGold: 480,
    lives: 20,
    learningTip: '出所不明のUSBメモリは絶対にPCに接続しないでください。',
  },
  {
    id: 4,
    name: 'メールの罠',
    chapter: 1,
    chapterName: '新入社員編',
    difficulty: 'EASY',
    description: '巧妙なフィッシングメールが増えてきた！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 4, interval: 1800 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 3, interval: 1500 },
        ],
        delay: 3000,
      },
    ],
    quizIds: ['q001', 'q010', 'q011'],
    mapLayout: mapB,
    path: pathB,
    startingGold: 460,
    lives: 20,
    learningTip: 'メール内のリンクはクリックせず、公式サイトから直接アクセスしましょう。',
  },
  {
    id: 5,
    name: '複合攻撃・入門',
    chapter: 1,
    chapterName: '新入社員編',
    difficulty: 'EASY',
    description: 'フィッシングとブルートフォースの同時攻撃！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 3, interval: 2000 },
          { enemyId: 'bruteforce', count: 2, interval: 2500 },
        ],
        delay: 1000,
      },
    ],
    quizIds: ['q002', 'q005', 'q012'],
    mapLayout: mapC,
    path: pathC,
    startingGold: 450,
    lives: 20,
    learningTip: '多層防御の考え方が重要です。一つの対策だけに頼らないようにしましょう。',
  },
  {
    id: 6,
    name: 'ソーシャルエンジニアリング',
    chapter: 1,
    chapterName: '新入社員編',
    difficulty: 'EASY',
    description: '人の心理を突く攻撃が迫る！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 5, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 3, interval: 1800 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q013', 'q014', 'q015'],
    mapLayout: mapC,
    path: pathC,
    startingGold: 440,
    lives: 20,
    learningTip: '電話やメールで個人情報を聞かれたら、必ず本人確認をしましょう。',
  },
  {
    id: 7,
    name: 'USB拡散',
    chapter: 1,
    chapterName: '新入社員編',
    difficulty: 'EASY',
    description: 'USBマルウェアが社内に広がろうとしている！',
    waves: [
      {
        enemies: [
          { enemyId: 'usb_malware', count: 4, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'usb_malware', count: 3, interval: 1200 },
          { enemyId: 'phishing', count: 2, interval: 2000 },
        ],
        delay: 3000,
      },
    ],
    quizIds: ['q007', 'q016', 'q017'],
    mapLayout: mapD,
    path: pathD,
    startingGold: 430,
    lives: 20,
    learningTip: 'USBデバイスの利用ポリシーを確認し、許可されたデバイスのみ使用しましょう。',
  },
  {
    id: 8,
    name: 'パスワード総当たり',
    chapter: 1,
    chapterName: '新入社員編',
    difficulty: 'EASY',
    description: '大量のブルートフォース攻撃が来る！',
    waves: [
      {
        enemies: [
          { enemyId: 'bruteforce', count: 5, interval: 1200 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 4, interval: 1000 },
          { enemyId: 'phishing', count: 2, interval: 1500 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q004', 'q018', 'q019'],
    mapLayout: mapD,
    path: pathD,
    startingGold: 420,
    lives: 20,
    learningTip: '二要素認証を有効にすれば、パスワードが漏れても被害を防げます。',
  },
  {
    id: 9,
    name: '新入社員の試練',
    chapter: 1,
    chapterName: '新入社員編',
    difficulty: 'EASY',
    description: '3種類の攻撃に同時に対処せよ！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 3, interval: 1500 },
          { enemyId: 'bruteforce', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'usb_malware', count: 4, interval: 1200 },
          { enemyId: 'phishing', count: 3, interval: 1500 },
        ],
        delay: 3000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q003', 'q006', 'q009', 'q020'],
    mapLayout: mapE,
    path: pathE,
    startingGold: 400,
    lives: 20,
    learningTip: 'セキュリティは一人ひとりの意識が大切。不審に思ったらすぐ報告しましょう。',
  },
  {
    id: 10,
    name: '新入社員・最終試験',
    chapter: 1,
    chapterName: '新入社員編',
    difficulty: 'EASY',
    description: 'チャプター1のボスステージ！全力で防衛せよ！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 5, interval: 1200 },
          { enemyId: 'bruteforce', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'usb_malware', count: 5, interval: 1000 },
          { enemyId: 'phishing', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 6, interval: 800 },
          { enemyId: 'usb_malware', count: 3, interval: 1200 },
          { enemyId: 'phishing', count: 3, interval: 1200 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q001', 'q004', 'q007', 'q010', 'q020'],
    mapLayout: mapC,
    path: pathC,
    startingGold: 400,
    lives: 20,
    learningTip: '基本的なセキュリティ対策を習慣にすることが、最大の防御です。',
  },

  // ========================================
  // Chapter 2: リモートワーク編 (Stages 11-20)
  // ========================================
  {
    id: 11,
    name: 'リモートワーク開始',
    chapter: 2,
    chapterName: 'リモートワーク編',
    difficulty: 'NORMAL',
    description: '在宅勤務が始まった。自宅のネットワークを守ろう！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 4, interval: 1500 },
          { enemyId: 'fake_wifi', count: 2, interval: 2000 },
        ],
        delay: 1000,
      },
    ],
    quizIds: ['q021', 'q022', 'q023'],
    mapLayout: mapC,
    path: pathC,
    startingGold: 420,
    lives: 18,
    learningTip: '自宅Wi-Fiのパスワードは初期値から変更し、WPA3を使いましょう。',
  },
  {
    id: 12,
    name: 'フリーWi-Fiの危険',
    chapter: 2,
    chapterName: 'リモートワーク編',
    difficulty: 'NORMAL',
    description: 'カフェの無料Wi-Fiに罠が！',
    waves: [
      {
        enemies: [
          { enemyId: 'fake_wifi', count: 5, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 3, interval: 1500 },
          { enemyId: 'fake_wifi', count: 2, interval: 2000 },
        ],
        delay: 3000,
      },
    ],
    quizIds: ['q024', 'q025', 'q026'],
    mapLayout: mapD,
    path: pathD,
    startingGold: 400,
    lives: 18,
    learningTip: '公共Wi-Fiでは必ずVPNを使用し、重要な通信を保護しましょう。',
  },
  {
    id: 13,
    name: 'ランサムウェアの脅威',
    chapter: 2,
    chapterName: 'リモートワーク編',
    difficulty: 'NORMAL',
    description: 'ランサムウェアがPCを狙っている！',
    waves: [
      {
        enemies: [
          { enemyId: 'ransomware', count: 2, interval: 3000 },
          { enemyId: 'phishing', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
    ],
    quizIds: ['q027', 'q028', 'q029'],
    mapLayout: mapE,
    path: pathE,
    startingGold: 400,
    lives: 18,
    learningTip: 'ランサムウェア対策には、定期的なバックアップが最も有効です。',
  },
  {
    id: 14,
    name: 'VPN突破',
    chapter: 2,
    chapterName: 'リモートワーク編',
    difficulty: 'NORMAL',
    description: 'VPN接続を狙った攻撃が増加中！',
    waves: [
      {
        enemies: [
          { enemyId: 'bruteforce', count: 5, interval: 1200 },
          { enemyId: 'fake_wifi', count: 3, interval: 1800 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q030', 'q031', 'q032'],
    mapLayout: mapD,
    path: pathD,
    startingGold: 380,
    lives: 18,
    learningTip: 'VPNのソフトウェアは常に最新版にアップデートしましょう。',
  },
  {
    id: 15,
    name: 'テレワーク狙い撃ち',
    chapter: 2,
    chapterName: 'リモートワーク編',
    difficulty: 'NORMAL',
    description: 'リモート環境を狙った複合攻撃！',
    waves: [
      {
        enemies: [
          { enemyId: 'fake_wifi', count: 3, interval: 1500 },
          { enemyId: 'ransomware', count: 2, interval: 2500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 5, interval: 1000 },
          { enemyId: 'bruteforce', count: 3, interval: 1500 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q021', 'q027', 'q033'],
    mapLayout: mapC,
    path: pathC,
    startingGold: 370,
    lives: 18,
    learningTip: 'リモートワーク中も、会社のセキュリティポリシーを必ず守りましょう。',
  },
  {
    id: 16,
    name: 'ビデオ会議の落とし穴',
    chapter: 2,
    chapterName: 'リモートワーク編',
    difficulty: 'NORMAL',
    description: 'オンライン会議ツールを悪用した攻撃に注意！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 4, interval: 1200 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'fake_wifi', count: 4, interval: 1200 },
          { enemyId: 'ransomware', count: 2, interval: 2000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 4, interval: 1000 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q034', 'q035', 'q036'],
    mapLayout: mapE,
    path: pathE,
    startingGold: 360,
    lives: 18,
    learningTip: 'ビデオ会議のリンクやパスワードはSNSで共有しないでください。',
  },
  {
    id: 17,
    name: '個人デバイスのリスク',
    chapter: 2,
    chapterName: 'リモートワーク編',
    difficulty: 'NORMAL',
    description: 'BYOD環境での攻撃を防げ！',
    waves: [
      {
        enemies: [
          { enemyId: 'usb_malware', count: 4, interval: 1200 },
          { enemyId: 'ransomware', count: 2, interval: 2000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'fake_wifi', count: 3, interval: 1500 },
          { enemyId: 'phishing', count: 4, interval: 1200 },
        ],
        delay: 3000,
      },
    ],
    quizIds: ['q037', 'q038', 'q039'],
    mapLayout: mapF,
    path: pathF,
    startingGold: 350,
    lives: 18,
    learningTip: '個人デバイスでも、ウイルス対策ソフトを必ずインストールしましょう。',
  },
  {
    id: 18,
    name: 'クラウドへの攻撃',
    chapter: 2,
    chapterName: 'リモートワーク編',
    difficulty: 'NORMAL',
    description: 'クラウドストレージが攻撃のターゲットに！',
    waves: [
      {
        enemies: [
          { enemyId: 'bruteforce', count: 5, interval: 1000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 3, interval: 1800 },
          { enemyId: 'phishing', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'fake_wifi', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q040', 'q041', 'q042'],
    mapLayout: mapF,
    path: pathF,
    startingGold: 340,
    lives: 18,
    learningTip: 'クラウドサービスの共有設定を定期的に確認しましょう。',
  },
  {
    id: 19,
    name: 'リモートワークの防衛線',
    chapter: 2,
    chapterName: 'リモートワーク編',
    difficulty: 'NORMAL',
    description: '全方位からの攻撃を防ぎきれ！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 4, interval: 1000 },
          { enemyId: 'fake_wifi', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 3, interval: 1500 },
          { enemyId: 'bruteforce', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'usb_malware', count: 4, interval: 1200 },
          { enemyId: 'fake_wifi', count: 3, interval: 1200 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q022', 'q028', 'q035', 'q043'],
    mapLayout: mapG,
    path: pathG,
    startingGold: 330,
    lives: 18,
    learningTip: 'ゼロトラストの考え方を取り入れ、常に検証を行いましょう。',
  },
  {
    id: 20,
    name: 'リモートワーク・最終防衛',
    chapter: 2,
    chapterName: 'リモートワーク編',
    difficulty: 'NORMAL',
    description: 'チャプター2のボスステージ！大規模攻撃を防げ！',
    waves: [
      {
        enemies: [
          { enemyId: 'fake_wifi', count: 5, interval: 1000 },
          { enemyId: 'phishing', count: 5, interval: 1000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 4, interval: 1500 },
          { enemyId: 'bruteforce', count: 6, interval: 800 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'fake_wifi', count: 4, interval: 1000 },
          { enemyId: 'ransomware', count: 3, interval: 1500 },
          { enemyId: 'usb_malware', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 6, interval: 800 },
          { enemyId: 'ransomware', count: 3, interval: 1200 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q024', 'q027', 'q030', 'q038', 'q043'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 350,
    lives: 18,
    learningTip: 'リモートワークのセキュリティは、技術と意識の両方が必要です。',
  },

  // ========================================
  // Chapter 3: 情報漏洩防止編 (Stages 21-30)
  // ========================================
  {
    id: 21,
    name: 'データ保護の基本',
    chapter: 3,
    chapterName: '情報漏洩防止編',
    difficulty: 'HARD',
    description: '機密データを守る戦いが始まる！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 5, interval: 1200 },
          { enemyId: 'bruteforce', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 3, interval: 1500 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q044', 'q045', 'q046'],
    mapLayout: mapF,
    path: pathF,
    startingGold: 350,
    lives: 15,
    learningTip: '機密情報は暗号化して保存・送信しましょう。',
  },
  {
    id: 22,
    name: '暗号化の盾',
    chapter: 3,
    chapterName: '情報漏洩防止編',
    difficulty: 'HARD',
    description: '暗号化されていないデータが狙われている！',
    waves: [
      {
        enemies: [
          { enemyId: 'bruteforce', count: 6, interval: 1000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 4, interval: 1200 },
          { enemyId: 'ransomware', count: 2, interval: 2000 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q047', 'q048', 'q049'],
    mapLayout: mapG,
    path: pathG,
    startingGold: 340,
    lives: 15,
    learningTip: 'メールで機密ファイルを送る時は、パスワード付きZIPではなくクラウド共有を使いましょう。',
  },
  {
    id: 23,
    name: '内部不正への備え',
    chapter: 3,
    chapterName: '情報漏洩防止編',
    difficulty: 'HARD',
    description: '内部からの情報漏洩を防げ！',
    waves: [
      {
        enemies: [
          { enemyId: 'usb_malware', count: 5, interval: 1000 },
          { enemyId: 'phishing', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 4, interval: 1200 },
          { enemyId: 'ransomware', count: 2, interval: 2000 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q050', 'q051', 'q052'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 330,
    lives: 15,
    learningTip: 'アクセス権限は最小権限の原則に基づいて設定しましょう。',
  },
  {
    id: 24,
    name: 'メール誤送信',
    chapter: 3,
    chapterName: '情報漏洩防止編',
    difficulty: 'HARD',
    description: 'ヒューマンエラーによる漏洩を防げ！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 6, interval: 1000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'fake_wifi', count: 4, interval: 1200 },
          { enemyId: 'ransomware', count: 3, interval: 1500 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q053', 'q054', 'q055'],
    mapLayout: mapC,
    path: pathC,
    startingGold: 320,
    lives: 15,
    learningTip: 'メール送信前に宛先・添付ファイルを必ずダブルチェックしましょう。',
  },
  {
    id: 25,
    name: 'SNS漏洩',
    chapter: 3,
    chapterName: '情報漏洩防止編',
    difficulty: 'HARD',
    description: 'SNSからの情報漏洩が増加中！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 5, interval: 1000 },
          { enemyId: 'fake_wifi', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 5, interval: 1000 },
          { enemyId: 'ransomware', count: 2, interval: 2000 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q056', 'q057', 'q058'],
    mapLayout: mapG,
    path: pathG,
    startingGold: 320,
    lives: 15,
    learningTip: '業務に関する情報をSNSに投稿しないようにしましょう。',
  },
  {
    id: 26,
    name: 'ログ監視の重要性',
    chapter: 3,
    chapterName: '情報漏洩防止編',
    difficulty: 'HARD',
    description: '不正アクセスの痕跡を見逃すな！',
    waves: [
      {
        enemies: [
          { enemyId: 'bruteforce', count: 6, interval: 900 },
          { enemyId: 'phishing', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 3, interval: 1500 },
          { enemyId: 'fake_wifi', count: 3, interval: 1500 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'usb_malware', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q059', 'q060', 'q061'],
    mapLayout: mapF,
    path: pathF,
    startingGold: 310,
    lives: 15,
    learningTip: 'アクセスログを定期的に確認し、不審な活動を早期発見しましょう。',
  },
  {
    id: 27,
    name: 'DLP導入',
    chapter: 3,
    chapterName: '情報漏洩防止編',
    difficulty: 'HARD',
    description: 'データ損失防止の仕組みを活用せよ！',
    waves: [
      {
        enemies: [
          { enemyId: 'ransomware', count: 4, interval: 1200 },
          { enemyId: 'phishing', count: 4, interval: 1200 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 5, interval: 1000 },
          { enemyId: 'usb_malware', count: 3, interval: 1500 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'fake_wifi', count: 4, interval: 1000 },
          { enemyId: 'ransomware', count: 2, interval: 1800 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q062', 'q063', 'q064'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 300,
    lives: 15,
    learningTip: 'DLP（データ損失防止）ツールで、機密データの不正な持ち出しを検知できます。',
  },
  {
    id: 28,
    name: 'クラウド情報管理',
    chapter: 3,
    chapterName: '情報漏洩防止編',
    difficulty: 'HARD',
    description: 'クラウド上のデータを守り抜け！',
    waves: [
      {
        enemies: [
          { enemyId: 'bruteforce', count: 6, interval: 900 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 5, interval: 1000 },
          { enemyId: 'fake_wifi', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 4, interval: 1200 },
          { enemyId: 'usb_malware', count: 3, interval: 1500 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q040', 'q065', 'q066'],
    mapLayout: mapD,
    path: pathD,
    startingGold: 300,
    lives: 15,
    learningTip: 'クラウドの共有リンクには有効期限とアクセス制限を設定しましょう。',
  },
  {
    id: 29,
    name: '情報漏洩の連鎖',
    chapter: 3,
    chapterName: '情報漏洩防止編',
    difficulty: 'HARD',
    description: '漏洩が連鎖する危機を食い止めろ！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 5, interval: 1000 },
          { enemyId: 'ransomware', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 6, interval: 800 },
          { enemyId: 'fake_wifi', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'usb_malware', count: 5, interval: 1000 },
          { enemyId: 'ransomware', count: 3, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 6, interval: 800 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q045', 'q052', 'q060', 'q067'],
    mapLayout: mapF,
    path: pathF,
    startingGold: 290,
    lives: 15,
    learningTip: 'インシデント発生時は初動対応が重要。報告・連絡・相談を徹底しましょう。',
  },
  {
    id: 30,
    name: '情報漏洩防止・最終決戦',
    chapter: 3,
    chapterName: '情報漏洩防止編',
    difficulty: 'HARD',
    description: 'チャプター3のボスステージ！全データを死守せよ！',
    waves: [
      {
        enemies: [
          { enemyId: 'phishing', count: 6, interval: 800 },
          { enemyId: 'bruteforce', count: 5, interval: 1000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 5, interval: 1000 },
          { enemyId: 'fake_wifi', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'usb_malware', count: 5, interval: 1000 },
          { enemyId: 'bruteforce', count: 6, interval: 800 },
          { enemyId: 'phishing', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 4, interval: 1000 },
          { enemyId: 'fake_wifi', count: 4, interval: 1000 },
          { enemyId: 'usb_malware', count: 4, interval: 1000 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q044', 'q050', 'q056', 'q062', 'q067'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 300,
    lives: 15,
    learningTip: '情報漏洩は会社の信頼を大きく損なう。予防と早期対応が鍵です。',
  },

  // ========================================
  // Chapter 4: IT管理者編 (Stages 31-40)
  // ========================================
  {
    id: 31,
    name: 'ゼロデイの衝撃',
    chapter: 4,
    chapterName: 'IT管理者編',
    difficulty: 'EXPERT',
    description: '未知の脆弱性を突く攻撃が発生！',
    waves: [
      {
        enemies: [
          { enemyId: 'zeroday', count: 2, interval: 3000 },
          { enemyId: 'phishing', count: 4, interval: 1200 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'bruteforce', count: 5, interval: 1000 },
          { enemyId: 'ransomware', count: 3, interval: 1500 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q068', 'q069', 'q070'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 320,
    lives: 12,
    learningTip: 'ゼロデイ攻撃にはパッチ適用だけでなく、WAFやIPS等の多層防御が必要です。',
  },
  {
    id: 32,
    name: 'DDoS攻撃',
    chapter: 4,
    chapterName: 'IT管理者編',
    difficulty: 'EXPERT',
    description: '大量のトラフィックでサーバーが危ない！',
    waves: [
      {
        enemies: [
          { enemyId: 'ddos', count: 8, interval: 600 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'ddos', count: 6, interval: 500 },
          { enemyId: 'phishing', count: 3, interval: 1500 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q071', 'q072', 'q073'],
    mapLayout: mapF,
    path: pathF,
    startingGold: 310,
    lives: 12,
    learningTip: 'DDoS対策にはCDN・レートリミット・トラフィック分析が有効です。',
  },
  {
    id: 33,
    name: 'SQLインジェクション',
    chapter: 4,
    chapterName: 'IT管理者編',
    difficulty: 'EXPERT',
    description: 'データベースを狙った攻撃を防げ！',
    waves: [
      {
        enemies: [
          { enemyId: 'sql_injection', count: 4, interval: 1500 },
          { enemyId: 'bruteforce', count: 4, interval: 1200 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'sql_injection', count: 3, interval: 1200 },
          { enemyId: 'phishing', count: 3, interval: 1500 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q074', 'q075', 'q076'],
    mapLayout: mapI,
    path: pathI,
    startingGold: 300,
    lives: 12,
    learningTip: 'SQLインジェクション対策にはプリペアドステートメントを使いましょう。',
  },
  {
    id: 34,
    name: 'パッチ管理の戦い',
    chapter: 4,
    chapterName: 'IT管理者編',
    difficulty: 'EXPERT',
    description: '脆弱性の修正が間に合わない！',
    waves: [
      {
        enemies: [
          { enemyId: 'zeroday', count: 3, interval: 2000 },
          { enemyId: 'sql_injection', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 4, interval: 1200 },
          { enemyId: 'bruteforce', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 2, interval: 2500 },
          { enemyId: 'ddos', count: 5, interval: 800 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q068', 'q077', 'q078'],
    mapLayout: mapG,
    path: pathG,
    startingGold: 290,
    lives: 12,
    learningTip: 'パッチ管理を自動化し、脆弱性を迅速に修正する体制を整えましょう。',
  },
  {
    id: 35,
    name: 'ファイアウォール突破',
    chapter: 4,
    chapterName: 'IT管理者編',
    difficulty: 'EXPERT',
    description: 'ファイアウォールを迂回する攻撃が来る！',
    waves: [
      {
        enemies: [
          { enemyId: 'ddos', count: 6, interval: 700 },
          { enemyId: 'sql_injection', count: 3, interval: 1500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 3, interval: 2000 },
          { enemyId: 'fake_wifi', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 4, interval: 1000 },
          { enemyId: 'phishing', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q079', 'q080', 'q081'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 280,
    lives: 12,
    learningTip: 'ファイアウォールのルールは定期的に見直し、不要なポートは閉じましょう。',
  },
  {
    id: 36,
    name: 'インシデントレスポンス',
    chapter: 4,
    chapterName: 'IT管理者編',
    difficulty: 'EXPERT',
    description: 'セキュリティインシデントが発生！迅速に対応せよ！',
    waves: [
      {
        enemies: [
          { enemyId: 'ransomware', count: 5, interval: 1000 },
          { enemyId: 'phishing', count: 5, interval: 1000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'sql_injection', count: 4, interval: 1200 },
          { enemyId: 'ddos', count: 5, interval: 800 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 3, interval: 1800 },
          { enemyId: 'bruteforce', count: 6, interval: 800 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q082', 'q083', 'q084'],
    mapLayout: mapF,
    path: pathF,
    startingGold: 280,
    lives: 12,
    learningTip: 'インシデント対応計画を事前に策定し、定期的に訓練しましょう。',
  },
  {
    id: 37,
    name: 'ネットワーク分離',
    chapter: 4,
    chapterName: 'IT管理者編',
    difficulty: 'EXPERT',
    description: 'セグメンテーションでダメージを最小限に！',
    waves: [
      {
        enemies: [
          { enemyId: 'ddos', count: 7, interval: 600 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'sql_injection', count: 5, interval: 1000 },
          { enemyId: 'zeroday', count: 2, interval: 2500 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 4, interval: 1200 },
          { enemyId: 'fake_wifi', count: 4, interval: 1200 },
          { enemyId: 'phishing', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q085', 'q086', 'q087'],
    mapLayout: mapI,
    path: pathI,
    startingGold: 270,
    lives: 12,
    learningTip: 'ネットワークセグメンテーションで被害の拡大を防ぎましょう。',
  },
  {
    id: 38,
    name: '認証基盤の死守',
    chapter: 4,
    chapterName: 'IT管理者編',
    difficulty: 'EXPERT',
    description: 'Active Directoryが攻撃対象に！',
    waves: [
      {
        enemies: [
          { enemyId: 'bruteforce', count: 8, interval: 700 },
          { enemyId: 'zeroday', count: 2, interval: 3000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'sql_injection', count: 4, interval: 1200 },
          { enemyId: 'phishing', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 4, interval: 1000 },
          { enemyId: 'ddos', count: 5, interval: 800 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 3, interval: 2000 },
          { enemyId: 'bruteforce', count: 6, interval: 800 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q088', 'q089', 'q090'],
    mapLayout: mapJ,
    path: pathJ,
    startingGold: 260,
    lives: 12,
    learningTip: '特権アカウントは厳重に管理し、多要素認証を必ず導入しましょう。',
  },
  {
    id: 39,
    name: 'IT管理者の壁',
    chapter: 4,
    chapterName: 'IT管理者編',
    difficulty: 'EXPERT',
    description: '高度な攻撃の嵐を乗り越えろ！',
    waves: [
      {
        enemies: [
          { enemyId: 'zeroday', count: 3, interval: 1800 },
          { enemyId: 'ddos', count: 6, interval: 700 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'sql_injection', count: 5, interval: 1000 },
          { enemyId: 'ransomware', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 6, interval: 800 },
          { enemyId: 'bruteforce', count: 6, interval: 800 },
          { enemyId: 'fake_wifi', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 4, interval: 1500 },
          { enemyId: 'sql_injection', count: 4, interval: 1200 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q069', 'q074', 'q082', 'q088', 'q091'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 260,
    lives: 12,
    learningTip: 'セキュリティ運用は継続が重要。監視・分析・改善のサイクルを回しましょう。',
  },
  {
    id: 40,
    name: 'IT管理者・究極の試練',
    chapter: 4,
    chapterName: 'IT管理者編',
    difficulty: 'EXPERT',
    description: 'チャプター4のボスステージ！インフラを守り抜け！',
    waves: [
      {
        enemies: [
          { enemyId: 'ddos', count: 8, interval: 500 },
          { enemyId: 'sql_injection', count: 4, interval: 1200 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 4, interval: 1500 },
          { enemyId: 'ransomware', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 6, interval: 800 },
          { enemyId: 'bruteforce', count: 7, interval: 700 },
          { enemyId: 'fake_wifi', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 5, interval: 1200 },
          { enemyId: 'ddos', count: 8, interval: 500 },
          { enemyId: 'sql_injection', count: 5, interval: 1000 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q068', 'q071', 'q074', 'q082', 'q091'],
    mapLayout: mapJ,
    path: pathJ,
    startingGold: 280,
    lives: 12,
    learningTip: 'IT管理者はシステム全体を俯瞰し、リスクに優先順位をつけて対処しましょう。',
  },

  // ========================================
  // Chapter 5: 専門家編 (Stages 41-50)
  // ========================================
  {
    id: 41,
    name: 'APT攻撃の始まり',
    chapter: 5,
    chapterName: '専門家編',
    difficulty: 'MASTER',
    description: '国家レベルの高度な持続的脅威が始まった！',
    waves: [
      {
        enemies: [
          { enemyId: 'apt', count: 2, interval: 3000 },
          { enemyId: 'phishing', count: 5, interval: 1000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 3, interval: 2000 },
          { enemyId: 'ransomware', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'apt', count: 2, interval: 2500 },
          { enemyId: 'ddos', count: 6, interval: 700 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q092', 'q093', 'q094'],
    mapLayout: mapJ,
    path: pathJ,
    startingGold: 280,
    lives: 10,
    learningTip: 'APT攻撃は長期間にわたって行われます。継続的な監視が重要です。',
  },
  {
    id: 42,
    name: 'サプライチェーン攻撃',
    chapter: 5,
    chapterName: '専門家編',
    difficulty: 'MASTER',
    description: '取引先経由でマルウェアが侵入！',
    waves: [
      {
        enemies: [
          { enemyId: 'supply_chain', count: 3, interval: 2500 },
          { enemyId: 'phishing', count: 4, interval: 1200 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 5, interval: 1000 },
          { enemyId: 'bruteforce', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'supply_chain', count: 2, interval: 3000 },
          { enemyId: 'sql_injection', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q095', 'q096', 'q097'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 270,
    lives: 10,
    learningTip: 'サプライチェーンのセキュリティ評価を定期的に実施しましょう。',
  },
  {
    id: 43,
    name: '標的型メール',
    chapter: 5,
    chapterName: '専門家編',
    difficulty: 'MASTER',
    description: '特定の幹部を狙ったスピアフィッシング！',
    waves: [
      {
        enemies: [
          { enemyId: 'apt', count: 3, interval: 2000 },
          { enemyId: 'phishing', count: 6, interval: 800 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 3, interval: 1800 },
          { enemyId: 'sql_injection', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'supply_chain', count: 2, interval: 2500 },
          { enemyId: 'ransomware', count: 4, interval: 1000 },
          { enemyId: 'ddos', count: 5, interval: 800 },
        ],
        delay: 2000,
      },
    ],
    quizIds: ['q092', 'q098', 'q099'],
    mapLayout: mapF,
    path: pathF,
    startingGold: 260,
    lives: 10,
    learningTip: '幹部向けの標的型攻撃訓練を定期的に実施しましょう。',
  },
  {
    id: 44,
    name: '暗号解読の脅威',
    chapter: 5,
    chapterName: '専門家編',
    difficulty: 'MASTER',
    description: '暗号アルゴリズムの脆弱性を突かれた！',
    waves: [
      {
        enemies: [
          { enemyId: 'bruteforce', count: 8, interval: 600 },
          { enemyId: 'zeroday', count: 3, interval: 2000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'apt', count: 3, interval: 2000 },
          { enemyId: 'sql_injection', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'supply_chain', count: 3, interval: 2000 },
          { enemyId: 'ransomware', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'ddos', count: 6, interval: 700 },
          { enemyId: 'zeroday', count: 3, interval: 1500 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q047', 'q093', 'q100'],
    mapLayout: mapJ,
    path: pathJ,
    startingGold: 250,
    lives: 10,
    learningTip: '古い暗号方式（SHA-1、DES等）は使用を停止し、最新の暗号に移行しましょう。',
  },
  {
    id: 45,
    name: 'ゼロトラスト実践',
    chapter: 5,
    chapterName: '専門家編',
    difficulty: 'MASTER',
    description: '信頼できるものは何もない！全て検証せよ！',
    waves: [
      {
        enemies: [
          { enemyId: 'apt', count: 3, interval: 1800 },
          { enemyId: 'fake_wifi', count: 5, interval: 1000 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'supply_chain', count: 3, interval: 2000 },
          { enemyId: 'zeroday', count: 3, interval: 1800 },
          { enemyId: 'phishing', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'ddos', count: 7, interval: 600 },
          { enemyId: 'sql_injection', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 5, interval: 1000 },
          { enemyId: 'bruteforce', count: 7, interval: 700 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q085', 'q092', 'q095', 'q101'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 250,
    lives: 10,
    learningTip: 'ゼロトラストは「決して信頼せず、常に検証する」が基本原則です。',
  },
  {
    id: 46,
    name: 'レッドチーム演習',
    chapter: 5,
    chapterName: '専門家編',
    difficulty: 'MASTER',
    description: '攻撃者の視点で弱点を洗い出せ！',
    waves: [
      {
        enemies: [
          { enemyId: 'zeroday', count: 4, interval: 1500 },
          { enemyId: 'apt', count: 2, interval: 2500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'sql_injection', count: 5, interval: 1000 },
          { enemyId: 'ddos', count: 6, interval: 700 },
          { enemyId: 'phishing', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'supply_chain', count: 3, interval: 2000 },
          { enemyId: 'ransomware', count: 5, interval: 1000 },
          { enemyId: 'bruteforce', count: 6, interval: 800 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'apt', count: 4, interval: 1500 },
          { enemyId: 'zeroday', count: 4, interval: 1200 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q093', 'q096', 'q100', 'q102'],
    mapLayout: mapI,
    path: pathI,
    startingGold: 240,
    lives: 10,
    learningTip: 'ペネトレーションテストで脆弱性を事前に発見し、対策しましょう。',
  },
  {
    id: 47,
    name: 'CSIRT出動',
    chapter: 5,
    chapterName: '専門家編',
    difficulty: 'MASTER',
    description: '大規模インシデント対応チームの力を見せろ！',
    waves: [
      {
        enemies: [
          { enemyId: 'apt', count: 3, interval: 1800 },
          { enemyId: 'ddos', count: 8, interval: 500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'ransomware', count: 6, interval: 800 },
          { enemyId: 'supply_chain', count: 3, interval: 2000 },
          { enemyId: 'sql_injection', count: 4, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 4, interval: 1500 },
          { enemyId: 'phishing', count: 6, interval: 800 },
          { enemyId: 'bruteforce', count: 6, interval: 800 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'apt', count: 4, interval: 1500 },
          { enemyId: 'supply_chain', count: 3, interval: 1800 },
          { enemyId: 'ddos', count: 6, interval: 600 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q082', 'q094', 'q097', 'q103'],
    mapLayout: mapJ,
    path: pathJ,
    startingGold: 240,
    lives: 10,
    learningTip: 'CSIRTは平時から訓練し、有事に迅速対応できる体制を整えましょう。',
  },
  {
    id: 48,
    name: 'サイバー戦争',
    chapter: 5,
    chapterName: '専門家編',
    difficulty: 'MASTER',
    description: '国家規模のサイバー攻撃が襲来！',
    waves: [
      {
        enemies: [
          { enemyId: 'apt', count: 4, interval: 1500 },
          { enemyId: 'zeroday', count: 4, interval: 1500 },
          { enemyId: 'ddos', count: 8, interval: 500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'supply_chain', count: 4, interval: 1500 },
          { enemyId: 'sql_injection', count: 5, interval: 1000 },
          { enemyId: 'ransomware', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 7, interval: 700 },
          { enemyId: 'bruteforce', count: 7, interval: 700 },
          { enemyId: 'fake_wifi', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'apt', count: 5, interval: 1200 },
          { enemyId: 'zeroday', count: 5, interval: 1200 },
          { enemyId: 'supply_chain', count: 4, interval: 1500 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q092', 'q095', 'q100', 'q103', 'q104'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 230,
    lives: 10,
    learningTip: '脅威インテリジェンスを活用し、攻撃者の動向を把握しましょう。',
  },
  {
    id: 49,
    name: 'セキュリティの極み',
    chapter: 5,
    chapterName: '専門家編',
    difficulty: 'MASTER',
    description: '全ての脅威が同時に襲来する！耐えきれるか！',
    waves: [
      {
        enemies: [
          { enemyId: 'apt', count: 4, interval: 1200 },
          { enemyId: 'supply_chain', count: 3, interval: 1800 },
          { enemyId: 'ddos', count: 8, interval: 500 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'zeroday', count: 5, interval: 1200 },
          { enemyId: 'sql_injection', count: 5, interval: 1000 },
          { enemyId: 'ransomware', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'phishing', count: 8, interval: 600 },
          { enemyId: 'bruteforce', count: 8, interval: 600 },
          { enemyId: 'usb_malware', count: 5, interval: 1000 },
          { enemyId: 'fake_wifi', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'apt', count: 5, interval: 1000 },
          { enemyId: 'supply_chain', count: 4, interval: 1200 },
          { enemyId: 'zeroday', count: 5, interval: 1000 },
          { enemyId: 'ddos', count: 8, interval: 500 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q068', 'q092', 'q095', 'q100', 'q104', 'q105'],
    mapLayout: mapJ,
    path: pathJ,
    startingGold: 220,
    lives: 10,
    learningTip: 'セキュリティに完璧はありません。常に学び、改善し続けることが大切です。',
  },
  {
    id: 50,
    name: 'CyberWall・最終決戦',
    chapter: 5,
    chapterName: '専門家編',
    difficulty: 'MASTER',
    description: '全ステージの集大成！サイバー空間を守り抜け！',
    waves: [
      {
        enemies: [
          { enemyId: 'ddos', count: 10, interval: 400 },
          { enemyId: 'phishing', count: 8, interval: 600 },
        ],
        delay: 1000,
      },
      {
        enemies: [
          { enemyId: 'apt', count: 5, interval: 1200 },
          { enemyId: 'supply_chain', count: 4, interval: 1500 },
          { enemyId: 'zeroday', count: 5, interval: 1200 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'sql_injection', count: 6, interval: 800 },
          { enemyId: 'ransomware', count: 6, interval: 800 },
          { enemyId: 'bruteforce', count: 8, interval: 600 },
          { enemyId: 'fake_wifi', count: 5, interval: 1000 },
        ],
        delay: 2000,
      },
      {
        enemies: [
          { enemyId: 'apt', count: 6, interval: 1000 },
          { enemyId: 'supply_chain', count: 5, interval: 1200 },
          { enemyId: 'zeroday', count: 6, interval: 1000 },
          { enemyId: 'ddos', count: 10, interval: 400 },
          { enemyId: 'usb_malware', count: 5, interval: 1000 },
        ],
        delay: 1500,
      },
    ],
    quizIds: ['q001', 'q027', 'q050', 'q074', 'q092', 'q095', 'q100', 'q105'],
    mapLayout: mapH,
    path: pathH,
    startingGold: 250,
    lives: 10,
    learningTip: 'おめでとうございます！セキュリティの知識は、日々の実践で本物になります。学び続けましょう！',
  },
];

// ============================================================
//  Helper Functions
// ============================================================

export function getStageById(id: number): StageData | undefined {
  return STAGES.find((stage) => stage.id === id);
}

export function getStagesByChapter(chapter: number): StageData[] {
  return STAGES.filter((stage) => stage.chapter === chapter);
}

// ============================================================
//  Chapter Metadata
// ============================================================

export const CHAPTERS = [
  { id: 1, name: '新入社員編', color: '#4FC3F7', stages: '1-10' },
  { id: 2, name: 'リモートワーク編', color: '#66BB6A', stages: '11-20' },
  { id: 3, name: '情報漏洩防止編', color: '#FFA726', stages: '21-30' },
  { id: 4, name: 'IT管理者編', color: '#EF5350', stages: '31-40' },
  { id: 5, name: '専門家編', color: '#AB47BC', stages: '41-50' },
];
