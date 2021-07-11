import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';

export default function () {
  const loading = useSelector((state: any) => state.loaderState.show);
  const message = useSelector((state: any) => state.loaderState.message);

  return (
    <>
      {loading && (
        <div className="loading">
          <div className="loader"></div>
          <div className="loadingText">{message}</div>
        </div>
      )}
    </>
  );
}
