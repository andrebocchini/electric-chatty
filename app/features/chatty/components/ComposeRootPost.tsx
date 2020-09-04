import React from 'react';
import Modal from 'react-bootstrap/Modal';
import classnames from 'classnames';
import ComposePost from './ComposePost';

type Props = {
  className?: string;
  error?: string;
  id?: string;
  isLoggedIn?: boolean;
  isPosting?: boolean;
  onCancel?: () => void;
  onDismissError?: () => void;
  onPost?: (post: string) => void;
  title?: string;
};

export default function ComposeRootPost(props: Props) {
  const {
    className,
    error,
    id,
    isLoggedIn,
    isPosting,
    onCancel,
    onDismissError,
    onPost,
    title,
  } = props;

  return (
    <Modal
      centered
      className={classnames('chatty-modal', className)}
      id={id}
      show
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>{title || 'New Post'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ComposePost
          error={error}
          isLoggedIn={isLoggedIn}
          isPosting={isPosting}
          onCancelButtonClicked={onCancel}
          onDimissErrorButtonClicked={onDismissError}
          onPostButtonClicked={onPost}
          rows={10}
        />
      </Modal.Body>
    </Modal>
  );
}
