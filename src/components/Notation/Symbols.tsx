import { Typography } from '@material-ui/core';

interface ISymbol {
  className: string;
}

// Workaround in order to render HTML Code correctly

export const Alpha: React.FC<ISymbol> = ({ className }) => {
  return (
    <Typography align="center" className={className}>
      &alpha;
    </Typography>
  );
};

export const Gamma: React.FC<ISymbol> = ({ className }) => {
  return (
    <Typography align="center" className={className}>
      &gamma;
    </Typography>
  );
};

export const Part: React.FC<ISymbol> = ({ className }) => {
  return (
    <Typography align="center" className={className}>
      &part;
    </Typography>
  );
};
export const Cycles: React.FC<ISymbol> = ({ className }) => {
  return (
    <Typography align="center" className={className}>
      n
    </Typography>
  );
};
