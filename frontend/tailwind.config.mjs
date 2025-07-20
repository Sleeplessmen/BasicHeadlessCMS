import defaultTheme from 'tailwindcss/defaultTheme'

export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    faint: '#f0f9ff',
                    DEFAULT: '#0ea5e9',
                    dark: '#0284c7',
                },
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    900: '#111827',
                },
                danger: '#ef4444',
                success: '#22c55e',
                surface: {
                    light: '#ffffff',
                    dark: '#1e1e1e',
                },
            },
            spacing: {
                xs: '0.25rem',
                sm: '0.5rem',
                md: '1rem',
                lg: '1.5rem',
                xl: '2rem',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                sm: '0.25rem',
                md: '0.5rem',
                xl: '1rem',
                '2xl': '1.5rem',
            },
            boxShadow: {
                soft: '0 1px 3px rgba(0, 0, 0, 0.1)',
                strong: '0 4px 12px rgba(0, 0, 0, 0.2)',
            },
        },
    },
}
