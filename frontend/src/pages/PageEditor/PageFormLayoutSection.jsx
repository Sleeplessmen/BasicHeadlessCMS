import { useState, useEffect } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import styles from './PageFormLayoutSection.module.css';

export default function PageFormLayoutSection({ config, setConfig }) {
    const [fields, setFields] = useState(config?.layout?.form?.fields || []);
    const [newField, setNewField] = useState({ label: '', type: 'text', required: false });
    const [apiConfig, setApiConfig] = useState(() => {
        const defaultConfig = { submit: '', method: 'POST' };
        const incoming = config?.layout?.form?.api;
        return incoming?.submit ? incoming : defaultConfig;
    });

    useEffect(() => {
        const method = ['GET', 'POST'].includes(apiConfig.method.toUpperCase()) ? apiConfig.method.toUpperCase() : 'POST';
        setConfig(prev => ({
            ...prev,
            layout: {
                ...prev.layout,
                form: {
                    ...prev.layout.form,
                    fields,
                    api: {
                        ...apiConfig,
                        method,
                    },
                },
            },
        }));
    }, [fields, apiConfig, setConfig]);

    const handleAddField = () => {
        if (!newField.label.trim()) return;

        const key = newField.label
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '') + '_' + Date.now();

        const newFieldWithKey = { ...newField, key };

        setFields([...fields, newFieldWithKey]);
        setNewField({ label: '', type: 'text', required: false });
    };

    const handleRemove = (index) => {
        const updated = fields.filter((_, i) => i !== index);
        setFields(updated);
    };

    return (
        <section className={styles.section}>
            <h3 className={styles.title}>Cấu hình Mẫu điền thông tin</h3>

            <div className={styles.apiConfig}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="API Submit URL (VD: /api/products)"
                    value={apiConfig.submit}
                    onChange={(e) => setApiConfig({ ...apiConfig, submit: e.target.value })}
                />
                <select
                    className={styles.select}
                    value={apiConfig.method}
                    onChange={(e) => setApiConfig({ ...apiConfig, method: e.target.value })}
                >
                    <option value="POST">POST</option>
                    <option value="GET">GET</option>
                </select>

            </div>

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
                    {/* <option value="select">Select</option> */}
                </select>
                <label className={styles.checkbox}>
                    <input
                        type="checkbox"
                        checked={newField.required}
                        onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                    />
                    Bắt buộc
                </label>
                <button className={styles.addBtn} onClick={handleAddField}>
                    <FiPlus size={16} />
                </button>
            </div>

            <ul className={styles.fieldList}>
                {fields.map((field, idx) => (
                    <li key={idx} className={styles.fieldItem}>
                        <span>
                            <strong>{field.label}</strong> ({field.type}) {field.required ? ' *' : ''}
                        </span>
                        <button onClick={() => handleRemove(idx)} className={styles.removeBtn}>
                            <FiX size={16} />
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
