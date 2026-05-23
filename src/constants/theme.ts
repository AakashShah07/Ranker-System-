export const COLORS = {
  dark: {
    900: '#0a0a0f',
    800: '#0f0f1a',
    700: '#161625',
    600: '#1e1e30',
    500: '#2a2a40',
  },
  neon: {
    blue: '#00d4ff',
    purple: '#8b5cf6',
    pink: '#ec4899',
    green: '#10b981',
    red: '#ef4444',
    orange: '#f59e0b',
    cyan: '#06b6d4',
  },
  rank: {
    E: '#6b7280',
    D: '#10b981',
    C: '#3b82f6',
    B: '#8b5cf6',
    A: '#f59e0b',
    S: '#ef4444',
    National: '#ec4899',
  },
  difficulty: {
    easy: '#10b981',
    normal: '#3b82f6',
    hard: '#8b5cf6',
    boss: '#ef4444',
  },
  text: {
    primary: '#ffffff',
    secondary: '#94a3b8',
    muted: '#64748b',
  },
} as const;

export const GRADIENTS = {
  darkBg: ['#0a0a0f', '#0f0f1a', '#161625'],
  neonBlue: ['#00d4ff', '#0099cc'],
  neonPurple: ['#8b5cf6', '#6d28d9'],
  questCard: ['#1e1e30', '#161625'],
  xpBar: ['#00d4ff', '#8b5cf6'],
  danger: ['#ef4444', '#dc2626'],
} as const;
