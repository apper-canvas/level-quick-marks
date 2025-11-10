/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: "#475569",
        secondary: "#64748B", 
        accent: "#E11D48",
        surface: "#FFFFFF",
        background: "#F8FAFC",
        success: "#059669",
        warning: "#D97706",
        error: "#DC2626",
        info: "#0369A1"
      },
fontFamily: {
        'display': ['Proxima Nova', 'system-ui', 'sans-serif'],
        'body': ['Proxima Nova', 'system-ui', 'sans-serif'],
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