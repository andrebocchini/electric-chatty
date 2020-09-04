import React, { useRef, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import classnames from 'classnames';
import styles from './ComposePost.css';
import ComposePostLegend from './ComposePostLegend';

type Props = {
  className?: string;
  error?: string;
  id?: string;
  isLoggedIn?: boolean;
  isPosting?: boolean;
  onCancelButtonClicked?: () => void;
  onDimissErrorButtonClicked?: () => void;
  onPostButtonClicked?: (post: string) => void;
  rows?: number;
};

export default function ComposePost(props: Props) {
  const [post, setPost] = useState('');
  const textarea = useRef<HTMLTextAreaElement>(null);
  const {
    className,
    error,
    id,
    isLoggedIn,
    isPosting,
    onCancelButtonClicked,
    onDimissErrorButtonClicked,
    onPostButtonClicked,
    rows,
  } = props;

  function handleComposing(event: React.FormEvent<HTMLTextAreaElement>) {
    setPost(event.currentTarget.value);
  }

  function handleCancelButtonClicked() {
    setPost('');
    if (onCancelButtonClicked) onCancelButtonClicked();
  }

  function handlePostButtonClicked() {
    if (onPostButtonClicked && isLoggedIn) onPostButtonClicked(post);
  }

  function handleTagLegendSelect(tag: string | null) {
    setPost(`${post}${tag}`);
  }

  return (
    <div className={classnames(className, styles.container)} id={id}>
      {isLoggedIn ? (
        <>
          <textarea
            ref={textarea}
            className={styles.composeBox}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              return handleComposing(e);
            }}
            rows={rows || 5}
            value={post}
          />
          {error && (
            <Alert
              className={styles.errorAlert}
              dismissible
              onClose={onDimissErrorButtonClicked}
              variant="danger"
            >
              {error}
            </Alert>
          )}
        </>
      ) : (
        <Alert className={styles.notLoggedInAlert} variant="warning">
          You must be logged in to post
        </Alert>
      )}

      <div className={styles.footer}>
        <ComposePostLegend onSelect={handleTagLegendSelect} />
        <div className={styles.buttonRow}>
          <Button
            className={styles.button}
            id="cancelButton"
            onClick={handleCancelButtonClicked}
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            className={styles.button}
            disabled={!isLoggedIn}
            id="postButton"
            onClick={handlePostButtonClicked}
            type="button"
          >
            {isPosting ? <Spinner animation="border" size="sm" /> : 'Post'}
          </Button>
        </div>
      </div>
    </div>
  );
}
