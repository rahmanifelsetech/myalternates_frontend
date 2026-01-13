# Typography Quick Reference

## 🎯 Quick Start

```tsx
import { typographyClasses } from '@shared/utils/typographyUtils';

// Headings
<h1 className={typographyClasses.heading.h1}>Page Title</h1>
<h2 className={typographyClasses.heading.h2}>Section</h2>

// Body
<p className={typographyClasses.body.paragraph}>Paragraph text</p>

// Components
<button className={typographyClasses.component.button}>Button</button>

// Tables
<td className={typographyClasses.table.cell}>Cell</td>

// Forms
<label className={typographyClasses.form.label}>Label</label>
```

---

## 📊 Font Size Chart

| Element | Size | Tailwind Class |
|---------|------|---------|
| **Page Title** | 32px | `text-[32px]` |
| **Section Header** | 24px | `text-[24px]` |
| **Subsection** | 20px | `text-[20px]` |
| **Component Title** | 18px | `text-[18px]` |
| **Small Heading** | 16px | `text-[16px]` |
| **Tiny Heading** | 14px | `text-[14px]` |
| **Body/Input** | 16px | `text-[16px]` |
| **Default Text** | 14px | `text-[14px]` |
| **Small Text** | 12px | `text-[12px]` |

---

## 🎨 Pre-built Classes

### Headings
```tsx
typographyClasses.heading.h1    // 32px, bold, tight
typographyClasses.heading.h2    // 24px, semibold, tight
typographyClasses.heading.h3    // 20px, semibold, tight
typographyClasses.heading.h4    // 18px, semibold, tight
typographyClasses.heading.h5    // 16px, semibold, tight
typographyClasses.heading.h6    // 14px, semibold, tight
```

### Body Text
```tsx
typographyClasses.body.large       // 18px, relaxed
typographyClasses.body.default     // 16px, normal
typographyClasses.body.small       // 14px, normal
typographyClasses.body.xsmall      // 12px, normal
typographyClasses.body.paragraph   // 16px, relaxed
typographyClasses.body.subtitle    // 14px, medium, normal
typographyClasses.body.caption     // 12px, gray-500
```

### Components
```tsx
typographyClasses.component.button      // 14px, medium
typographyClasses.component.buttonLarge // 16px, medium
typographyClasses.component.input       // 16px
typographyClasses.component.placeholder // 14px, gray-400
typographyClasses.component.badge       // 12px, medium
typographyClasses.component.tag         // 12px, medium
```

### Tables
```tsx
typographyClasses.table.header      // 14px, semibold
typographyClasses.table.cell        // 14px
typographyClasses.table.cellSmall   // 12px, gray-600
```

### Forms
```tsx
typographyClasses.form.label           // 14px, medium
typographyClasses.form.labelRequired   // 14px, medium, with red *
typographyClasses.form.hint            // 12px, gray-500
typographyClasses.form.error           // 12px, error-500
typographyClasses.form.helperText      // 12px, gray-500
```

### Special Styles
```tsx
typographyClasses.special.pageTitle     // 32px, bold
typographyClasses.special.sectionTitle  // 20px, semibold
typographyClasses.special.cardTitle     // 18px, semibold
typographyClasses.special.emphasis      // 16px, semibold
typographyClasses.special.muted         // 14px, gray-500
typographyClasses.special.success       // 14px, success-600
typographyClasses.special.error         // 14px, error-600
typographyClasses.special.warning       // 14px, warning-600
typographyClasses.special.info          // 14px, info-600
```

---

## 💡 Common Usage Patterns

### Button
```tsx
<button className={`px-4 py-3 ${typographyClasses.component.button} rounded-lg`}>
  Click Me
</button>
```

### Input + Label
```tsx
<label className={typographyClasses.form.label}>Email</label>
<input className={`mt-2 px-3 py-2 ${typographyClasses.component.input}`} />
<p className={typographyClasses.form.hint}>We'll never spam you</p>
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
</TableRow>
```

### Card
```tsx
<div className="p-6 bg-white rounded-lg">
  <h3 className={typographyClasses.special.cardTitle}>Card Title</h3>
  <p className={typographyClasses.body.default}>Card content here</p>
</div>
```

### Badge
```tsx
<span className={`px-2 py-1 ${typographyClasses.component.badge} bg-brand-100 rounded-full`}>
  Badge
</span>
```

---

## 🎯 Best Practices

✅ DO:
- Import from `typographyUtils`
- Use pre-built classes
- Reference theme config for sizes

❌ DON'T:
- Hardcode sizes like `text-[15px]`
- Mix `text-sm` with `text-base`
- Use different sizes for same purpose

---

## 📝 Adding New Typography

1. Add to `theme.config.ts`:
```typescript
fontSize: {
  // ... existing sizes
  customSize: '18px',
}
```

2. Add class to `typographyUtils.ts`:
```typescript
export const typographyClasses = {
  // ... existing classes
  custom: 'text-[18px] font-medium leading-normal'
}
```

3. Use in components:
```tsx
<p className={typographyClasses.custom}>Custom text</p>
```

---

## 📚 Full Documentation

See [TYPOGRAPHY_GUIDE.md](./TYPOGRAPHY_GUIDE.md) for complete documentation.

