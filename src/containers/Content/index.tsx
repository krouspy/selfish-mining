import React from 'react';
import * as S from '@styles';
import { Section } from '@components/Section';
import { Space } from '@components/Space';
import { Math } from '@components/Math';
import { DemoLateSelfish } from '@components/DemoLateSelfish';
import { Simulation } from '@components/Simulation';
import { Link } from '@components/Link';

export const Content: React.FC = () => {
  return (
    <S.Content>
      <Section title="Ethereum - Selfish Mining">
        The two largest blockchains, Bitcoin and Ethereum, use the Proof of Work algorithm that
        enables decentralization while preserving security. This algorithm is based on computing
        power, more power one has more chances one has to append a new block to the blockchain.
        Howewer, this algorithm is vulnerable to some attacks, the most known is the{' '}
        <b>51% attack</b> - someone with at least 51% of the total computing power is able to rule
        the network. Another less known attack called <b>Selfish Mining</b> focuses more on
        profitability rather mining power i.e. someone can remain profitable while having less than
        half of the network power.
      </Section>

      <Section title="Selfish Mining">
        Miners are composed of two groups, honest miners that publish blocks as soon as they are
        validated and selfish miners that keep blocks private and reveal them under certain
        conditions in order to generate profits.
        <Space />
        We can start by identifying each case.
      </Section>

      <Section title="Late Selfish Pool">
        As the name infers the selfish pool is late compared to the public chain and can either
        choose to continue to mine on his private chain or adopt the public chain. But having less
        than half of the network power involves finding blocks slower than the honest miners so
        adopting the public chain makes more sense.
        <DemoLateSelfish />
      </Section>

      <Section title="Honest miners catch up">
        In order to not have mined a block for nothing, the private pool publishes his fork in the
        hope that honest miners will choose to mine on it, and so make profits.
      </Section>

      <Section title="1-Block Ahead">
        Honest miners have better chances to catch up than selfish miners have to validate a new
        block so releasing the private chain might be safer in the selfish perspective.
      </Section>

      <Section title="At least 2-Blocks Ahead">
        Selfish miners have a great lead so they exploit it by publishing the first unpublished
        block and keep mining on top of their private chain until the public chain finally catches
        up and lands on the previous case.
      </Section>

      <Section title="Uncle & Nephew rewards">
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
        <Math latex="\frac{7}{8}" /> of the regular reward if the distance is 1 and reduces by{' '}
        <Math latex="\frac{1}{8}" /> each time the distance increases by 1 until exceeding 6 to be
        equal 0. The nephew reward if always <Math latex="\frac{1}{32}" /> of the static reward.
        <br />
        We can summarize block rewards as follow.
        <ul>
          <li>
            Static reward: <Math latex="K_s=2 \; eth" /> as shown{' '}
            <Link href="https://etherscan.io/chart/blockreward" text="here" />
          </li>
          <li>
            Uncle reward:{' '}
            <Math latex="K_u=K_s * \frac{8 - k}{8} \; eth, k\in\{1, 2, ..., 6\} - 0 \; otherwise" />
          </li>
          <li>
            Nephew reward: <Math latex="K_n=\frac{K_s}{32} \; eth" />
          </li>
          <li>
            Block Reward: <Math latex="K = K_s + K_u + K_n" />
          </li>
        </ul>
        <b>Note</b>: we consider transaction fees negligible
      </Section>

      <Section title="Simulation">
        A selfish pool has computing power, generally expressed by <b>&alpha;</b>, relative to the
        network total power and represents the probability selfish miners have to validate a new
        block before the rest of the network. Also their blocks is not guaranteed to be mined, other
        miners can still mine on blocks in competition. This parameter is denoted by <b>&gamma;</b>.
        And when their blocks are not included, they still have a chance, denoted by <b>&part;</b>,
        to be referenced as <b>uncles</b>. In order to simulate an attack we repeat the pattern
        described above for <b>n</b> cycles.
        <ul>
          <li>n: cycles</li>
          <li>&alpha;: total hash power of selfish pool</li>
          <li>&gamma;: ratio of honest miners that will choose to mine on the selfish chain</li>
          <li>&part;: rate at which an uncle block occurs</li>
        </ul>
        Here we simulate an attack and compare the profitability for being selfish against the
        profitability for being honest.
        <Simulation />
      </Section>

      <Section title="Difficulty adjustment">
        Other strategies derived from selfish mining exploit the difficulty adjustment. Block time
        on Ethereum is around 10-20 seconds and to preserve it a difficulty adjustment is done for
        each block. Simply, if the block is mined in less than 10 seconds (resp. more than 20
        seconds) compared to his parent, the difficulty is increased (resp. decreased). Otherwise,
        the difficulty is left unchanged.
        <Space />
        For the current milestone, Metropolis, as stated in this{' '}
        <Link href="https://github.com/ethereum/EIPs/issues/100" text="EIP" /> the formula is given
        below.
        <Space />
        <Math
          latex="adj{\_}factor= max(1 + len(puncles) - ((btime - ptime) // 9), -99)
"
        />
        <Space />
        <Math
          latex="diff = int(max(pdiff + (pdiff // block{\_}diff{\_}factor) * adj{\_}factor, min(pdiff, min{\_}diff)))
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
        The difficulty determines the rate at which blocks are validated and as we can see in the
        formula, the number of uncles has an influence on it and selfish miners can use this factor
        to voluntarily decrease the difficulty and thus make it easier to mine blocks.
      </Section>

      <Section title="resources">
        <Link href="https://arxiv.org/pdf/1901.04620.pdf" text="Selfish Mining in Ethereum" />
        <Space />
        <Link
          href="https://arxiv.org/pdf/1805.08832v1.pdf"
          text="The Impact of Uncle Rewards on Selfish Mining in
Ethereum"
        />
        <Space />
        Note that my work is absolutely <b>not</b> an illustration of these articles. Instead, the
        purpose if for me to try to understand the impact of selfish mining, particularly on
        Ethereum. Mistakes have certainly been made, espacially regarding the algorithm.
      </Section>
    </S.Content>
  );
};
