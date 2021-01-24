import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Divider } from '@material-ui/core';
import { GitHub, LinkedIn, Twitter } from '@material-ui/icons';

interface ILink {
  id: number;
  href: string;
  icon: React.ReactNode;
}

const links: ILink[] = [
  {
    id: 0,
    href: 'https://www.linkedin.com/in/kenjilau/',
    icon: <LinkedIn />,
  },
  {
    id: 1,
    href: 'https://github.com/krouspy/selfish-mining',
    icon: <GitHub />,
  },
  {
    id: 2,
    href: 'https://twitter.com/Krouspy2',
    icon: <Twitter />,
  },
];

const useStyles = makeStyles(theme => ({
  footer: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    paddingBottom: theme.spacing(3),
  },
  socialIcons: {
    width: '100%',
  },
  icon: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing(2),
  },
  link: {},
}));

export const SocialLinks: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.socialIcons}>
        <Divider />
        <div className={classes.icon}>
          {links.map(({ id, href, icon }) => (
            <Link key={id} href={href} color="inherit" target="_blank" rel="noopener noreferrer">
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
