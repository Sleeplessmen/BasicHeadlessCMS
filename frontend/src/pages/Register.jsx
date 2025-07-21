import RegisterForm from '../components/auth/RegisterForm'
import styles from './Register.module.css'

export default function RegisterPage() {
    return (
        <div className={styles.registerWrapper}>
            <h2 className={styles.title}>Đăng ký tài khoản</h2>
            <RegisterForm />
        </div>
    )
}
