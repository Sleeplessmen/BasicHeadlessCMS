import ToggleDarkModeButton from './ToggleDarkModeButton'

export default function Navbar({ toggleDarkMode }) {
    return (
        <header className="h-[60px] flex justify-between items-center px-lg bg-surface-light shadow-soft">
            <div className="font-bold">🌟 Logo</div>
            <ToggleDarkModeButton onClick={toggleDarkMode} />
        </header>
    )
}
