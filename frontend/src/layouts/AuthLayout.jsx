import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export default function AuthLayout() {
    // console.log('📦 AuthLayout rendered');
    return (
        <div className={styles.layout}>
            <div className={styles.card}>
                <Outlet />
            </div>
        </div>
    );
}
