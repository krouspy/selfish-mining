import LateSelfish from '@assets/late-selfish.png';
import HonestCatchUp from '@assets/honest-catch-up.png';
import OneBlockAhead from '@assets/1-block-ahead.png';
import TwoBlocksAheadAtLeast from '@assets/2-blocks-ahead-at-least.png';

interface IData {
  id: number;
  title: string;
  text: string;
  imagePath: string;
  alt: string;
}

export const data: IData[] = [
  {
    id: 0,
    title: 'Late selfish pool',
    text: `As the name infers the selfish pool is late compared to the public chain and can
          either choose to continue to mine on his private chain or adopt the public chain. But
          having less than half of the network power involves finding blocks slower than the
          honest miners so adopting the public chain makes more sense.`,
    imagePath: LateSelfish,
    alt: 'late-selfish',
  },
  {
    id: 1,
    title: 'Honest miners catch up',
    text: `In order to not have mined a block for nothing, the private pool publishes his fork in
          the hope that honest miners will choose to mine on it, and so make profits.`,
    imagePath: HonestCatchUp,
    alt: 'honest-catch-up',
  },
  {
    id: 2,
    title: '1-Block Ahead',
    text: `Honest miners have better chances to catch up than selfish miners have to validate a
          new block so releasing the private chain might be safer in the selfish perspective.`,
    imagePath: OneBlockAhead,
    alt: '1-block-ahead',
  },
  {
    id: 3,
    title: '2-Blocks Ahead Atleast',
    text: `Selfish miners have a great lead so they exploit it by publishing the first
          unpublished block and keep mining on top of their private chain until the public chain
          finally catches up and lands on the previous case.`,
    imagePath: TwoBlocksAheadAtLeast,
    alt: '2-blocks-ahead-at-least',
  },
];
