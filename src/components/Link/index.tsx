import React from 'react';

interface ILink {
  href: string;
  text: string;
}

const style = {
  textDecoration: 'none',
};

export const Link: React.FC<ILink> = ({ href, text }) => {
  return (
    <a style={style} href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};
