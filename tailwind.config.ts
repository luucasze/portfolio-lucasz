import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0B0B0B",
                primary: "#FC4F00",
                white: "#FFFFFF",
                gray: "#E6E6E6",
                darkAccent: "#1A1A1A"
            },
        },
    },
    plugins: [],
};
export default config;
