import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import { useTheme } from '../hooks/useTheme';
import styles from './AppLayout.module.css';

export default function AppLayout() {
    const { toggleTheme } = useTheme();

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.contentWrapper}>
                <Navbar toggleDarkMode={toggleTheme} />
                <main className={styles.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
