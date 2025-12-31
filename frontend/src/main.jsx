import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from "antd";

import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Lexend, ui-sans-serif, system-ui",
          },
        }}
      >
      <App />
    </ConfigProvider> 
    </BrowserRouter>
  </React.StrictMode>
)
