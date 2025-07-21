import { useState } from 'react';
import styles from './PageTableLayoutSection.module.css';

export default function PageTableLayoutSection({ config, setConfig }) {
    const columns = config.config.columns || [];

    const [newColumn, setNewColumn] = useState({ key: '', label: '' });

    const handleAddColumn = () => {
        if (!newColumn.key || !newColumn.label) return;

        const updated = {
            ...config,
            config: {
                ...config.config,
                columns: [...columns, { ...newColumn }],
            },
        };
        setConfig(updated);
        setNewColumn({ key: '', label: '' });
    };

    const handleRemoveColumn = (index) => {
        const updatedColumns = [...columns];
        updatedColumns.splice(index, 1);

        setConfig({
            ...config,
            config: {
                ...config.config,
                columns: updatedColumns,
            },
        });
    };

    return (
        <section className={styles.section}>
            <h3 className={styles.title}>Cấu hình Bảng động</h3>

            <ul className={styles.columnList}>
                {columns.length === 0 && <li>Chưa có cột nào.</li>}
                {columns.map((col, index) => (
                    <li key={index} className={styles.columnItem}>
                        <span>
                            <strong>{col.label}</strong> ({col.key})
                        </span>
                        <button
                            className={styles.deleteBtn}
                            onClick={() => handleRemoveColumn(index)}
                        >
                            Xoá
                        </button>
                    </li>
                ))}
            </ul>

            <div className={styles.addRow}>
                <input
                    type="text"
                    placeholder="Key"
                    value={newColumn.key}
                    onChange={(e) => setNewColumn({ ...newColumn, key: e.target.value })}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Label"
                    value={newColumn.label}
                    onChange={(e) => setNewColumn({ ...newColumn, label: e.target.value })}
                    className={styles.input}
                />
                <button onClick={handleAddColumn} className={styles.addBtn}>
                    Thêm cột
                </button>
            </div>
        </section>
    );
}
