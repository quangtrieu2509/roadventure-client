/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      colors: {
        main: '#DF6951',
        black: '#4D4D4D',
        buttonHover: '#f5f5f5',
        dividerFill: '#e0e0e0',
        boxBorder: '#d9d9d9',
        buttonHover1:'#FFF5F3',
        buttonClick1:'#FFEFEC',
        subText: '#333333',
        background: '#F2F2F2',
        extraText: '#757575',
        extraButton: '#F0F0F0',
        buttonHover2:'#ebebeb',
        "extra-text": "#dddddd"
      },
    },
  },
  plugins: [],
};
