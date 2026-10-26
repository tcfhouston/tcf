/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#2563EB',
        secondary: '#F59E0B',
        accent:    '#10B981',
        warm:      '#FEF3C7',
        deep:      '#1E3A5F',
        'text-main':  '#1F2937',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body:    ['Nunito Sans', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
