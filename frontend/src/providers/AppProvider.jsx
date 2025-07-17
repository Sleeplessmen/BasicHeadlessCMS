import { AuthProvider } from './AuthProvider'
import { ThemeProvider } from './ThemeProvider'
import { PermissionProvider } from './PermissionProvider'

export function AppProviders({ children }) {
    return (
        <AuthProvider>
            <PermissionProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </PermissionProvider>
        </AuthProvider>
    )
}
