import styles from './ButtonRenderer.module.css';

export default function ButtonRenderer({ buttons }) {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Các hành động</h2>
            <ul className={styles.list}>
                {buttons.map((btn, idx) => (
                    <li key={idx} className={styles.item}>
                        <strong>{btn.label}</strong> – gọi `{btn.method} {btn.api}` {btn.confirm ? '(có xác nhận)' : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
}
