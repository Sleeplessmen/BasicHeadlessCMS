import axios from 'axios'

export const registerUser = async ({ name, email, password, role }) => {
    try {
        const res = await axios.post('http://localhost:1338/api/v1/auth/register', {
            name,
            email,
            password,
            role,
        })

        return { success: true, message: res.data?.message || 'Đăng ký thành công' }
    } catch (err) {
        console.warn('⚠️ Đăng ký lỗi:', err.response?.data || err.message)
        return {
            success: false,
            message: err.response?.data?.message || 'Đăng ký thất bại',
        }
    }
}
