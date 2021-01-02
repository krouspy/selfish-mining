import React from 'react';
import { Title, Text } from '@styles';

interface ISection {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<ISection> = ({ title, children }) => {
  return (
    <>
      <Title>{title}</Title>
      <Text>{children}</Text>
    </>
  );
};
