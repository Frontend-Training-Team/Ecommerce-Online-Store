/** @type {import('tailwindcss').Config} */

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                Instrument: ['"Instrument"', 'Instrument Serif'],
                Serif: ['"Playfair Display"', 'serif'],
                numeric: ['"JetBrains Mono"', 'monospace'],
                Inter: ['"Inter"', 'sans-serif'],
            },
            // Dark mode palette — "Noir & Copper" (see DESIGN_SYSTEM.md)
            colors: {
                noir: {
                    950: '#070605',
                    900: '#0B0A09',
                    850: '#100E0D',
                    800: '#151312',
                    750: '#1B1917',
                    700: '#23201D',
                    650: '#2B2825',
                    600: '#36322E',
                },
                fg: {
                    DEFAULT: '#F1EBE2',
                    secondary: '#BFB5A8',
                    tertiary: '#9A9083',
                    placeholder: '#7C7369',
                    disabled: '#5E5750',
                    'on-accent': '#140D08',
                },
                line: {
                    subtle: '#1E1B19',
                    DEFAULT: '#2A2623',
                    strong: '#3B3632',
                    hover: '#4D4640',
                    control: '#6B6359',
                },
                copper: {
                    200: '#F0CDAF',
                    300: '#E8B58F',
                    400: '#D99B70',
                    500: '#C98156',
                    600: '#A8653F',
                    700: '#7E4A2D',
                    800: '#4A2E1D',
                    900: '#2A1B12',
                },
                state: {
                    success: '#82BD98',
                    'success-solid': '#5E9F78',
                    warning: '#DDB064',
                    danger: '#E5857A',
                    'danger-solid': '#B44E42',
                    info: '#8DB0D2',
                    shipped: '#7DBDB5',
                    confirmed: '#E8B58F',
                    neutral: '#A39B91',
                },
                star: '#E3B869',
                champagne: '#D9C29A',
            },
            boxShadow: {
                'noir-sm': '0 1px 2px 0 rgb(0 0 0 / 0.5)',
                'noir-md': '0 8px 24px -8px rgb(0 0 0 / 0.6)',
                'noir-lg': '0 24px 48px -16px rgb(0 0 0 / 0.75), 0 0 0 1px rgb(255 255 255 / 0.04)',
            },
        },
    },
    plugins: [],
}
