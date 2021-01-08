import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { SocialLinks } from './SocialLinks';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const data = [
  'Introduction',
  'Selfish Mining',
  'Uncle and Nephew',
  'Simulation',
  'Difficulty Adjustment',
  'Resources',
];

const format = (str: string): string => {
  return str.replace(/\s+/g, '-').toLowerCase();
};

export const Sidebar: React.FC = () => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {data.map((text, index) => (
          <HashLink key={index} className={classes.link} smooth to={`#${format(text)}`}>
            <ListItem button>
              <ListItemText primary={text} />
            </ListItem>
          </HashLink>
        ))}
      </List>
      <Divider />
      <SocialLinks />
    </Drawer>
  );
};
