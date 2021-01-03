import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { Slide } from './Slide';
import { SelfishMining, HonestMining } from '@lib';
import { Space } from '@components/Space';

interface Revenue {
  name: string;
  selfish: number;
  honest: number;
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

interface Stats {
  name: string;
  publicChainLength: number;
  apparentHashRate: number;
  revenueRatio: number;
  validBlocks: number;
  totalUncles: number;
  validUncles: number;
  totalRewards: number;
  staticRewards: number;
  uncleRewards: number;
  nephewRewards: number;
}

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

    setRevenues([revenue]);

    const selfishStats: Stats = {
      name: 'Selfish',
      publicChainLength: selfish.publicChainLength,
      apparentHashRate: selfish.apparentHashRate,
      revenueRatio: selfish.revenueRatio,
      validBlocks: selfish.poolValidBlocks,
      totalUncles: selfish.totalUncles,
      validUncles: selfish.uncles.length,
      totalRewards: selfish.totalRewards,
      staticRewards: selfish.staticRewards,
      uncleRewards: selfish.uncleRewards,
      nephewRewards: selfish.nephewRewards,
    };

    const honestStats: Stats = {
      name: 'Honest',
      publicChainLength: honest.publicChainLength,
      apparentHashRate: honest.apparentHashRate,
      revenueRatio: honest.revenueRatio,
      validBlocks: honest.poolValidBlocks,
      totalUncles: honest.totalUncles,
      validUncles: honest.uncles.length,
      totalRewards: honest.totalRewards,
      staticRewards: honest.staticRewards,
      uncleRewards: honest.uncleRewards,
      nephewRewards: honest.nephewRewards,
    };

    setStats([selfishStats, honestStats]);
  };

  return (
    <>
      <Grid className={classes.simulation} container spacing={4}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
          <Slide
            legend="n"
            value={cycles}
            handleChangeValue={handleCycles}
            min={1000}
            max={50000}
            step={1000}
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
      {/* Table */}
      {stats.length !== 0 && (
        <>
          As the simulation shows, the hash power <b>&alpha;</b> obviously has a great impact since
          it increases the chances to find a block faster. The ratio of honest miners <b>&gamma;</b>{' '}
          that will choose to mine the selfish block also increases the chance for a selfish block
          to be included when competition happens. And finally the uncle rate <b>&part;</b> gives
          more opportunities for selfish miners to reference uncles so make profits.
          <Space />
          By Looking at the numbers we can see that being selfish is less profitable than being
          honest.
          <TableContainer className={classes.table} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Pool</TableCell>
                  <TableCell align="center">Chain Length</TableCell>
                  <TableCell align="center">Apparent Hash Rate</TableCell>
                  <TableCell align="center">Revenue Ratio</TableCell>
                  <TableCell align="center">Valid Blocks</TableCell>
                  <TableCell align="center">Total Uncles</TableCell>
                  <TableCell align="center">Valid Uncles</TableCell>
                  <TableCell align="center">Static Rewards</TableCell>
                  <TableCell align="center">Uncle Rewards</TableCell>
                  <TableCell align="center">Nephew Rewards</TableCell>
                  <TableCell align="center">Total Rewards</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.map(
                  ({
                    name,
                    publicChainLength,
                    apparentHashRate,
                    revenueRatio,
                    validBlocks,
                    totalUncles,
                    validUncles,
                    staticRewards,
                    uncleRewards,
                    nephewRewards,
                    totalRewards,
                  }) => (
                    <TableRow key={name} hover>
                      <TableCell component="th" scope="row" align="center">
                        {name}
                      </TableCell>
                      <TableCell align="center">{publicChainLength}</TableCell>
                      <TableCell align="center">{apparentHashRate}</TableCell>
                      <TableCell align="center">{revenueRatio}</TableCell>
                      <TableCell align="center">{validBlocks}</TableCell>
                      <TableCell align="center">{totalUncles}</TableCell>
                      <TableCell align="center">{validUncles}</TableCell>
                      <TableCell align="center">{staticRewards} eth</TableCell>
                      <TableCell align="center">{uncleRewards} eth</TableCell>
                      <TableCell align="center">{nephewRewards} eth</TableCell>
                      <TableCell align="center">{totalRewards} eth</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};
