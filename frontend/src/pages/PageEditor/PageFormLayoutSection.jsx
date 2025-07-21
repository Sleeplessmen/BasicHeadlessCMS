import { useState } from 'react';
import styles from './PageFormLayoutSection.module.css';

export default function PageFormLayoutSection({ config, setConfig }) {
    const [fields, setFields] = useState(config?.form?.fields || []);
    const [newField, setNewField] = useState({ label: '', type: 'text', required: false });

    const updateParentConfig = (updatedFields) => {
        setFields(updatedFields);
        setConfig((prev) => ({
            ...prev,
            form: {
                ...(prev.form || {}),
                fields: updatedFields,
            },
        }));
    };

    const handleAddField = () => {
        if (!newField.label.trim()) return;

        updateParentConfig([...fields, newField]);
        setNewField({ label: '', type: 'text', required: false });
    };

    const handleRemove = (index) => {
        const updated = fields.filter((_, i) => i !== index);
        updateParentConfig(updated);
    };

    return (
        <section className={styles.section}>
            <h3 className={styles.title}>Cấu hình Form động</h3>

            <div className={styles.inputRow}>
                <input
                    type="text"
                    placeholder="Label"
                    className={styles.input}
                    value={newField.label}
                    onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                />
                <select
                    className={styles.select}
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                    <option value="date">Date</option>
                    <option value="select">Select</option>
                </select>
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={newField.required}
                        onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                    />
                    Bắt buộc
                </label>
                <button className={styles.addBtn} onClick={handleAddField}>➕</button>
            </div>

            <ul className={styles.fieldList}>
                {fields.map((field, idx) => (
                    <li key={idx} className={styles.fieldItem}>
                        <span>
                            <strong>{field.label}</strong> ({field.type}) {field.required ? ' *' : ''}
                        </span>
                        <button onClick={() => handleRemove(idx)} className={styles.removeBtn}>❌</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
