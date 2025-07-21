import { FaReact } from 'react-icons/fa';
import ToggleDarkModeButton from './toggleDarkModeButton';
import LogoutButton from '../auth/LogoutButton';
import styles from './Navbar.module.css';

export default function Navbar({ toggleDarkMode }) {
    return (
        <header className={styles.navbar}>
            <div className={styles.logo}>
                <FaReact size={28} />
            </div>
            <div className={styles.actions}>
                <ToggleDarkModeButton onClick={toggleDarkMode} />
                <LogoutButton />
            </div>
        </header>
    );
}
