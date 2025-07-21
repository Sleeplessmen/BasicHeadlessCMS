import { useState, useEffect } from 'react';
import styles from './PageTableLayoutSection.module.css';
import { FiPlus } from 'react-icons/fi';

export default function PageTableLayoutSection({ config, setConfig }) {
    const columns = config?.layout?.table?.columns || [];
    const [newColumn, setNewColumn] = useState({
        key: '',
        label: '',
        type: 'string',
    });

    useEffect(() => {
        if (!config?.layout?.table) {
            setConfig(prev => ({
                ...prev,
                layout: {
                    ...prev.layout,
                    table: {
                        ...prev.layout?.table,
                        columns: [],
                    },
                },
            }));
        }
    }, [config, setConfig]);

    const updateColumns = (updatedColumns) => {
        setConfig(prev => ({
            ...prev,
            layout: {
                ...prev.layout,
                table: {
                    ...prev.layout.table,
                    columns: updatedColumns,
                },
            },
        }));
    };

    const handleAddColumn = () => {
        if (!newColumn.key.trim() || !newColumn.label.trim()) return;
        updateColumns([...columns, newColumn]);
        setNewColumn({ key: '', label: '', type: 'string' });
    };

    const handleRemoveColumn = (index) => {
        const updated = columns.filter((_, i) => i !== index);
        updateColumns(updated);
    };

    return (
        <section className={styles.section}>
            <h3 className={styles.title}>Cấu hình Bảng</h3>

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
                <select
                    value={newColumn.type}
                    onChange={(e) => setNewColumn({ ...newColumn, type: e.target.value })}
                    className={styles.select}
                >
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="boolean">Boolean</option>
                </select>
                <button
                    type="button"
                    onClick={handleAddColumn}
                    className={styles.addBtn}
                    aria-label="Thêm cột mới"
                >
                    <FiPlus />
                </button>
            </div>

            <ul className={styles.columnList}>
                {columns.length === 0 && <li className={styles.empty}>Chưa có cột nào.</li>}
                {columns.map((col, index) => (
                    <li key={index} className={styles.columnItem}>
                        <span className={styles.columnText}>
                            <strong>{col.label}</strong> ({col.key}) [{col.type}]
                        </span>
                        <button
                            type="button"
                            className={styles.deleteBtn}
                            onClick={() => handleRemoveColumn(index)}
                        >
                            Xoá
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
