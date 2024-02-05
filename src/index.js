import React from 'react';
import ReactDOM from 'react-dom/client';
import Widget from './pages/widget';
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Widget/>
  </React.StrictMode>
);