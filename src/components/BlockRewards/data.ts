interface Reward {
  id: number;
  description: string;
  formula: string;
}

export const rewards: Reward[] = [
  {
    id: 0,
    description: 'Static reward',
    formula: String.raw`K_s=2 \; eth`,
  },
  {
    id: 1,
    description: 'Uncle reward',
    formula: String.raw`K_u=K_s * \frac{8 - k}{8} \; eth, k\in\{1, 2, ..., 6\} - 0 \; otherwise`,
  },
  {
    id: 2,
    description: 'Nephew reward',
    formula: String.raw`K_n=\frac{K_s}{32} \; eth`,
  },
  {
    id: 3,
    description: 'Block reward',
    formula: String.raw`K = K_s + K_u + K_n + \epsilon \; with \; \epsilon \; representing \; fees`,
  },
];
