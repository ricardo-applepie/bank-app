import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Import your App component
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom'; // Use HashRouter instead of BrowserRouter

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HashRouter>
      <App /> {/* Render the App component directly inside HashRouter */}
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
