export default function ToggleDarkModeButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-gray-100 rounded-sm p-sm cursor-pointer"
        >
            🌓
        </button>
    )
}
