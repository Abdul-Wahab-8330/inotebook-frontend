import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
import { AlertProvider } from './context/notes/AlertContext';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider>
    <App />
    </AlertProvider>
  </React.StrictMode>
);

