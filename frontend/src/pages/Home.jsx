import styles from './Home.module.css';

export default function HomePage() {
    return (
        <div>
            <h2 className={styles.heading}>Home</h2>
            <p className={styles.description}>Welcome to the CMS Admin Dashboard.</p>
        </div>
    )
}
