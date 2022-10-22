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
    },
    fontSize: {
      xs: '11px',
      lg: "1.125rem",
      'xl': '1.3rem'
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
