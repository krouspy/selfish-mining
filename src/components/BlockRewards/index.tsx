import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Latex } from '@components';
import { rewards } from './data';

const useStyles = makeStyles(theme => ({
  paper: {
    height: 100,
  },
  rewards: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  title: {
    height: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formula: {
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const BlockRewards: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.rewards} container spacing={2}>
        {rewards.map(({ id, description, formula }) => (
          <Grid key={id} item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Typography align="center" className={classes.title}>
                {description}
              </Typography>
              <Typography align="center" className={classes.formula}>
                <Latex text={formula} />
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <b>Note</b>: we don't consider transaction fees
    </>
  );
};
