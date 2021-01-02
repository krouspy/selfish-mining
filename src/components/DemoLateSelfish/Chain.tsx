import React from 'react';
import * as S from '@styles';

interface IChain {
  name: string;
  blocks: number[];
  color: string;
}

export const Chain: React.FC<IChain> = ({ name, blocks, color }) => {
  return (
    <S.Chain>
      <S.Name>{name}:</S.Name>
      {blocks.map(blockNumber => (
        <S.Block key={blockNumber} color={color} />
      ))}
    </S.Chain>
  );
};
