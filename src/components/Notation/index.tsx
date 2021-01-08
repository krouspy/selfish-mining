import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alpha, Gamma, Part, Cycles } from './Symbols';

interface INotation {
  id: number;
  description: string;
}

const data: INotation[] = [
  {
    id: 0,
    description: 'total hash power of the selfish pool',
  },
  {
    id: 1,
    description: 'ratio of honest miners that will choose to mine a published selfish block',
  },
  {
    id: 2,
    description: 'rate at which an uncle block occurs',
  },
  {
    id: 3,
    description: 'cycles',
  },
];

const useStyles = makeStyles(theme => ({
  paper: {
    height: 90,
  },
  notation: {
    height: 100,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2em',
  },
  description: {
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const Notation: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      {data.map(({ id, description }) => (
        <Grid className={classes.notation} key={id} item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Paper className={classes.paper}>
            {id === 0 && <Alpha className={classes.title} />}
            {id === 1 && <Gamma className={classes.title} />}
            {id === 2 && <Part className={classes.title} />}
            {id === 3 && <Cycles className={classes.title} />}
            <Typography align="center" className={classes.description}>
              {description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
