import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormRenderer from './FormRenderer';
import TableRenderer from './TableRenderer';
import ButtonRenderer from './ButtonRenderer';

export default function DynamicPage() {
    const { slug } = useParams();
    const [pageConfig, setPageConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:1338/api/v1/page-config/${slug}`, {
            credentials: 'include'
        })
            .then(async res => {
                if (!res.ok) {
                    const error = await res.text();
                    throw new Error(`Lỗi ${res.status}: ${error}`);
                }
                return res.json();
            })
            .then(data => {
                setPageConfig(data?.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Lỗi khi fetch pageConfig:', err);
                setLoading(false);
            });
    }, [slug]);


    if (loading) return <p>Đang tải trang...</p>;
    if (!pageConfig) return <p>Không tìm thấy trang.</p>;

    const { name, layout } = pageConfig;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">{name}</h1>

            {layout?.form && <FormRenderer form={layout.form} />}
            {layout?.table && <TableRenderer table={layout.table} />}
            {layout?.buttons && layout.buttons.length > 0 && (
                <ButtonRenderer buttons={layout.buttons} />
            )}
        </div>
    );
}
