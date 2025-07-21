import { FiMoon, FiSun } from 'react-icons/fi'
import styles from './ToggleDarkModeButton.module.css'
import { useTheme } from '../../hooks/useTheme'

export default function ToggleDarkModeButton() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button onClick={toggleTheme} className={styles.toggleButton}>
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
    )
}
