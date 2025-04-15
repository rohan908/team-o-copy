import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { LoginProvider } from './home-page/components/LoginContext';


// Entry point where root component is rendered into the DOM
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <LoginProvider>
            <App />
        </LoginProvider>
    </React.StrictMode>
);
