import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('glasses-quiz-widget'));
if(root){
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}