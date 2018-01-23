import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render((
    <CookiesProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CookiesProvider>
), document.getElementById('root'));

