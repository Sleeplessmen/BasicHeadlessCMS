import styles from './FormRenderer.module.css';

export default function FormRenderer({ form }) {
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Form</h2>
            <ul className={styles.list}>
                {form.fields.map((field, idx) => (
                    <li key={idx} className={styles.item}>
                        <strong>{field.label}</strong> ({field.type}) {field.required ? ' (bắt buộc)' : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
}
