export type Theme = {
  id: string;
  name: string;
  startColor: string;
  endColor: string;
  cardColor: string;
  sparkleColor: string;
};

export const themes: Theme[] = [
  {
    id: 'classic',
    name: 'Classic',
    startColor: '#dc2626', // red-600
    endColor: '#16a34a', // green-600
    cardColor: '#ef4444', // red-500
    sparkleColor: '#fde047', // yellow-300
  },
  {
    id: 'winter',
    name: 'Winter',
    startColor: '#1e40af', // blue-800
    endColor: '#ffffff', // white
    cardColor: '#3b82f6', // blue-500
    sparkleColor: '#e0e7ff', // indigo-100
  },
  {
    id: 'royal',
    name: 'Royal',
    startColor: '#7c3aed', // violet-600
    endColor: '#eab308', // yellow-500
    cardColor: '#a855f7', // purple-500
    sparkleColor: '#fbbf24', // amber-400
  },
  {
    id: 'candy',
    name: 'Candy',
    startColor: '#ec4899', // pink-500
    endColor: '#dc2626', // red-600
    cardColor: '#f472b6', // pink-400
    sparkleColor: '#fda4af', // rose-300
  },
  {
    id: 'golden',
    name: 'Golden',
    startColor: '#d97706', // amber-600
    endColor: '#eab308', // yellow-500
    cardColor: '#f59e0b', // amber-500
    sparkleColor: '#fde047', // yellow-300
  },
  {
    id: 'icy',
    name: 'Icy',
    startColor: '#475569', // slate-600
    endColor: '#0ea5e9', // sky-500
    cardColor: '#64748b', // slate-500
    sparkleColor: '#bae6fd', // sky-200
  },
  {
    id: 'forest',
    name: 'Forest',
    startColor: '#059669', // emerald-600
    endColor: '#14b8a6', // teal-500
    cardColor: '#10b981', // emerald-500
    sparkleColor: '#6ee7b7', // emerald-300
  },
  {
    id: 'sunset',
    name: 'Sunset',
    startColor: '#ea580c', // orange-600
    endColor: '#f43f5e', // rose-500
    cardColor: '#f97316', // orange-500
    sparkleColor: '#fb7185', // rose-400
  },
  {
    id: 'aurora',
    name: 'Aurora',
    startColor: '#4f46e5', // indigo-600
    endColor: '#d946ef', // fuchsia-500
    cardColor: '#6366f1', // indigo-500
    sparkleColor: '#c084fc', // purple-300
  },
];

export const getThemeById = (id: string): Theme => {
  return themes.find(t => t.id === id) || themes[0];
};

