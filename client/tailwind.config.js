/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{tsx, sx}", "./src/*.{ts, tsx}", "./static/*.html"],
    theme: {
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
            },
            colors: {
                cavernous: {
                    900: "#000000",
                    950: "#0d0d0d",
                    800: "#1a1a1a",
                    750: "#262626",
                    700: "#333333",
                    600: "#4d4d4d",
                    500: "#666666",
                    400: "#808080",
                    300: "#999999",
                    200: "#b3b3b3",
                    100: "#cccccc",
                    50 : "#e6e6e6",
                    25 : "#f2f2f2",
                    12 : "#f9f9f9",
                },
                red       : "#ff8080",
                yellow    : "#f4ff80",
                green     : "#80ff80",
                light_blue: "#b3e5ff",
                blue      : "#80c3ff",
                purple    : "#d580ff",
            },
        },
    },
    plugins: [],
}

