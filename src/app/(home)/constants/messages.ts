export const messages = [
  "太陽の光で刻々と変化する風景を記録するのも素敵",
  "今日の空を眺めてみませんか？",
  "小さな変化も大切な記録です",
  "昨日と違う雲の形に気付けるかも",
  "天気予報を見ながら散歩してみよう",
];

export const icons = [
  "robot",
  "robot_2",
  "smart_toy"
] as const;

export type IconName = (typeof icons)[number];