import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
    { path: '/page-editor/new', label: 'Page Editor', roles: ['admin', 'editor'] },
    { path: '/page-management', label: 'Saved Pages', roles: ['admin', 'editor'] },
    { path: '/product', label: 'Product', roles: ['admin', 'editor', 'user'] },
    { path: '/user', label: 'User', roles: ['admin'] },
    { path: '/permission', label: 'Permission', roles: ['admin'] },
    { path: '/role', label: 'Role', roles: ['admin'] },
];

export default function Sidebar() {
    const { user } = useAuth();

    const userRole = user?.role?.name;

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                {navItems
                    .filter((item) => item.roles.includes(userRole))
                    .map((item) => (
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
