import React, { useState, useEffect } from 'react';
import { Chain } from './Chain';

const maxChainLength = 10;
const baseHonestBlocks = [0, 1];
const baseSelfishBlocks = [0];

export const DemoLateSelfish: React.FC = () => {
  const [honestBlocks, setHonestBlocks] = useState(baseHonestBlocks);
  const [selfishBlocks, setSelfishBlocks] = useState(baseSelfishBlocks);

  useEffect(() => {
    if (selfishBlocks.length >= maxChainLength) {
      return;
    }

    const timer = setInterval(() => {
      setSelfishBlocks(prevState => prevState.concat(prevState.length));
    }, 2000);

    return () => clearInterval(timer);
  }, [selfishBlocks]);

  useEffect(() => {
    if (honestBlocks.length >= maxChainLength) {
      setHonestBlocks([0, 1]);
      setSelfishBlocks([0]);
      return;
    }

    const timer = setInterval(() => {
      setHonestBlocks(prevState => prevState.concat(prevState.length));
    }, 1000);

    return () => clearInterval(timer);
  }, [honestBlocks]);

  return (
    <div>
      <Chain name="Selfish Chain" blocks={selfishBlocks} color="red" />
      <Chain name="Honest Chain" blocks={honestBlocks} color="blue" />
    </div>
  );
};
