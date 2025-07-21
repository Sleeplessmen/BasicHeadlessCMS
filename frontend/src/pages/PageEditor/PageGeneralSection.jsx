import styles from './PageGeneralSection.module.css'

export default function PageGeneralSection({ pageInfo }) {
    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>Thông tin trang</h2>
            <p><strong>Tên:</strong> {pageInfo.name}</p>
            <p><strong>Slug:</strong> {pageInfo.slug}</p>
            <p><strong>Roles:</strong> {pageInfo.visibleForRoles.join(', ')}</p>
        </div>
    );
}
