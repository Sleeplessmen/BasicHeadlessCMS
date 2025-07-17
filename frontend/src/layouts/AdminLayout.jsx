export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-white shadow p-4">Header</header>
            <main className="flex-1 p-4">{children}</main>
            <footer className="bg-white shadow p-4 text-center">Footer</footer>
        </div>
    )
}
