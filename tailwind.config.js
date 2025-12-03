/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0A3D62',
                    dark: '#082E4A',
                    light: '#0E5280',
                },
                accent: {
                    green: '#00D9A3',
                    blue: '#3B82F6',
                    red: '#DC2626',
                },
                neutral: {
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',
                    900: '#0F172A',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mulish: ["Mulish", "sans-serif"],
            },
            boxShadow: {
                'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
            animation: {
                scroll: 'scroll 20s linear infinite',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            }
        },
    },
    plugins: [],
}
