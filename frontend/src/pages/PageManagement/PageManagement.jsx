import PageConfigTable from './PageConfigTable'
import styles from './PageManagement.module.css'

export default function PageManagementPage() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Quản lý trang</h1>
            <PageConfigTable />
        </div>
    )
}
