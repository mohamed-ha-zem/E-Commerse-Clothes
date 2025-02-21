import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./all.min.css"
import App from './App';
import { BrowserRouter } from "react-router-dom";
import UserProvider from './pages/website/Auth/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
