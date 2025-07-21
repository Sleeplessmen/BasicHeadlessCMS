import { useEffect, useState } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'light'
    )

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
