import { useEffect, useState } from 'react'

const mockUser = {
    email: 'user@example.com',
    role: 'Editor',
    permissions: ['view_product', 'edit_product', 'delete_product'],
}

export default function MePage() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setUser(mockUser)
        }, 300)
    }, [])

    if (!user) return <p>Loading...</p>

    return (
        <div className="max-w-xl mx-auto p-6 bg-surface-light rounded-xl shadow-2xl font-sans">
            <h2 className="text-2xl mb-4 text-brand-dark">👤 Thông tin tài khoản</h2>

            <div className="mb-4">
                <strong>Email:</strong> <span>{user.email}</span>
            </div>

            <div className="mb-4">
                <strong>Role:</strong> <span>{user.role}</span>
            </div>

            <div>
                <strong>Permissions:</strong>
                <ul className="pl-6 list-disc">
                    {user.permissions.map((perm) => (
                        <li key={perm} className="mb-1">
                            {perm}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
