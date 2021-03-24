import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import ErrorBoundary from './views/Error/ErrorBoundary'


ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
    
  </React.StrictMode>,
  document.getElementById('root'),
)
