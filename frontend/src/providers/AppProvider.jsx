import { AuthProvider } from './AuthProvider'
import { ThemeProvider } from './ThemeProvider'

export function AppProviders({ children }) {
    return (
        <AuthProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </AuthProvider>
    )
}
