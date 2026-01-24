# Hijri Date Timeline Implementation

## Overview

Added support for displaying **Hijri dates** alongside Gregorian dates in the Timeline section on monument detail pages.

## What Changed

### Before: Single Column (Gregorian Only)
```
┌─────────────────────────────┐
│ ⏰ Timeline                 │
├─────────────────────────────┤
│ ● Start Period              │
│   3100 BC                   │
│                             │
│ ● End Period                │
│   2890 BC                   │
└─────────────────────────────┘
```

### After: Two Columns (Gregorian + Hijri)
```
┌─────────────────────────────────────────┐
│ ⏰ Timeline                              │
├─────────────────────────────────────────┤
│ ● Start Period                          │
│   ┌─────────────┬─────────────┐        │
│   │ Gregorian   │ Hijri       │        │
│   │ 3100 BC     │ -           │        │
│   └─────────────┴─────────────┘        │
│                                         │
│ ● End Period                            │
│   ┌─────────────┬─────────────┐        │
│   │ Gregorian   │ Hijri       │        │
│   │ 2890 BC     │ -           │        │
│   └─────────────┴─────────────┘        │
└─────────────────────────────────────────┘
```

## Features

### ✅ Dual Calendar System
- **Gregorian**: Always shown (AD/BC format)
- **Hijri**: Shows when available, hidden when not applicable

### ✅ Smart Display Logic
- Shows Hijri column only if date exists and is not "-"
- Ancient monuments (pre-Islamic) show Gregorian only
- Islamic monuments show both calendars

### ✅ Bilingual Labels
- **English**: "Gregorian" / "Hijri"
- **Arabic**: "ميلادي" / "هجري"

### ✅ Responsive Layout
- Two-column grid on desktop
- Stacks gracefully on mobile
- Clean, organized presentation

## Data Structure

### Monument Date Fields
```typescript
interface Monument {
  startDate?: string;         // e.g., "-3100" (BC) or "622" (AD)
  endDate?: string;           // e.g., "-2890" (BC) or "750" (AD)
  startDateHijri?: string;    // e.g., "1" (AH) or "-" (not applicable)
  endDateHijri?: string;      // e.g., "132" (AH) or "-" (not applicable)
}
```

### Example Data

**Ancient Monument (Memphis)**:
```json
{
  "startDate": "-3100",
  "endDate": "-2890",
  "startDateHijri": "-",
  "endDateHijri": "-"
}
```
**Display**: Shows Gregorian only (Hijri hidden)

**Islamic Monument (Sultan Hassan Mosque)**:
```json
{
  "startDate": "1356",
  "endDate": "1363",
  "startDateHijri": "757",
  "endDateHijri": "764"
}
```
**Display**: Shows both Gregorian and Hijri

## Visual Design

### Layout Structure
```
┌──────────────────────────────────────┐
│ 📍 Timeline Marker                   │
│ ├─ Label (Start/End Period)         │
│ └─ Grid Container                    │
│     ├─ Column 1: Gregorian          │
│     │   ├─ Label (small, muted)     │
│     │   └─ Date (medium, primary)   │
│     └─ Column 2: Hijri              │
│         ├─ Label (small, muted)     │
│         └─ Date (medium, primary)   │
└──────────────────────────────────────┘
```

### Typography
- **Period Label**: Theme primary, small (sm)
- **Calendar Label**: Theme muted, extra small (xs)
- **Date Value**: Theme text, medium weight

### Spacing
- **Grid Gap**: 1rem (4 spacing units)
- **Vertical Space**: 0.5rem between label and value
- **Timeline Space**: 1.5rem between periods

## Code Implementation

### Smart Hijri Display
```tsx
{monument.startDateHijri && monument.startDateHijri !== '-' && (
  <div>
    <div className="text-theme-muted text-xs mb-1">
      {locale === 'ar' ? 'هجري' : 'Hijri'}
    </div>
    <div className="text-theme-text font-medium">
      {monument.startDateHijri}
    </div>
  </div>
)}
```

**Logic**:
1. Check if `startDateHijri` exists
2. Check if it's not "-" (placeholder for non-Islamic dates)
3. If both true, display Hijri column
4. If false, show Gregorian only (full width)

### Responsive Grid
```tsx
<div className="grid grid-cols-2 gap-4">
  {/* Gregorian column always shows */}
  <div>...</div>

  {/* Hijri column conditionally shows */}
  {monument.startDateHijri && monument.startDateHijri !== '-' && (
    <div>...</div>
  )}
</div>
```

## Use Cases

### Case 1: Ancient Egyptian Monument
**Example**: Pyramids of Giza (2580-2560 BC)
```
Start Period
├─ Gregorian: 2580 BC
└─ Hijri: (not shown)

End Period
├─ Gregorian: 2560 BC
└─ Hijri: (not shown)
```

### Case 2: Roman/Byzantine Monument
**Example**: Roman Amphitheatre (150-200 AD)
```
Start Period
├─ Gregorian: 150 AD
└─ Hijri: (not shown)

End Period
├─ Gregorian: 200 AD
└─ Hijri: (not shown)
```

### Case 3: Islamic Monument
**Example**: Al-Azhar Mosque (970-972 AD / 359-361 AH)
```
Start Period
├─ Gregorian: 970 AD
└─ Hijri: 359 AH

End Period
├─ Gregorian: 972 AD
└─ Hijri: 361 AH
```

### Case 4: Modern Monument with Hijri Date
**Example**: King Saud Mosque (1987 AD / 1407 AH)
```
Start Period
├─ Gregorian: 1987 AD
└─ Hijri: 1407 AH
```

## Mobile Responsive Behavior

### Desktop (≥768px)
```
┌─────────────┬─────────────┐
│ Gregorian   │ Hijri       │
│ 1356 AD     │ 757 AH      │
└─────────────┴─────────────┘
```
**Layout**: Side-by-side columns

### Mobile (<768px)
```
┌─────────────────────────┐
│ Gregorian               │
│ 1356 AD                 │
├─────────────────────────┤
│ Hijri                   │
│ 757 AH                  │
└─────────────────────────┘
```
**Layout**: Stacked vertically (grid automatically collapses)

## Testing

### Test with Ancient Monument
```bash
# Memphis (ancient Egypt, no Hijri)
http://localhost:3002/en/sites/17

Expected:
- Timeline shows
- Only Gregorian dates visible
- No Hijri column
```

### Test with Islamic Monument
```bash
# Find Islamic monument with Hijri dates
curl -s "http://localhost:3000/api/v1/portal/monuments" | \
  jq '.data.monuments[] | select(.startDateHijri != null and .startDateHijri != "-") | {id, name: .monumentNameEn, hijri: .startDateHijri}'

# Then visit monument page
http://localhost:3002/en/sites/{id}

Expected:
- Timeline shows
- Both Gregorian and Hijri dates visible
- Two-column layout
- Proper labels in both languages
```

## Translation Keys

Make sure these exist in translation files:

```json
{
  "labels": {
    "startPeriod": "Start Period",
    "endPeriod": "End Period"
  }
}
```

**Calendar labels are hardcoded** (not using translation keys):
- English: "Gregorian" / "Hijri"
- Arabic: "ميلادي" / "هجري"

## Benefits

✅ **Cultural Accuracy**: Shows both calendar systems for Islamic heritage
✅ **Smart Display**: Only shows Hijri when applicable
✅ **Bilingual**: Proper labels in English and Arabic
✅ **Clean UI**: Well-organized, easy to read
✅ **Responsive**: Works on all screen sizes
✅ **Backward Compatible**: Works with existing data

## Technical Details

### Grid System
- Uses Tailwind `grid-cols-2` for two columns
- Gap of 1rem between columns
- Auto-responsive (collapses on mobile)

### Conditional Rendering
```tsx
{monument.startDateHijri && monument.startDateHijri !== '-' && (
  // Hijri column
)}
```
**Conditions**:
1. Field exists (not null/undefined)
2. Not placeholder "-" value
3. Both must be true to display

### Font Weights
- **Labels**: Regular (default)
- **Dates**: Medium (`font-medium`)
- Creates clear hierarchy

## Example Monument Data

### To test Hijri dates, add a monument with:
```sql
INSERT INTO monuments (
  monument_name_en,
  monument_name_ar,
  start_date,
  end_date,
  start_date_hijri,
  end_date_hijri
) VALUES (
  'Sultan Hassan Mosque',
  'مسجد السلطان حسن',
  '1356',
  '1363',
  '757',
  '764'
);
```

## Summary

✅ **Timeline now supports dual calendar system**
✅ **Gregorian dates always shown**
✅ **Hijri dates shown when available**
✅ **Smart conditional display**
✅ **Bilingual labels**
✅ **Responsive layout**
✅ **Clean, organized design**

**Perfect for displaying both Islamic and pre-Islamic monuments!** 📅🕌✨
