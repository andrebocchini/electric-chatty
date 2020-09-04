/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AppDispatch } from '../../config/store';
import {
  fetchThreads,
  fetchPinnedThreads,
  fetchNewestEventId,
  waitForEvents,
} from '../chatty/chattySlice';
import {
  fetchCredentials,
  fetchPreferences,
} from '../preferences/preferencesSlice';
import NotificationCenter from '../notifications';
import NavigationContainer from '../navigation';
import * as routes from '../../constants/routes';
import ScreenLoadingIndicator from '../../components/ScreenLoadingIndicator';
import { getIsStartingUp, startupSuccess, startupFailure } from './appSlice';

// Lazily load routes and code split with webpack
const LazyChattyScreen = React.lazy(() =>
  import(/* webpackChunkName: "ChattyScreen" */ '../chatty')
);

const ChattyScreen = (props: Record<string, any>) => (
  <React.Suspense fallback={<ScreenLoadingIndicator />}>
    <LazyChattyScreen {...props} />
  </React.Suspense>
);

const LazyPreferencesScreen = React.lazy(() =>
  import(/* webpackChunkName: "PreferencesScreen" */ '../preferences')
);

const PreferencesScreen = (props: Record<string, any>) => (
  <React.Suspense fallback={<ScreenLoadingIndicator />}>
    <LazyPreferencesScreen {...props} />
  </React.Suspense>
);

export default function App() {
  const dispatch: AppDispatch = useDispatch();
  const isStartingUp = useSelector(getIsStartingUp);

  useEffect(() => {
    async function startupSequence() {
      if (!isStartingUp) {
        return;
      }

      try {
        await dispatch(fetchCredentials());
        const preferences = await dispatch(fetchPreferences());

        await dispatch(fetchThreads());

        if (preferences && preferences.pinnedThreads.length > 0) {
          await dispatch(fetchPinnedThreads());
        }

        const eventId = await dispatch(fetchNewestEventId());
        if (eventId) {
          dispatch(waitForEvents(eventId, new Date()));
        }
        dispatch(startupSuccess());
      } catch (error) {
        dispatch(startupFailure(error.message));
      }
    }

    startupSequence();
  });

  return (
    <>
      <NotificationCenter />
      <NavigationContainer>
        {isStartingUp ? (
          <ScreenLoadingIndicator />
        ) : (
          <Switch>
            <Route path={routes.PINNED_THREADS}>
              <ChattyScreen />
            </Route>
            <Route path={routes.THREAD}>
              <ChattyScreen />
            </Route>
            <Route path={routes.PREFERENCES}>
              <PreferencesScreen />
            </Route>
            <Route exact path={routes.CHATTY}>
              <ChattyScreen />
            </Route>
          </Switch>
        )}
      </NavigationContainer>
    </>
  );
}
