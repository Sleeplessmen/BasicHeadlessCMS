import { useState, useEffect } from 'react';
import styles from './PageTableLayoutSection.module.css';
import { FiPlus } from 'react-icons/fi';

export default function PageTableLayoutSection({ config, setConfig }) {
    const columns = config?.layout?.table?.columns || [];
    const apiGetUrl = config?.layout?.table?.api?.get || '';

    const [newColumn, setNewColumn] = useState({
        key: '',
        label: '',
        type: 'string',
    });

    useEffect(() => {
        // Chỉ chạy nếu chưa có layout.table
        if (!config?.layout?.table) {
            setConfig(prev => {
                if (prev?.layout?.table) return prev;
                return {
                    ...prev,
                    layout: {
                        ...prev.layout,
                        table: {
                            columns: [],
                            api: { get: '' },
                        },
                    },
                };
            });
            return; // Dừng lại, tránh chạy tiếp phần normalize
        }

        // Normalize columns, nhưng chỉ nếu cần
        const existingCols = config.layout.table.columns || [];
        const needsNormalization = existingCols.some(col => !col.type);

        if (needsNormalization) {
            const normalizedColumns = existingCols.map(col => ({
                ...col,
                type: col.type || 'string',
            }));

            setConfig(prev => ({
                ...prev,
                layout: {
                    ...prev.layout,
                    table: {
                        ...prev.layout.table,
                        columns: normalizedColumns,
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
                    api: {
                        get: prev.layout.table?.api?.get || '',
                    },
                },
            },
        }));
    };

    const handleApiGetChange = (e) => {
        const value = e.target.value;
        setConfig(prev => ({
            ...prev,
            layout: {
                ...prev.layout,
                table: {
                    ...prev.layout.table,
                    api: {
                        ...prev.layout.table?.api,
                        get: value,
                    },
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

            {/* Nhập API GET URL */}
            <div className={styles.row}>
                <input
                    type="text"
                    placeholder="API GET URL (VD: /api/product)"
                    value={apiGetUrl}
                    onChange={handleApiGetChange}
                    className={styles.input}
                />
            </div>

            {/* Thêm cột mới */}
            <div className={styles.addRow}>
                <input
                    type="text"
                    placeholder="Label (VD: Tên sản phẩm)"
                    value={newColumn.label}
                    onChange={(e) => {
                        const label = e.target.value;
                        const suggestedKey = label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
                        setNewColumn((prev) => ({
                            ...prev,
                            label,
                            key: prev.key || suggestedKey,
                        }));
                    }}
                    className={styles.input}
                />

                <input
                    type="text"
                    placeholder="Key (VD: product_name)"
                    value={newColumn.key}
                    onChange={(e) => {
                        const key = e.target.value;
                        if (/^[a-z0-9_]*$/.test(key)) {
                            setNewColumn((prev) => ({ ...prev, key }));
                        }
                    }}
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

            {/* Danh sách cột */}
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
