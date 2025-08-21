module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        'ghost': {
          'primary': 'var(--ghost-primary)',
          'secondary': 'var(--ghost-secondary)',
          'accent': 'var(--ghost-accent)',
          'purple': 'var(--ghost-purple)',
          'pink': 'var(--ghost-pink)',
          'text': 'var(--ghost-text)',
          'text-secondary': 'var(--ghost-text-secondary)',
          'border': 'var(--ghost-border)',
          'hover': 'var(--ghost-hover)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ghost-gradient': 'linear-gradient(135deg, var(--ghost-primary) 0%, var(--ghost-secondary) 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
