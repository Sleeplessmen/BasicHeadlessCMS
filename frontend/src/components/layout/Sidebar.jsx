import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const navItems = [
    { path: '/product', label: 'Product' },
    { path: '/user', label: 'User' },
    { path: '/permission', label: 'Permission' },
    { path: '/role', label: 'Role' },
    { path: '/builder', label: 'Builder' },
    { path: '/pages', label: 'Saved Pages' },
];

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            {/* <div className={styles.header}>
                <h1 className={styles.title}>CMS Admin</h1>
            </div> */}
            <nav className={styles.nav}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.link} ${styles.active}`
                                : `${styles.link}`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
