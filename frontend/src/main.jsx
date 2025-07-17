import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import './styles/index.css'
import { AppProviders } from './providers/AppProvider'

const root = createRoot(document.getElementById('root'))

root.render(
    <StrictMode>
        <BrowserRouter>
            <AppProviders>
                <AppRouter />
            </AppProviders>
        </BrowserRouter>
    </StrictMode>
)
