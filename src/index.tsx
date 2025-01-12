import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App'; // Import your App component
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Ensure correct Router is used

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* Render the App component inside BrowserRouter */}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
