import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './styles/GlobalStyle'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter >
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
