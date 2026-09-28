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
        background: '#060709',
        foreground: '#F2F1EA',
        primary: {
          DEFAULT: '#D7FF3E',
          foreground: '#0A0C0A',
        },
        secondary: {
          DEFAULT: '#1A1D24',
          foreground: '#D7FF3E',
        },
        surface: '#0E1015',
        card: '#111319',
        line: '#262A34',
        input: '#12141A',
        accent: '#8AB4FF',
        warm: '#FFC46B',
        muted: {
          DEFAULT: '#9AA0AB',
          foreground: '#9AA0AB',
        },
      },
      fontFamily: {
        headings: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 50px rgba(215, 255, 62, 0.15)',
        'glow-accent': '0 0 50px rgba(138, 180, 255, 0.15)',
        'glow-warm': '0 0 50px rgba(255, 196, 107, 0.15)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}
