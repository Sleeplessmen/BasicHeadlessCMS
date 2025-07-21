import styles from './SaveButton.module.css';
import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:1338/api/v1/page-config';

export default function SaveButton({ config, mode, onSuccess, onError }) {
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const url = mode === 'edit'
                ? `${API_BASE}/${config._id}`
                : API_BASE;

            const method = mode === 'edit' ? 'put' : 'post';

            const res = await axios[method](url, config, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert('✅ Lưu thành công!');
            onSuccess?.(res.data);
        } catch (err) {
            console.error('❌ Save failed:', err);
            const message = err.response?.data?.message || 'Có lỗi xảy ra khi lưu';
            alert('❌ ' + message);
            onError?.(message);
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
