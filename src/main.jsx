import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/App.css'

console.log('🚀 HealthSync main.jsx is executing!');
console.log('React version:', React.version);
console.log('Root element:', document.getElementById('root'));

// Your existing ReactDOM.createRoot(...).render(...) call here
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)