import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
         <App />
       </PersistGate>
        <Toaster position='bottom-left'/> {/* Success/Error messages ke liye */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);