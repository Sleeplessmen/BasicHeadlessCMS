import styles from './SaveButton.module.css';
import { useState } from 'react';

export default function SaveButton({ config, mode, onSuccess }) {
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(
                mode === 'edit'
                    ? `http://localhost:1338/api/v1/page-config/${config._id}`
                    : 'http://localhost:1338/api/v1/page-config',
                {
                    method: mode === 'edit' ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(config),
                }
            );

            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Có lỗi xảy ra');

            alert('✅ Lưu thành công!');
            onSuccess?.();
        } catch (err) {
            console.error(err);
            alert('❌ Lỗi khi lưu trang: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={saving}
        >
            {saving ? 'Đang lưu...' : 'Lưu'}
        </button>
    );
}
