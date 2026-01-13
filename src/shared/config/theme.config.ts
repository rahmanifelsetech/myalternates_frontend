export const themeConfig = {
  theme: 'light',
  primaryColor: '#d4af37',
  fontFamily: 'Outfit, sans-serif',
  colors: {
    brand: {
      25: '#fefdf7',
      50: '#fef9e7',
      100: '#fef3ce',
      200: '#fde99d',
      300: '#fbdc6b',
      400: '#f0cf4a',
      500: '#d4af37',
      600: '#b89220',
      700: '#967515',
      800: '#745a10',
      900: '#5a460d',
      950: '#3d2f09',
    },
  },
  // ============================================
  // TYPOGRAPHY SIZES & STYLES
  // ============================================
  fontSize: {
    // ---- Base/Body Sizes (used in paragraphs, table cells, normal text)
    xs: '12px',      // Small helper text, captions
    sm: '14px',      // Default body text, table cells, descriptions
    md: '16px',      // Slightly larger body text, form inputs
    lg: '18px',      // Standard input placeholder, larger body text
    
    // ---- Component Sizes
    button: '14px',      // Button text size
    input: '16px',       // Input field text size
    placeholder: '14px', // Input placeholder text size
    label: '14px',       // Form label text size
    hint: '12px',        // Form hint/helper text size
    error: '12px',       // Error message text size
    
    // ---- Table Sizes
    tableHeader: '14px',    // Table header cell text
    tableCell: '14px',      // Table body cell text
    tableCellSmall: '12px', // Small table cell text (secondary info)
    
    // ---- Badge & Tags
    badge: '12px',    // Badge text size
    tag: '12px',      // Tag text size
    
    // ---- Heading Sizes
    h6: '14px',   // Smallest heading (subheading level)
    h5: '16px',   // Small heading
    h4: '18px',   // Medium heading (section title)
    h3: '20px',   // Large heading
    h2: '24px',   // Very large heading
    h1: '32px',   // Page title
    
    // ---- Special Sizes
    subtitle: '14px',   // Subtitle text
    caption: '12px',    // Caption text
    
    // ---- Legacy (kept for backward compatibility)
    titleSm: '30px',
    titleMd: '36px',
    titleLg: '48px',
    titleXl: '60px',
    title2xl: '72px',
  },

  // Line heights for different text types
  lineHeight: {
    tight: '1.2',    // For headings
    normal: '1.5',   // For body text
    relaxed: '1.75', // For paragraphs
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export default themeConfig;
