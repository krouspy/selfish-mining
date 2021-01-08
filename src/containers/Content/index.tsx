import React from 'react';
import { Typography as MaterialUITypography } from '@material-ui/core';
import {
  Space,
  Latex,
  MathSymbol,
  Simulation,
  Link,
  Typography,
  Cases,
  BlockRewards,
  Notation,
} from '@components';

export const Content: React.FC = () => {
  return (
    <div>
      <MaterialUITypography
        id="introduction"
        component="h4"
        variant="h4"
        align="center"
        gutterBottom
      >
        Ethereum - Selfish Mining
      </MaterialUITypography>
      <Typography>
        The two largest blockchains, Bitcoin and Ethereum, use the Proof of Work algorithm that
        enables decentralization while preserving security. This algorithm is based on computing
        power, more power one has more chances one has to append a new block to the blockchain.
        Howewer, this algorithm is vulnerable to some attacks, the most known is the{' '}
        <b>51% attack</b> - someone with at least 51% of the total computing power is able to rule
        the network. Another less known attack called <b>Selfish Mining</b> focuses more on
        profitability rather mining power i.e. someone can remain profitable while having less than
        half of the network power.
      </Typography>

      <Typography id="selfish-mining" title align="center">
        Selfish Mining
      </Typography>
      <Typography align="center">
        Miners are composed of two groups, honest miners that publish blocks as soon as they are
        validated and selfish miners that keep blocks private and reveal them under certain
        conditions in order to generate profits.
        <Space />
        <b>We can start by identifying each case.</b>
      </Typography>

      {/* Cases */}
      <Cases />

      <Typography id="uncle-and-nephew" title align="center">
        Uncle & Nephew rewards
      </Typography>
      <Typography>
        Blockchains using the Proof of Work algorithm incentivize miners by rewarding them when they
        append a new block to the public chain. A block reward is generated from the block itself
        and goes directly to the miner that has appended it.
        <Space />
        Howewer, there is no consensus on which block miners have to work on. Indeed, miners can
        choose the block they wish to mine and publish them as soon as they have finished validating
        it. Therefore, multiple blocks can be released at the same time but only one will be part of
        the public chain. From there we can identify two types of block.
        <ul>
          <li>Regular: block that is part of the public chain</li>
          <li>Stale: block validated by a miner but not included in the public chain</li>
        </ul>
        In Bitcoin, regular blocks will give rewards but stale blocks will not.
        <br />
        It works the same for Ethereum with a little (or big) difference that introduces two more
        types of block: Uncle and Nephew blocks. Ethereum regular blocks contain references to
        so-called <b>uncle</b> blocks. These uncles blocks are just stale blocks that can also be
        referenced later by regular blocks, called <b>nephews</b>.
        <ul>
          <li>Uncle: stale block direct child of a regular block</li>
          <li>Nephew: regular block referencing an uncle block</li>
        </ul>
        These two block types play a big role regarding selfish mining because they are part of the
        reward. Uncle reward depends on the distance between the uncle and nephew blocks:{' '}
        <Latex text="\frac{7}{8}" /> of the regular reward if the distance is 1 and reduces by{' '}
        <Latex text="\frac{1}{8}" /> each time the distance increases by 1 until exceeding 6 to be
        equal 0. The nephew reward if always <Latex text="\frac{1}{32}" /> of the static reward.
        <Space />
        We can summarize block rewards as follow.
        {/* Block rewards */}
        <BlockRewards />
      </Typography>

      <Typography id="simulation" title align="center">
        Simulation
      </Typography>
      <Typography>
        A selfish pool has computing power, generally expressed by <MathSymbol>&alpha;</MathSymbol>{' '}
        , relative to the network total power and represents the probability selfish miners have to
        validate a new block before the rest of the network. Also their blocks is not guaranteed to
        be mined, other miners can still mine on blocks in competition. This parameter is denoted by{' '}
        <MathSymbol>&gamma;</MathSymbol>. And when their blocks are not included, they still have a
        chance, denoted by <MathSymbol>&part;</MathSymbol>, to be referenced as <b>uncles</b>. In
        order to simulate an attack we repeat the pattern described above for <b>n</b> cycles.
        <Notation />
        Here we simulate an attack and compare the profitability for being selfish against the
        profitability for being honest.
        <Simulation />
      </Typography>

      <Typography id="difficulty-adjustment" title align="center">
        Difficulty adjustment
      </Typography>
      <Typography>
        Block time on Ethereum is around 10-20 seconds and to preserve it a difficulty adjustment is
        done for each block. Simply, if the block is mined in less than 10 seconds (resp. more than
        20 seconds) compared to his parent, the difficulty is increased (resp. decreased).
        Otherwise, the difficulty is left unchanged.
        <Space />
        For the current milestone, Metropolis, as stated in this{' '}
        <Link href="https://github.com/ethereum/EIPs/issues/100" text="EIP" /> the formula is given
        below.
        <Space />
        <Latex
          text="adj{\_}factor= max(1 + len(puncles) - ((btime - ptime) // 9), -99)
"
        />
        <Space />
        <Latex
          text="diff = int(max(pdiff + (pdiff // block{\_}diff{\_}factor) * adj{\_}factor, min(pdiff, min{\_}diff)))
"
        />
        <Space />
        With:
        <ul>
          <li>bdiff: current block difficulty</li>
          <li>btime: current block time</li>
          <li>pdiff: parent difficulty</li>
          <li>ptime: parent block time</li>
          <li>puncles: total parent uncles</li>
        </ul>
        The difficulty determines the rate at which blocks are validated and also tells the protocol
        which chain to adopt i.e. in case of competition, the block with higher difficulty will be
        prioritized. As we can see in the formula, the number of uncles has an influence on it and
        there are strategies (not covered here), derived from selfish mining, that use this factor
        to voluntarily decrease the difficulty in order to be able to mine blocks faster.
      </Typography>

      <Typography id="resources" title>
        Resources
      </Typography>
      <Typography>
        <Link href="https://arxiv.org/pdf/1901.04620.pdf" text="Selfish Mining in Ethereum" />
        <br />
        <Link
          href="https://arxiv.org/pdf/1805.08832v1.pdf"
          text="The Impact of Uncle Rewards on Selfish Mining in
Ethereum"
        />
        <Space />
        <b>Note</b> that my work is absolutely <b>not</b> an illustration of these articles.
        <br />
        Instead, the purpose is for me to try to understand the impact of selfish mining,
        particularly on Ethereum.
        <br />
        Mistakes have certainly been made, especially regarding the algorithm.
      </Typography>
    </div>
  );
};
