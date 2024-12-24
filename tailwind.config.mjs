/** @type {import('tailwindcss').Config} */
const preset=require('./tailwind-preset');
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme:{
          ...preset.theme
  },
 
  
  plugins: [],
};
