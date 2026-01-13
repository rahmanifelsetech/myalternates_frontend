# Typography & Font Size Standardization Guide

## Overview

This document provides comprehensive guidance on using standardized font sizes across the MyAlternates frontend application. All typography sizes, weights, and line heights are centralized in `theme.config.ts` and available through `typographyUtils.ts`.

---

## Configuration Files

### 1. Theme Configuration (`src/shared/config/theme.config.ts`)

All typography sizes are defined here:

```typescript
fontSize: {
  // Base sizes (12px, 14px, 16px, 18px)
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',

  // Component-specific sizes
  button: '14px',
  input: '16px',
  label: '14px',
  hint: '12px',
  error: '12px',

  // Table sizes
  tableHeader: '14px',
  tableCell: '14px',
  tableCellSmall: '12px',

  // Heading sizes
  h1: '32px',
  h2: '24px',
  h3: '20px',
  h4: '18px',
  h5: '16px',
  h6: '14px',

  // Special sizes
  subtitle: '14px',
  caption: '12px',
}

lineHeight: {
  tight: '1.2',    // For headings
  normal: '1.5',   // For body text
  relaxed: '1.75', // For paragraphs
}

fontWeight: {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}
```

### 2. Typography Utilities (`src/shared/utils/typographyUtils.ts`)

Provides ready-to-use Tailwind classes and utilities.

---

## Usage Guide

### Option 1: Using Pre-built Classes (Recommended)

Use predefined typography classes from `typographyClasses`:

#### Headings

```tsx
import { typographyClasses } from '@shared/utils/typographyUtils';

// Page titles
<h1 className={typographyClasses.heading.h1}>Page Title</h1>

// Section headings
<h2 className={typographyClasses.heading.h2}>Section Title</h2>

// Card/Component titles
<h3 className={typographyClasses.heading.h3}>Card Title</h3>

// Smaller headings
<h4 className={typographyClasses.heading.h4}>Subheading</h4>
<h5 className={typographyClasses.heading.h5}>Minor Heading</h5>
<h6 className={typographyClasses.heading.h6}>Smallest Heading</h6>
```

**Output**: `text-[32px] font-bold leading-tight` → consistent heading styling

#### Body Text

```tsx
// Paragraph text
<p className={typographyClasses.body.paragraph}>
  This is a paragraph with standard size and relaxed line height.
</p>

// Default body text
<p className={typographyClasses.body.default}>Standard text</p>

// Small text
<p className={typographyClasses.body.small}>Small description</p>

// Caption/helper text
<p className={typographyClasses.body.caption}>Supporting text</p>

// Subtitle
<p className={typographyClasses.body.subtitle}>Subtitle</p>
```

#### Component Text

```tsx
// Button text
<button className={typographyClasses.component.button}>Click Me</button>

// Input field
<input className={typographyClasses.component.input} />

// Input placeholder
<input placeholder="Enter value" className={"placeholder:" + typographyClasses.component.placeholder} />

// Badge text
<span className={typographyClasses.component.badge}>New</span>

// Tag text
<span className={typographyClasses.component.tag}>Tag</span>
```

#### Table Cells

```tsx
import { typographyClasses } from '@shared/utils/typographyUtils';

<Table>
  <TableHeader>
    <TableRow>
      <TableCell isHeader className={typographyClasses.table.header}>
        Column Header
      </TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className={typographyClasses.table.cell}>
        Regular cell content
      </TableCell>
      <TableCell className={typographyClasses.table.cellSmall}>
        Small secondary info
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Form Labels & Hints

```tsx
import { typographyClasses } from '@shared/utils/typographyUtils';

// Regular label
<label className={typographyClasses.form.label}>Email Address</label>

// Required field label
<label className={typographyClasses.form.labelRequired}>Password</label>

// Helper/hint text
<p className={typographyClasses.form.hint}>Password must be at least 8 characters</p>

// Error message
<p className={typographyClasses.form.error}>Invalid email address</p>
```

#### Special Styles

```tsx
// Page title
<h1 className={typographyClasses.special.pageTitle}>Dashboard</h1>

// Section title
<h2 className={typographyClasses.special.sectionTitle}>Recent Activity</h2>

// Card title
<h3 className={typographyClasses.special.cardTitle}>Card Title</h3>

// Emphasized text
<strong className={typographyClasses.special.emphasis}>Important</strong>

// Muted/secondary text
<span className={typographyClasses.special.muted}>Secondary information</span>

// Status text
<span className={typographyClasses.special.success}>Active</span>
<span className={typographyClasses.special.error}>Failed</span>
<span className={typographyClasses.special.warning}>Pending</span>
<span className={typographyClasses.special.info}>Info</span>
```

---

### Option 2: Using Individual Font Sizes

For custom combinations, use individual size references:

```tsx
// Custom combination
<p className="text-[16px] font-semibold leading-relaxed">Custom text</p>

// Or get size from theme
import { getFontSize } from '@shared/utils/typographyUtils';

<p style={{ fontSize: getFontSize('md') }}>Dynamic size</p>
```

---

### Option 3: Using Inline Styles

For dynamic styling needs:

```tsx
import { getTypographyStyle } from '@shared/utils/typographyUtils';

// Generate style object
const style = getTypographyStyle('md', 'semibold', 'normal');

<p style={style}>Dynamic typography</p>
```

---

## Component Implementation Examples

### Button Component

```tsx
// Button.tsx
const sizeClasses = {
  sm: `px-4 py-3 ${typographyClasses.component.button}`,
  md: `px-5 py-3.5 ${typographyClasses.component.button}`,
  lg: `px-6 py-4 text-[16px] font-medium`,
};
```

### Table Implementation

```tsx
// TableHeader cells
<TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header}`}>
  Column Name
</TableCell>

// TableBody cells
<TableCell className={`px-4 py-4 ${typographyClasses.table.cell}`}>
  Cell content
</TableCell>

// Small secondary info in table
<TableCell className={`px-4 py-4 ${typographyClasses.table.cellSmall}`}>
  Secondary info
</TableCell>
```

### Form Fields

```tsx
// Input label
<label className={typographyClasses.form.label}>Email</label>

// Input field
<input className={`px-3 py-2 ${typographyClasses.component.input}`} />

// Helper text
<p className={typographyClasses.form.hint}>Enter your email address</p>

// Error text
<p className={typographyClasses.form.error}>Email is invalid</p>
```

### Modal/Card Title

```tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <h2 className={typographyClasses.special.sectionTitle}>Modal Title</h2>
  <p className={typographyClasses.body.default}>Modal content here</p>
</Modal>
```

---

## Font Size Reference Chart

| Purpose | Size | Usage |
|---------|------|-------|
| **Page Title** | 32px (h1) | Main page headings |
| **Section Title** | 24px (h2) | Large section headings |
| **Subsection** | 20px (h3) | Card titles, major subsections |
| **Component Title** | 18px (h4) | Dialog titles, form section titles |
| **Small Heading** | 16px (h5) | Minor headings |
| **Tiny Heading** | 14px (h6) | Subheadings |
| **Body Text** | 16px | Default paragraph text |
| **Secondary Text** | 14px | Form labels, table cells, subtitles |
| **Small Text** | 12px | Hints, captions, error messages, badges |
| **Button** | 14px | Button text |
| **Input** | 16px | Input field text |
| **Table Header** | 14px | Table header cells |
| **Table Cell** | 14px | Table data cells |
| **Small Table Text** | 12px | Secondary table info |
| **Form Label** | 14px | Input/select labels |
| **Form Hint** | 12px | Helper/hint text below forms |
| **Badge/Tag** | 12px | Badge and tag text |

---

## Line Height Standards

| Type | Value | Usage |
|------|-------|-------|
| **Tight** | 1.2 | Headings, titles |
| **Normal** | 1.5 | Body text, labels, form text |
| **Relaxed** | 1.75 | Paragraphs, descriptions, long text |

---

## Font Weight Standards

| Weight | Value | Usage |
|--------|-------|-------|
| **Light** | 300 | Disabled text, muted content |
| **Normal** | 400 | Default body text |
| **Medium** | 500 | Labels, subtitles, emphasis |
| **Semibold** | 600 | Headings, important text |
| **Bold** | 700 | Strong emphasis, titles |

---

## Common Patterns

### Button

```tsx
<button className={`px-4 py-3 ${typographyClasses.component.button} rounded-md`}>
  Click Me
</button>
```

### Input Field

```tsx
<input 
  className={`px-3 py-2 ${typographyClasses.component.input} border rounded`}
  placeholder="Type here..."
/>
```

### Badge

```tsx
<span className={`px-2 py-1 ${typographyClasses.component.badge} bg-brand-100 rounded-full`}>
  Badge
</span>
```

### Card/Component Title

```tsx
<div className="p-4">
  <h3 className={typographyClasses.special.cardTitle}>Card Title</h3>
  <p className={typographyClasses.body.default}>Card content goes here</p>
</div>
```

### Form Group

```tsx
<div className="mb-4">
  <label className={typographyClasses.form.label}>Email Address</label>
  <input className={`mt-2 px-3 py-2 ${typographyClasses.component.input}`} />
  <p className={typographyClasses.form.hint}>We'll never share your email</p>
</div>
```

### Table Row

```tsx
<TableRow>
  <TableCell className={`px-4 py-4 ${typographyClasses.table.header}`}>
    Name
  </TableCell>
  <TableCell className={`px-4 py-4 ${typographyClasses.table.cell}`}>
    John Doe
  </TableCell>
  <TableCell className={`px-4 py-4 ${typographyClasses.table.cellSmall}`}>
    Inactive since 2 weeks
  </TableCell>
</TableRow>
```

---

## Migration Guide

### Updating Existing Components

When updating existing components, follow this pattern:

**Before:**
```tsx
<h3 className="text-lg font-semibold mb-4">Card Title</h3>
<p className="text-sm text-gray-600">Description</p>
<button className="px-4 py-2 text-sm">Submit</button>
```

**After:**
```tsx
import { typographyClasses } from '@shared/utils/typographyUtils';

<h3 className={`${typographyClasses.special.cardTitle} mb-4`}>Card Title</h3>
<p className={`${typographyClasses.body.small} text-gray-600`}>Description</p>
<button className={`px-4 py-2 ${typographyClasses.component.button}`}>Submit</button>
```

---

## Best Practices

1. ✅ **Use pre-built classes** from `typographyClasses` whenever possible
2. ✅ **Define typography in theme config** for all new sizes needed
3. ✅ **Never hardcode font sizes** like `text-[15px]` or `text-[13px]`
4. ✅ **Import from `typographyUtils`** in components that need consistent text
5. ✅ **Use semantic sizes** (h1, h2, body, button, etc.) not arbitrary sizes
6. ✅ **Update theme config first** if you need a new size, then use it across app
7. ✅ **Document custom typography** if deviating from standards
8. ✅ **Test in both light and dark modes** to ensure readability

## Anti-Patterns

1. ❌ **Hardcoding sizes** - `className="text-[17px]"` 
2. ❌ **Inconsistent headings** - Mix of h1, h2, h3 without hierarchy
3. ❌ **Magic numbers** - `text-lg`, `text-base` instead of semantic sizes
4. ❌ **Inline font sizes** - `style={{ fontSize: '18px' }}`
5. ❌ **Multiple font size definitions** - Scattered across files
6. ❌ **Ignoring line height** - All text with `leading-normal`
7. ❌ **Forgetting dark mode** - No `dark:` variants for text color

---

## Support & Questions

For questions or to add new typography styles:

1. Update `theme.config.ts` with new size/weight
2. Add corresponding class in `typographyClasses` in `typographyUtils.ts`
3. Update this guide with new usage pattern
4. Test across components and in dark mode

---

**Last Updated:** January 2026
**Maintained By:** Frontend Team
