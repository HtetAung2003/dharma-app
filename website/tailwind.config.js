/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dharma: {
          dark: '#060B11',
          card: '#0D1724',
          'card-hover': '#132133',
          border: 'rgba(217, 119, 6, 0.2)',
          'border-hover': 'rgba(245, 158, 11, 0.45)',
          gold: {
            50: '#FFFDF0',
            100: '#FFFBE6',
            200: '#FFF4BA',
            300: '#FFEA85',
            400: '#FCD34D',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
          },
          lotus: {
            400: '#FB7185',
            500: '#F43F5E',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Padauk', 'sans-serif'],
        myanmar: ['Padauk', '"Noto Sans Myanmar"', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at top, var(--tw-gradient-stops))',
        'gold-glow': 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.15) 0%, rgba(6, 11, 17, 0) 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
