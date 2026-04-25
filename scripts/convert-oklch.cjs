const { oklch, formatCss } = require('culori');

const colors = {
  background: '#ffffff',
  foreground: '#0f172a',
  card: '#ffffff',
  'card-foreground': '#0f172a',
  popover: '#ffffff',
  'popover-foreground': '#0f172a',
  primary: '#7c3aed',
  'primary-foreground': '#ffffff',
  secondary: '#f1f5f9',
  'secondary-foreground': '#334155',
  muted: '#f8fafc',
  'muted-foreground': '#64748b',
  accent: '#8b5cf6',
  'accent-foreground': '#ffffff',
  destructive: '#ef4444',
  'destructive-foreground': '#ffffff',
  border: '#e2e8f0',
  input: '#e2e8f0',
  ring: '#7c3aed',
  success: '#10b981',
  'success-foreground': '#ffffff',
  info: '#3b82f6',
  'info-foreground': '#ffffff',
  warning: '#f59e0b',
  'warning-foreground': '#ffffff',
};

const darkColors = {
  background: '#020617',
  foreground: '#f8fafc',
  card: '#0f172a',
  'card-foreground': '#f8fafc',
  popover: '#0f172a',
  'popover-foreground': '#f8fafc',
  primary: '#8b5cf6',
  'primary-foreground': '#ffffff',
  secondary: '#1e293b',
  'secondary-foreground': '#94a3b8',
  muted: '#0f172a',
  'muted-foreground': '#94a3b8',
  accent: '#a78bfa',
  'accent-foreground': '#020617',
  destructive: '#ef4444',
  'destructive-foreground': '#ffffff',
  border: '#1e293b',
  input: '#1e293b',
  ring: '#8b5cf6',
  success: '#34d399',
  'success-foreground': '#020617',
  info: '#60a5fa',
  'info-foreground': '#020617',
  warning: '#fbbf24',
  'warning-foreground': '#020617',
};

function toOklch(hex) {
  const c = oklch(hex);
  const L = c.l.toFixed(4);
  const C = c.c.toFixed(4);
  const H = c.h == null ? '0' : c.h.toFixed(4);
  return `oklch(${L} ${C} ${H})`;
}

console.log('/* LIGHT */');
for (const [name, hex] of Object.entries(colors)) {
  console.log(`  --${name}: ${toOklch(hex)};`);
}

console.log('\n/* DARK */');
for (const [name, hex] of Object.entries(darkColors)) {
  console.log(`  --${name}: ${toOklch(hex)};`);
}
