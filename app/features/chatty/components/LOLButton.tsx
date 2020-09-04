import React from 'react';
import Badge from 'react-bootstrap/Badge';
import classnames from 'classnames';
import styles from './LOLButton.css';

function styleForTag(tag: string) {
  switch (tag) {
    case 'inf':
      return styles.inf;
    case 'unf':
      return styles.unf;
    case 'tag':
      return styles.tag;
    case 'wtf':
      return styles.wtf;
    case 'wow':
      return styles.wow;
    case 'aww':
      return styles.aww;
    default:
      return styles.lol;
  }
}

type Props = {
  className?: string;
  count?: number;
  id?: string;
  onClick?: (tag: string) => void;
  tag: string;
};

export default function LOLButton(props: Props) {
  const { className, count, id, onClick, tag } = props;

  return (
    <Badge
      className={classnames(styles.lolTag, styleForTag(tag), className)}
      id={id}
      onClick={() => onClick && onClick(tag)}
      pill
    >
      {count ? `${count} ${tag}` : `${tag}`}
      {count && count > 1 ? 's' : ''}
    </Badge>
  );
}
