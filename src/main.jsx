import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App.jsx';
import { projects } from './data/projects.js';
import { findProjectProblems } from './data/checkProjects.js';

if (import.meta.env.DEV) {
  const { errors, warnings } = findProjectProblems(projects);
  errors.forEach((msg) => console.error(`[projects] ${msg}`));
  warnings.forEach((msg) => console.warn(`[projects] ${msg}`));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);