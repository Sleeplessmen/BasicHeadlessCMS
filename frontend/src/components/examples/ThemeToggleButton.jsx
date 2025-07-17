import { useTheme } from '../../hooks/useTheme'

export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button onClick={toggleTheme} className="p-2 border rounded">
            Current: {theme}
        </button>
    )
}
