import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import styles from './CredentialsEditor.css';

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

export default function CredentialsEditor(props: Props) {
  const [usernameValue, setUsernameValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
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

  useEffect(() => {
    if (username) setUsernameValue(username);
    if (password) setPasswordValue(password);
  }, [username, password]);

  function handleChangeUsername(event: React.FormEvent<HTMLInputElement>) {
    setUsernameValue(event.currentTarget.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(event.currentTarget.value);
  }

  function handleSaveCredentials() {
    if (onSaveCredentials) onSaveCredentials(usernameValue, passwordValue);
  }

  return (
    <div className={className} id={id}>
      <label
        className={styles.inputLabel}
        htmlFor="usernameInput"
        id="usernameLabel"
      >
        Username
        <input
          className={styles.inputField}
          id="usernameInput"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            return handleChangeUsername(e);
          }}
          placeholder="Enter account"
          type="text"
          value={usernameValue}
        />
      </label>
      <label
        className={styles.inputLabel}
        htmlFor="passwordInput"
        id="passwordLabel"
      >
        Password
        <input
          className={styles.inputField}
          id="passwordInput"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            return handleChangePassword(e);
          }}
          placeholder="Enter password"
          type="password"
          value={passwordValue}
        />
      </label>
      <div className={styles.buttonRow}>
        <Button
          className={styles.button}
          id="logoutButton"
          onClick={() => onLogout && onLogout()}
          variant="danger"
        >
          {isLoggingOut ? <Spinner animation="border" size="sm" /> : 'Logout'}
        </Button>
        <Button
          className={styles.button}
          id="cancelButton"
          onClick={() => onCancel && onCancel()}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          className={styles.button}
          id="saveButton"
          onClick={() => handleSaveCredentials()}
        >
          {isSavingCredentials ? (
            <Spinner animation="border" size="sm" />
          ) : (
            'Save'
          )}
        </Button>
      </div>
      {error && (
        <Alert className={styles.validationAlert} variant="danger">
          {`${error}`}
        </Alert>
      )}
    </div>
  );
}
