import { Simulation } from './simulation';

class HonestMining extends Simulation {
  honestPoolChain = 0;
  blocksToMine = 0;

  constructor(blocksToMine: number, alpha: number, gamma: number, uncleRate: number) {
    super(alpha, gamma, uncleRate);
    this.blocksToMine = blocksToMine;
  }

  simulate() {
    while (this.publicChainLength < this.blocksToMine) {
      this.publicChainLength++;

      // uncle rate is around 6.7% - https://hedgetrade.com/what-is-ethereums-uncle-rate/
      const newUncle = Math.random() < this.uncleRate;
      if (newUncle) {
        this.totalUncles++;
        // for simplicity
        const distance = 1 + (Math.floor(10 * Math.random()) % 6);
        const uncleReward = this.calculateUncleReward(distance);

        // for simplicity
        const isPoolUncle = Math.random() < 0.2;
        if (isPoolUncle) {
          this.uncles.push(uncleReward);
        }
      }

      const minePoolBlock = Math.random();
      if (minePoolBlock < this.alpha) {
        this.honestPoolChain++;
      }
    }

    this.revenueRatio = this.calculateRevenue();
    this.uncleRewards = this.calculateTotalUncleRewards();
    console.log(this);
  }

  calculateRevenue() {
    return +(
      (this.honestPoolChain + 2 * this.uncles.length) /
      (this.publicChainLength + this.totalUncles)
    ).toPrecision(2);
  }
}

export { HonestMining };
