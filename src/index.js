import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

root.render(<App />);
