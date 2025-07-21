import styles from './TableRenderer.module.css';

export default function TableRenderer({ table }) {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Table</h2>
            <ul className={styles.list}>
                {table.columns.map((col, idx) => (
                    <li key={idx} className={styles.item}>
                        <strong>{col.label}</strong> ({col.key})
                    </li>
                ))}
            </ul>
        </div>
    );
}
