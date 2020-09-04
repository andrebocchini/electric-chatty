import React from 'react';
import Modal from 'react-bootstrap/Modal';
import classnames from 'classnames';
import CredentialsEditor from './CredentialsEditor';

type Props = {
  className?: string;
  error?: string;
  id?: string;
  isLoggingOut?: boolean;
  isSavingCredentials?: boolean;
  onCancel?: () => void;
  onLogout?: () => void;
  onSaveCredentials?: (username: string, password: string) => void;
  password?: string;
  username?: string;
};

export default function CredentialsModal(props: Props) {
  const {
    className,
    error,
    id,
    isLoggingOut,
    isSavingCredentials,
    onCancel,
    onLogout,
    onSaveCredentials,
    password,
    username,
  } = props;

  return (
    <Modal
      centered
      className={classnames('chatty-modal', className)}
      id={id}
      show
    >
      <Modal.Header>
        <Modal.Title>Shacknews Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CredentialsEditor
          error={error}
          isLoggingOut={isLoggingOut}
          isSavingCredentials={isSavingCredentials}
          onCancel={onCancel}
          onLogout={onLogout}
          onSaveCredentials={onSaveCredentials}
          password={password}
          username={username}
        />
      </Modal.Body>
    </Modal>
  );
}
