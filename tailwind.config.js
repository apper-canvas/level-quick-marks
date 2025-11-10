/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B7FFF",
        secondary: "#8B5FFF",
        accent: "#FF6B6B",
        surface: "#FFFFFF",
        background: "#F8F9FA",
        success: "#51CF66",
        warning: "#FFA94D",
        error: "#FF6B6B",
        info: "#5B7FFF"
      },
      fontFamily: {
        'display': ['Outfit', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Monaco', 'Consolas', 'monospace']
      },
      animation: {
        'scale-hover': 'scale-hover 150ms ease-out',
        'scale-press': 'scale-press 100ms ease-out',
        'shake': 'shake 200ms ease-in-out',
        'pulse-success': 'pulse-success 300ms ease-out'
      },
      keyframes: {
        'scale-hover': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02)' }
        },
        'scale-press': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.98)' }
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
        },
        'pulse-success': {
          '0%': { background: 'var(--success)', transform: 'scale(1)' },
          '50%': { background: 'var(--success)', transform: 'scale(1.05)' },
          '100%': { background: 'var(--success)', transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}