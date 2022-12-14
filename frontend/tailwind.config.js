/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'] 
      },
      height: {
        '128': '40rem',
      }
    },
    fontSize: {
      xs: '11px',
      m: '13px',
      s: '1rem',
      lg: "1.125rem",
      xl: '1.3rem',
      '5xl': '4.5rem',
      '2xl': '2rem'
    }
  },
  plugins: [
    require('flowbite/plugin')
],
extend: {
  colors: {
    'medium-gray': 'hsl(255, 2%, 65%)',
    'text-light-gray': '#A0AEC0',
    'blue-gray': '#2D3748',
  },
},
}
