import { Simulation } from './simulation';

class SelfishMining extends Simulation {
  cycles = 0;
  currentCycle = 0;

  selfishChainLength = 0;
  selfishValidBlocks = 0;
  selfishStaleBlocks = 0;

  honestChainlength = 0;
  honestValidBlocks = 0;
  honestStaleBlocks = 0;

  apparentHashRate = 0;

  constructor(cycles: number, alpha: number, gamma: number, uncleRate: number) {
    super(alpha, gamma, uncleRate);
    this.cycles = cycles;
  }

  calculateApparentHashRate() {
    return +(this.selfishValidBlocks / this.publicChainLength).toPrecision(4);
  }

  calculateRevenue() {
    return +(
      (this.selfishValidBlocks + 2 * this.uncles.length) /
      (this.publicChainLength + this.totalUncles)
    ).toPrecision(2);
  }

  referenceUncle(isSelfish: boolean) {
    if (this.referencedUncles < this.totalUncles) {
      this.referencedUncles++;
      // for simplicity
      const distance = 1 + (Math.floor(10 * Math.random()) % 6);
      const uncleReward = this.calculateUncleReward(distance);
      if (isSelfish) {
        this.uncles.push(uncleReward);
      }
    }
  }

  simulate() {
    while (this.currentCycle < this.cycles) {
      const rand = Math.random();

      if (rand < this.alpha) {
        this.selfishChainLength++;
      } else {
        this.mineOnHonestChain(this.uncleRate);
      }
    }

    this.publicChainLength = this.honestValidBlocks + this.selfishValidBlocks;
    this.apparentHashRate = this.calculateApparentHashRate();
    this.revenueRatio = this.calculateRevenue();
    this.uncleRewards = this.calculateTotalUncleRewards();
    console.log(this);
  }

  mineOnHonestChain(uncleRate: number) {
    this.honestChainlength++;

    // uncle rate is around 6.7% - https://hedgetrade.com/what-is-ethereums-uncle-rate/
    const randUncle = Math.random();
    if (randUncle < uncleRate) {
      this.totalUncles++;
    }

    const delta = this.selfishChainLength - this.honestChainlength;

    if (delta < 0) {
      // selfish pool adopts honest chain
      this.honestValidBlocks++;
      this.selfishChainLength = 0;
      this.honestChainlength = 0;
      this.referenceUncle(false);
    } else if (delta === 0) {
      // publish selfish chain
      this.currentCycle++;

      const rand = Math.random();

      const ratioMiningSelfishBlock = this.alpha + this.gamma * (1 - this.alpha);
      if (rand < ratioMiningSelfishBlock) {
        this.selfishValidBlocks++;
        this.honestStaleBlocks++;
        this.referenceUncle(true);
      } else {
        this.honestValidBlocks++;
        this.selfishStaleBlocks++;
        this.referenceUncle(false);
      }

      this.selfishChainLength = 0;
      this.honestChainlength = 0;
    } else if (delta === 1) {
      // publish selfish block
      this.selfishValidBlocks++;
      this.selfishChainLength = 0;
      this.honestStaleBlocks += this.honestChainlength;
      this.honestChainlength = 0;
      this.currentCycle++;
      this.referenceUncle(true);
    } else if (delta >= 2) {
      // publish last selfish block
      this.selfishChainLength--;
      this.selfishValidBlocks++;
      this.referenceUncle(true);
    }
  }
}

export { SelfishMining };
