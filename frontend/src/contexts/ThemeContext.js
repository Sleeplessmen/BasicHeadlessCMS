import { createContext } from 'react'

export const ThemeContext = createContext({
    theme: 'light', // Giá trị mặc định
    toggleTheme: () => { },
})
