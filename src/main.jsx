import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import { AuthProvider } from './context/auth/AuthProvider.jsx'
import { ProductProvider } from './products/context/index.js'
import { ReviewProvider } from './reviews/context/ReviewProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <ReviewProvider>
            <App />
          </ReviewProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
