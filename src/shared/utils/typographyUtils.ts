import themeConfig from '@shared/config/theme.config';

/**
 * Typography Utilities
 * 
 * This utility provides standardized font sizes and typography styles
 * to ensure consistency across the entire application.
 * 
 * Usage Examples:
 * - className={typographyClasses.heading.h1}
 * - className={typographyClasses.body.paragraph}
 * - className={typographyClasses.component.button}
 * - className={typographyClasses.table.header}
 * - className={typographyClasses.form.label}
 */

// Extract theme config
const { fontSize, lineHeight, fontWeight } = themeConfig;

/**
 * Get font size in px as a number (for inline styles or calculations)
 */
export const getFontSize = (key: keyof typeof fontSize): string => {
  return fontSize[key] || fontSize.sm;
};

/**
 * Tailwind-compatible typography classes
 * Format: className="text-{size} leading-{lineHeight}"
 */
export const typographyClasses = {
  // ============================================
  // HEADING STYLES
  // ============================================
  heading: {
    h1: 'text-[32px] font-bold leading-tight',
    h2: 'text-[24px] font-semibold leading-tight',
    h3: 'text-[20px] font-semibold leading-tight',
    h4: 'text-[18px] font-semibold leading-tight',
    h5: 'text-[16px] font-semibold leading-tight',
    h6: 'text-[14px] font-semibold leading-tight',
  },

  // ============================================
  // BODY & PARAGRAPH STYLES
  // ============================================
  body: {
    large: 'text-[18px] leading-relaxed',
    default: 'text-[16px] leading-normal',
    small: 'text-[14px] leading-normal',
    xsmall: 'text-[12px] leading-normal',
    
    paragraph: 'text-[16px] leading-relaxed',
    subtitle: 'text-[14px] leading-normal font-medium',
    caption: 'text-[12px] leading-normal text-gray-500 dark:text-gray-400',
  },

  // ============================================
  // BUTTON STYLES
  // ============================================
  component: {
    button: 'text-[14px] font-medium leading-normal',
    buttonLarge: 'text-[16px] font-medium leading-normal',
    input: 'text-[16px] leading-normal',
    placeholder: 'placeholder:text-[14px] placeholder:text-gray-400 dark:placeholder:text-gray-500',
    badge: 'text-[12px] font-medium leading-tight',
    tag: 'text-[12px] font-medium leading-tight',
  },

  // ============================================
  // TABLE STYLES
  // ============================================
  table: {
    header: 'text-[14px] font-semibold leading-normal',
    cell: 'text-[14px] leading-normal',
    cellSmall: 'text-[12px] leading-normal text-gray-600 dark:text-gray-400',
  },

  // ============================================
  // FORM STYLES
  // ============================================
  form: {
    label: 'text-[14px] font-medium leading-normal',
    labelRequired: 'text-[14px] font-medium leading-normal after:content-["*"] after:text-red-500 after:ml-1',
    hint: 'text-[12px] leading-normal text-gray-500 dark:text-gray-400 mt-1',
    error: 'text-[12px] leading-normal text-error-500 dark:text-error-400 mt-1',
    helperText: 'text-[12px] leading-normal text-gray-500 dark:text-gray-400',
  },

  // ============================================
  // SPECIAL STYLES
  // ============================================
  special: {
    pageTitle: 'text-[32px] font-bold leading-tight',
    sectionTitle: 'text-[20px] font-semibold leading-tight',
    cardTitle: 'text-[18px] font-semibold leading-tight',
    emphasis: 'text-[16px] font-semibold leading-normal',
    muted: 'text-[14px] leading-normal text-gray-500 dark:text-gray-400',
    success: 'text-[14px] leading-normal text-success-600 dark:text-success-400',
    error: 'text-[14px] leading-normal text-error-600 dark:text-error-400',
    warning: 'text-[14px] leading-normal text-warning-600 dark:text-warning-400',
    info: 'text-[14px] leading-normal text-info-600 dark:text-info-400',
  },
  
  // ============================================
  // COLOR STYLES
  // ============================================
  colors: {
    text: {
      primary: 'text-gray-900 dark:text-white', // For headings
      secondary: 'text-gray-700 dark:text-gray-300', // For body text
      muted: 'text-gray-500 dark:text-gray-400', // For hints, captions
    }
  }
};

/**
 * Generate inline styles object for dynamic styling
 */
export const getTypographyStyle = (
  size: keyof typeof fontSize = 'sm',
  weight: keyof typeof fontWeight = 'normal',
  lineHeightKey: keyof typeof lineHeight = 'normal'
) => ({
  fontSize: fontSize[size],
  fontWeight: fontWeight[weight],
  lineHeight: lineHeight[lineHeightKey],
});

/**
 * Combine multiple typography utilities
 */
export const combineTypography = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Typography size map for quick reference
 * Can be used in switch statements or mappings
 */
export const typographySizeMap = {
  // Base sizes
  xs: fontSize.xs,
  sm: fontSize.sm,
  md: fontSize.md,
  lg: fontSize.lg,
  
  // Component sizes
  button: fontSize.button,
  input: fontSize.input,
  label: fontSize.label,
  
  // Table sizes
  tableHeader: fontSize.tableHeader,
  tableCell: fontSize.tableCell,
  tableCellSmall: fontSize.tableCellSmall,
  
  // Heading sizes
  h1: fontSize.h1,
  h2: fontSize.h2,
  h3: fontSize.h3,
  h4: fontSize.h4,
  h5: fontSize.h5,
  h6: fontSize.h6,
} as const;

export default typographyClasses;
