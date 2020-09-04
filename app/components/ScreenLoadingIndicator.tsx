import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function ScreenLoadingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <Spinner animation="grow" />
    </div>
  );
}
