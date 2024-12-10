// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Para arquivos dentro da pasta app
    "./src/app/**/*.{js,ts,jsx,tsx}", // Para arquivos dentro da pasta app
    "./pages/**/*.{js,ts,jsx,tsx}", // Para arquivos dentro da pasta pages
    "./components/**/*.{js,ts,jsx,tsx}", // Para arquivos dentro da pasta components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
