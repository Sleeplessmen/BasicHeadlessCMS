export default function AuthLayout({ children }) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-6 bg-white shadow rounded-xl">
                {children}
            </div>
        </div>
    )
}
