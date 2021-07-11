import React from 'react';
import Routes from './routes';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import Loader from './components/loader';

function App() {
  return (
    <Provider store={Store}>
      <Loader></Loader>
      <Routes />
    </Provider>
  );
}

export default App;
