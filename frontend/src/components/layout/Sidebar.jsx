import { NavLink } from 'react-router-dom'

const navItems = [
    { path: '/product', label: 'Product' },
    { path: '/user', label: 'User' },
    { path: '/permission', label: 'Permission' },
    { path: '/role', label: 'Role' },
    { path: '/builder', label: 'Builder' },
    { path: '/pages', label: 'Saved Pages' },
]

export default function Sidebar() {
    return (
        <aside className="w-[240px] h-screen bg-brand-dark text-white p-md shadow-soft">
            <div className="mb-xl">
                <h1 className="text-xl font-semibold">CMS Admin</h1>
            </div>
            <nav className="space-y-sm">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            [
                                'block px-md py-sm rounded-md no-underline',
                                isActive
                                    ? 'bg-brand text-white'
                                    : 'hover:bg-white/10 transition-colors',
                            ].join(' ')
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}
