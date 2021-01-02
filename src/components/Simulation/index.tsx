import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { Slide } from './Slide';
import { SelfishMining, HonestMining } from '@lib';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface Revenue {
  name: string;
  selfish: number;
  honest: number;
}

interface Stats {
  name: string;
  publicChainLength: number;
  validBlocks: number;
  revenueRatio: number;
  totalUncles: number;
  uncles: number;
  uncleRewards: number;
}

const useStyles = makeStyles({
  simulation: {
    height: 470,
    margin: '50px 0',
  },
  box: {
    display: 'grid',
    placeItems: 'center',
  },
  'btn-simulate': {
    display: 'flex',
    justifyContent: 'center',
  },
  table: {
    minWidth: 650,
    margin: '50px 0',
  },
});

export const Simulation: React.FC = () => {
  const classes = useStyles();
  const [stats, setStats] = useState<Stats[]>([]);
  const [revenues, setRevenues] = useState<Revenue[]>();
  const [cycles, setCycles] = useState(10000);
  const [alpha, setAlpha] = useState(0.25); // total selfish power
  const [gamma, setGamma] = useState(0.5); // ratio of honest miners who choose to mine on the selfish fork
  const [uncleRate, setUncleRate] = useState(0.067);

  const handleCycles = (_event: React.ChangeEvent<{}>, value: number | number[]) => {
    setCycles(typeof value === 'number' ? value : 0);
  };

  const handleAlpha = (_event: React.ChangeEvent<{}>, value: number | number[]) => {
    setAlpha(typeof value === 'number' ? value : 0);
  };

  const handleGamma = (_event: React.ChangeEvent<{}>, value: number | number[]) => {
    setGamma(typeof value === 'number' ? value : 0);
  };

  const handleUncleRate = (_event: React.ChangeEvent<{}>, value: number | number[]) => {
    setUncleRate(typeof value === 'number' ? value : 0);
  };

  const startSimulation = () => {
    const selfish = new SelfishMining(cycles, alpha, gamma, uncleRate);
    selfish.simulate();

    const blocksToMine = selfish.publicChainLength;

    const honest = new HonestMining(blocksToMine, alpha, gamma, uncleRate);
    honest.simulate();

    const revenue: Revenue = {
      name: 'revenue ratio',
      selfish: selfish.revenueRatio,
      honest: honest.revenueRatio,
    };

    const newRevenues: Revenue[] = [];
    newRevenues.push(revenue);

    setRevenues(newRevenues);

    const selfishStats: Stats = {
      name: 'Selfish',
      publicChainLength: selfish.publicChainLength,
      validBlocks: selfish.selfishValidBlocks,
      revenueRatio: selfish.revenueRatio,
      totalUncles: selfish.totalUncles,
      uncles: selfish.uncles.length,
      uncleRewards: selfish.uncleRewards,
    };

    const honestStats: Stats = {
      name: 'Honest',
      publicChainLength: honest.publicChainLength,
      validBlocks: honest.honestPoolChain,
      revenueRatio: honest.revenueRatio,
      totalUncles: honest.totalUncles,
      uncles: honest.uncles.length,
      uncleRewards: honest.uncleRewards,
    };

    setStats([selfishStats, honestStats]);
  };

  return (
    <>
      <Grid className={classes.simulation} container spacing={4}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Slide
            legend="n"
            value={cycles}
            handleChangeValue={handleCycles}
            min={1000}
            max={50000}
            step={1000}
          />
          <Slide
            legend="&alpha;"
            value={alpha}
            handleChangeValue={handleAlpha}
            min={0.1}
            max={1}
            step={0.01}
            percentage
          />
          <Slide
            legend="&gamma;"
            value={gamma}
            handleChangeValue={handleGamma}
            min={0.1}
            max={1}
            step={0.01}
            percentage
          />
          <Slide
            legend="&part;"
            value={uncleRate}
            handleChangeValue={handleUncleRate}
            min={0.01}
            max={1}
            step={0.001}
            percentage
          />
        </Grid>
        <Grid className={classes.box} item xs={6} sm={6} md={6} lg={6} xl={6}>
          {revenues && (
            <BarChart width={320} height={350} data={revenues}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Legend />
              <Tooltip />
              <Bar dataKey="selfish" fill="#8884d8" />
              <Bar dataKey="honest" fill="#82ca9d" />
            </BarChart>
          )}
        </Grid>
        <Grid item className={classes['btn-simulate']} xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button color="primary" variant="contained" onClick={startSimulation}>
            Simulate
          </Button>
        </Grid>
      </Grid>
      {/* Text */}
      As the simulation shows, the hash power <b>&alpha;</b> obviously has a great impact since it
      increases the chances to find a block faster. The ratio of honest miners <b>&gamma;</b> that
      will choose to mine the selfish block also increases the chance for a selfish block to be
      included when competition happens. And finally the uncle rate <b>&part;</b> gives more
      opportunities for selfish miners to reference uncles so make profits.
      {/* Table */}
      {stats.length !== 0 && (
        <TableContainer className={classes.table} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Chain</TableCell>
                <TableCell>Chain Length</TableCell>
                <TableCell>Valid Blocks</TableCell>
                <TableCell>Revenue Ratio</TableCell>
                <TableCell>Total Uncles</TableCell>
                <TableCell>Valid Uncles</TableCell>
                <TableCell>Uncle Rewards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map(
                ({
                  name,
                  publicChainLength,
                  validBlocks,
                  revenueRatio,
                  totalUncles,
                  uncles,
                  uncleRewards,
                }) => (
                  <TableRow key={name}>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell>{publicChainLength}</TableCell>
                    <TableCell>{validBlocks}</TableCell>
                    <TableCell>{revenueRatio}</TableCell>
                    <TableCell>{totalUncles}</TableCell>
                    <TableCell>{uncles}</TableCell>
                    <TableCell>{uncleRewards} eth</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
