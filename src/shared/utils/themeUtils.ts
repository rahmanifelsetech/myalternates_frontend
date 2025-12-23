import themeConfig from '@shared/config/theme.config';

export const applyTheme = () => {
  const root = document.documentElement;

  // Apply Brand Colors
  if (themeConfig.colors && themeConfig.colors.brand) {
    Object.entries(themeConfig.colors.brand).forEach(([key, value]) => {
      root.style.setProperty(`--color-brand-${key}`, value);
    });
  }

  // Apply Font Sizes
  if (themeConfig.fontSize) {
    Object.entries(themeConfig.fontSize).forEach(([key, value]) => {
      let varName = key;
      if (key.startsWith('title')) {
        // e.g., titleSm -> title-sm
        varName = key.replace('title', 'title-').toLowerCase();
      } else {
        // e.g., sm -> theme-sm
        varName = `theme-${key}`;
      }
      root.style.setProperty(`--text-${varName}`, value);
    });
  }

  // Apply Font Family
  if (themeConfig.fontFamily) {
    // Overriding the font-outfit variable used in index.css
    root.style.setProperty('--font-outfit', themeConfig.fontFamily);
  }
};
