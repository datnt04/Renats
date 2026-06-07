/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2f7f34',
                secondary: '#1e4d20',
                accent: '#0ea5e9',
                'renats-green': '#2f7f34',
                'renats-blue': '#0ea5e9',
                'renats-bg': '#f8fafc',
                'trust-high': '#22c55e',
                'trust-med': '#eab308',
                'trust-low': '#ef4444',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
