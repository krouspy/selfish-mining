import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import { Typography } from '@components';
import { data } from './data';

const useStyles = makeStyles(theme => ({
  cases: {
    width: '100%',
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  case: {
    height: '100%',
    padding: theme.spacing(2),
  },
  svg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    marginBottom: theme.spacing(4),
  },
}));

export const Cases = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.cases} container spacing={3}>
      {data.map(({ id, title, text, imagePath, alt }) => {
        return (
          <Grid key={id} item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Paper className={classes.case}>
              <Typography align="center" textTitle>
                {title}
              </Typography>
              <Typography>{text}</Typography>
              <div className={classes.svg}>
                <img src={imagePath} alt={alt} />
              </div>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};
