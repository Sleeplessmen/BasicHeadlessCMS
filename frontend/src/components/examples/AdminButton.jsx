import { usePermission } from '../hooks/usePermission'

export default function AdminButton() {
    const { hasPermission } = usePermission()

    if (!hasPermission('admin:edit')) return null

    return <button className="btn">Edit Settings</button>
}
