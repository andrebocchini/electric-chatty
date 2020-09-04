import React, { useState } from 'react';
import styles from './Spoiler.css';

type Props = {
  children?: React.ReactNode;
};

export default function Spoiler(props: Props) {
  const { children } = props;
  const [spoilered, setSpoilered] = useState(true);

  return (
    <span
      className={spoilered ? styles.spoiler : ''}
      onClick={() => {
        setSpoilered(!spoilered);
      }}
      onKeyPress={() => {
        setSpoilered(!spoilered);
      }}
      role="button"
      tabIndex={0}
    >
      {children}
    </span>
  );
}
