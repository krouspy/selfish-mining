import React from 'react';

interface ILink {
  href: string;
  text: string;
}

export const Link: React.FC<ILink> = ({ href, text }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};
