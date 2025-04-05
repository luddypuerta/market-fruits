import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/main.scss';
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </BrowserRouter>
)
