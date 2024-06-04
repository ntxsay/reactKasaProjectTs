import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from "./AppRoutes.tsx";
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router>
          <AppRoutes />
      </Router>
  </React.StrictMode>,
)
