import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageGeneralSection from './PageGeneralSection';
import PageFormLayoutSection from './PageFormLayoutSection';
import PageTableLayoutSection from './PageTableLayoutSection';
import PagePreviewButton from './PagePreviewButton';
import SaveButton from './SaveButton';

const API_BASE = 'http://localhost:1338/api/v1/page-config';

export default function PageEditor({ mode }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pageConfig, setPageConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (mode === 'edit' && id) {
            fetch(`${API_BASE}/${id}`)
                .then(res => res.json())
                .then(data => {
                    setPageConfig(data?.data);
                    setLoading(false);
                });
        } else {
            setPageConfig({
                name: '',
                slug: '',
                visibleForRoles: [],
                layout: {
                    type: 'form',
                    form: {
                        fields: [],
                        api: '',
                    },
                    table: {
                        columns: [],
                        api: '',
                    },
                    buttons: [],
                },
            });
            setLoading(false);
        }
    }, [mode, id]);

    const handleChange = (key, value) => {
        setPageConfig(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">
                {mode === 'edit' ? 'Chỉnh sửa trang động' : 'Tạo trang động mới'}
            </h2>

            <PageGeneralSection
                pageInfo={pageConfig}
                onChange={handleChange}
            />

            {pageConfig.layout.type === 'form' && (
                <PageFormLayoutSection
                    config={pageConfig}
                    setConfig={setPageConfig}
                />
            )}

            {pageConfig.layout.type === 'table' && (
                <PageTableLayoutSection
                    config={pageConfig}
                    setConfig={setPageConfig}
                />
            )}

            <div className="flex gap-4">
                <PagePreviewButton config={pageConfig} />
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
