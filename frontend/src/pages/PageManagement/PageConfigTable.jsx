import { useEffect, useState } from 'react'
import { getAllPageConfigs } from '../../services/pageConfig'
import { useNavigate } from 'react-router-dom'
import styles from './PageConfigTable.module.css'

export default function PageConfigTable() {
    const [configs, setConfigs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchConfigs() {
            try {
                const response = await getAllPageConfigs()
                setConfigs(response)
            } catch (err) {
                console.error(err)
                setError('Lỗi khi tải danh sách cấu hình')
            } finally {
                setLoading(false)
            }
        }

        fetchConfigs()
    }, [])

    if (loading) return <p>Đang tải...</p>
    if (error) return <p className={styles.error}>{error}</p>

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Danh sách cấu hình trang</h3>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHeadRow}>
                        <th className={styles.tableCell}>Tên trang</th>
                        <th className={styles.tableCell}>Đường dẫn</th>
                        <th className={styles.tableCell}>Các nhãn của Table</th>
                        <th className={styles.tableCell}>Các nhãn của Form</th>
                        <th className={styles.tableCell}>Các nhãn của Button</th>
                        <th className={styles.tableCell}>API</th>
                    </tr>
                </thead>
                <tbody>
                    {configs.map((config) => (
                        <tr key={config.id} className={styles.tableBodyRow}>
                            <td className={styles.tableCell}>{config.name}</td>
                            <td
                                className={`${styles.tableCell} ${styles.slug}`}
                                onClick={() => navigate(`/pages/${config.slug}`)}
                            >
                                {config.slug}
                            </td>

                            <td className={`${styles.tableCell} ${styles.wrap}`}>
                                {config.layout?.table?.columns?.length > 0 ? (
                                    config.layout.table.columns.map((col, index) => (
                                        <div key={index}>• {col.label}</div>
                                    ))
                                ) : (
                                    <em>Không có bảng</em>
                                )}
                            </td>

                            <td className={`${styles.tableCell} ${styles.wrap}`}>
                                {config.layout?.form?.fields?.length > 0 ? (
                                    config.layout.form.fields.map((field, index) => (
                                        <div key={index}>• {field.label}</div>
                                    ))
                                ) : (
                                    <em>Không có form</em>
                                )}
                            </td>

                            <td className={`${styles.tableCell} ${styles.wrap}`}>
                                {config.layout?.buttons?.length > 0 ? (
                                    config.layout.buttons.map((btn, index) => (
                                        <div key={index}>
                                            <strong>{btn.label}</strong> ({btn.method})
                                        </div>
                                    ))
                                ) : (
                                    <em>Không có nút</em>
                                )}
                            </td>

                            <td className={`${styles.tableCell} ${styles.api}`}>
                                {config.api ? (
                                    Object.entries(config.api).map(([method, endpoint]) => (
                                        <div key={method}>
                                            <strong>{method.toUpperCase()}</strong>: {endpoint}
                                        </div>
                                    ))
                                ) : (
                                    <em>Không có API</em>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
