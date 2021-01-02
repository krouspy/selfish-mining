class Simulation {
  readonly staticReward = 2; // 2 ETH
  readonly nephewReward = 1 / 16; // 1/32 of static reward

  alpha = 0;
  gamma = 0;

  publicChainLength = 0;

  uncleRate = 0;
  totalUncles = 0;
  referencedUncles = 0;
  uncles: number[] = [];
  uncleRewards = 0;

  totalNephews = 0;

  revenueRatio = 0;

  constructor(alpha: number, gamma: number, uncleRate: number) {
    this.alpha = alpha;
    this.gamma = gamma;
    this.uncleRate = uncleRate;
  }

  generateBlockTime(): number {
    return Math.floor((100 * Math.random()) % 30);
  }

  calculateUncleReward(distance: number): number {
    return distance >= 1 && distance <= 6 ? (this.staticReward * (8 - distance)) / 8 : 0;
  }

  calculateTotalRewards() {
    // return this.
  }

  calculateTotalUncleRewards(): number {
    return this.uncles.reduce((a, b) => a + b, 0);
  }

  calculateTotalNephewRewards(): number {
    return this.totalNephews * this.nephewReward;
  }

  calculateDifficulty() {
    // block_diff = pdiff - pdiff / 2048 * max((time - ptime) / 10 - 1, 99) + 2 ^ int((num / 100000) - 2))
  }
}

export { Simulation };
