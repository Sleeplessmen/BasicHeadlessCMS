import { useAuth } from '../contexts/AuthContext'

export default function PermissionGate({ permission, children }) {
    const { user } = useAuth()

    if (!user?.permissions?.includes(permission)) return null
    return children
}
