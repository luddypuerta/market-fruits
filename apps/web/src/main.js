import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/main.scss';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(BrowserRouter, { children: _jsx(React.StrictMode, { children: _jsx(App, {}) }) }));
