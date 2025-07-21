import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import PageGeneralSection from './PageGeneralSection';
import PageFormLayoutSection from './PageFormLayoutSection';
import PageTableLayoutSection from './PageTableLayoutSection';
import SaveButton from './SaveButton';

import styles from './PageEditor.module.css';

const API_BASE = 'http://localhost:1338/api/v1/page-config';

export default function PageEditor({ mode }) {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [pageConfig, setPageConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (mode === 'edit' && slug) {
            axios
                .get(`${API_BASE}/${slug}`, { withCredentials: true })
                .then((res) => {
                    setPageConfig(res.data?.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('❌ Lỗi khi tải trang:', err);
                    setError('Không thể tải dữ liệu từ máy chủ.');
                    setLoading(false);
                });
        } else {
            // Tạo cấu hình mặc định
            setPageConfig({
                name: '',
                slug: '',
                visibleForRoles: [],
                api: {
                    get: '',
                    create: '',
                    update: '',
                    delete: '',
                },
                layout: {
                    form: {
                        fields: [],
                        api: {
                            submit: '',
                            method: 'POST',
                        },
                    },
                    table: {
                        columns: [],
                        actions: [],
                        api: {
                            get: '',
                            delete: '',
                        },
                    },
                },
            });
            setLoading(false);
        }
    }, [mode, slug]);

    const handleChange = (key, value) => {
        setPageConfig((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    if (loading) return <p className={styles.loading}>Đang tải dữ liệu...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                {mode === 'edit' ? 'Chỉnh sửa trang động' : 'Tạo trang động mới'}
            </h2>

            <PageGeneralSection
                pageInfo={pageConfig}
                onChange={handleChange}
            />

            <PageFormLayoutSection
                config={pageConfig}
                setConfig={setPageConfig}
            />

            <PageTableLayoutSection
                config={pageConfig}
                setConfig={setPageConfig}
            />

            <div className={styles.actions}>
                <SaveButton
                    config={pageConfig}
                    mode={mode}
                    onSuccess={() => {
                        alert('✅ Lưu thành công!');
                        navigate('/pages');
                    }}
                    onError={(errorMessage) => {
                        alert('❌ Lỗi khi lưu trang: ' + errorMessage);
                    }}
                />
            </div>
        </div>
    );
}
