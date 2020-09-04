import React from 'react';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import styles from './LOLPopover.css';
import LOLButton from './LOLButton';

const TAGS = ['lol', 'inf', 'unf', 'tag', 'wow', 'wtf', 'aww'];

type Props = {
  onHide?: () => void;
  onTagClick?: (tag: string) => void;
  target: unknown;
  show?: boolean;
};

export default function LOLPopover(props: Props) {
  const { onHide, onTagClick, show, target } = props;

  return (
    <Overlay
      flip
      placement="auto"
      onHide={() => onHide && onHide()}
      rootClose
      rootCloseEvent="click"
      show={show}
      target={target as HTMLElement}
    >
      <Popover id="tagPopover">
        <Popover.Content className={styles.tagPopover}>
          {TAGS.map((t) => (
            <LOLButton
              className={styles.tagBadge}
              id={`${t}Button`}
              key={t}
              tag={t}
              onClick={() => onTagClick && onTagClick(t)}
            />
          ))}
        </Popover.Content>
      </Popover>
    </Overlay>
  );
}
