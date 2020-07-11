import React from 'react';
import './global.css';
import Routes from './routes';
import { Provider } from 'react-redux';
import {store} from './shared/redux/store';

function App() {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}

export default App;
