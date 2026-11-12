import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/globals.css';
import App from './App.jsx';
import { projects } from './data/projects.js';
import { certs } from './data/certs.js';
import { findProjectProblems } from './data/checkProjects.js';
import { findCertProblems } from './data/checkCerts.js';

if (import.meta.env.DEV) {
  [findProjectProblems(projects), findCertProblems(certs)].forEach(({ errors, warnings }) => {
    errors.forEach((msg) => console.error(`[data] ${msg}`));
    warnings.forEach((msg) => console.warn(`[data] ${msg}`));
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
