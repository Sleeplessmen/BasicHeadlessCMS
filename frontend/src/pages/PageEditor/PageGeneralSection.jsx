import styles from './PageGeneralSection.module.css';

const AVAILABLE_ROLES = ['admin', 'editor', 'user'];

export default function PageGeneralSection({ pageInfo, onChange }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>Thông tin trang</h2>

            <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>Tên trang</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={pageInfo.name}
                    onChange={handleInputChange}
                    className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="slug" className={styles.label}>Slug</label>
                <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={pageInfo.slug}
                    onChange={handleInputChange}
                    className={styles.input}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="roles" className={styles.label}>Hiển thị cho các role sau</label>
                <select
                    id="roles"
                    name="roles"
                    multiple
                    value={pageInfo.visibleForRoles}
                    disabled
                    className={`${styles.select} ${styles.disabledSelect}`}
                >
                    {AVAILABLE_ROLES.map(role => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
                <div className={styles.hint}>Trang này hiện hiển thị cho tất cả role.</div>
            </div>
        </div>
    );
}
