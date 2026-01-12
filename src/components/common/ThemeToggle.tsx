import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-theme-text hover:text-theme-primary bg-theme-accent/50 hover:bg-theme-accent rounded-xl transition-all duration-300 hover:shadow-lg groupflex items-center gap-2 px-4 py-2 rounded-lg bg-theme-card border border-theme-border hover:bg-theme-accent transition-all duration-300"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <>
                    <Sun className="text-theme-primary" size={20} />
                    <span className="text-theme-primary text-sm hidden sm:inline">Light</span>
                </>
            ) : (
                <>
                    <Moon className="text-theme-primary" size={20} />
                    <span className="text-theme-primary text-sm hidden sm:inline">Dark</span>
                </>
            )}
        </button>
    );
}
export default ThemeToggle;