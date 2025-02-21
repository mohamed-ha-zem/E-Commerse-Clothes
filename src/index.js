import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./all.min.css"
import App from './App';
import UserProvider from './pages/website/Auth/context';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
  <HashRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </HashRouter>
);
