import React from 'react';
import Text2SVG from 'react-hook-mathjax';

interface IMath {
  latex: string;
}

export const Math: React.FC<IMath> = ({ latex }) => {
  return <Text2SVG display="inline" latex={latex} />;
};
