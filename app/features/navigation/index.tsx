import React, { ReactNode } from 'react';
import classnames from 'classnames';
import {
  faCog,
  faUserCircle,
  faComment,
  faThumbtack,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './index.css';
import CredentialsModal from './components/CredentialsModal';
import {
  editingCredentialsBegin,
  editingCredentialsEnd,
  getIsEditingCredentials,
  getIsSavingCredentials,
  getIsLoggingOut,
  getCredentials,
  getSaveCredentialsError,
  logout,
  saveCredentials,
} from '../preferences/preferencesSlice';
import { AppDispatch } from '../../config/store';
import { getAllowBackNavigation } from './navigationSlice';

type Props = {
  children?: ReactNode;
};

export default function NavigationContainer(props: Props) {
  const { children } = props;
  const allowBackNavigation = useSelector(getAllowBackNavigation);
  const credentials = useSelector(getCredentials);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const isEditingCredentials = useSelector(getIsEditingCredentials);
  const isLoggingOut = useSelector(getIsLoggingOut);
  const isSavingCredentials = useSelector(getIsSavingCredentials);
  const saveCredentialsError = useSelector(getSaveCredentialsError);

  function handleClickCredentials() {
    dispatch(editingCredentialsBegin());
  }

  function handleCancelEditingCredentials() {
    dispatch(editingCredentialsEnd());
  }

  function handleSaveCredentials(username: string, password: string) {
    dispatch(saveCredentials({ username, password }));
  }

  function handleLogout() {
    dispatch(logout());
  }

  function handleBackButton() {
    history.goBack();
  }

  return (
    <div className={styles.container}>
      <div className={styles.navigationBar}>
        {isEditingCredentials && (
          <CredentialsModal
            error={saveCredentialsError}
            isLoggingOut={isLoggingOut}
            isSavingCredentials={isSavingCredentials}
            onCancel={handleCancelEditingCredentials}
            onLogout={handleLogout}
            onSaveCredentials={handleSaveCredentials}
            password={credentials?.password}
            username={credentials?.username}
          />
        )}
        <div className={styles.topItems}>
          {allowBackNavigation && (
            <FontAwesomeIcon
              className={classnames(styles.topIcon, styles.noLinkIcon)}
              key="navigation_backButton"
              icon={faArrowCircleLeft}
              onClick={handleBackButton}
            />
          )}
        </div>
        <div className={styles.bottomItems}>
          <NavLink
            to="/preferences"
            exact
            className={classnames(styles.bottomIcon, styles.link)}
            activeStyle={{ color: 'white' }}
          >
            <FontAwesomeIcon key="preferencesButton" icon={faCog} />
          </NavLink>
          <FontAwesomeIcon
            className={classnames(styles.bottomIcon, styles.noLinkIcon)}
            key="navigation_credentialsButton"
            icon={faUserCircle}
            onClick={handleClickCredentials}
          />
          <NavLink
            to="/pinnedthreads"
            exact
            className={classnames(styles.bottomIcon, styles.link)}
            activeStyle={{ color: 'white' }}
          >
            <FontAwesomeIcon
              key="navigation_pinnedThreadsButton"
              icon={faThumbtack}
            />
          </NavLink>
          <NavLink
            to="/"
            exact
            className={classnames(styles.bottomIcon, styles.link)}
            activeStyle={{ color: 'white' }}
          >
            <FontAwesomeIcon key="navigation_chattyButton" icon={faComment} />
          </NavLink>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
