---
description: Convert a base HTML file into a React JSX page component for a specific feature
---

# HTML → React Conversion Workflow

## Inputs (Required)
- **Base HTML**: path to the source `.html` file (e.g. `html/index.html`)
- **Feature**: the feature folder under `src/features/` (e.g. `recycling_businesses`)
- **Page**: the output JSX filename (e.g. `dashboardRecycle.jsx`)

## Steps

### 1. Read the HTML source file
Read the full HTML file to understand its structure, sections, Tailwind classes, images, and icons.

### 2. Explore the project structure
// turbo
Run the following to understand existing components and conventions:
```
dir src\components\layout
dir src\features\<Feature>
```

### 3. Convert HTML → JSX

Create the file at `src/features/<Feature>/<Page>`:

- Replace all `class=` → `className=`
- Replace `for=` → `htmlFor=`
- Close all self-closing tags: `<img />`, `<input />`, `<br />`
- Replace inline `style=""` strings → `style={{ key: 'value' }}`
- Move `<head>` fonts/config to the project's `index.html` or `index.css` (do NOT duplicate)
- Import shared layout components:
  - `import Header from '../../components/layout/Header';`
  - `import Footer from '../../components/layout/Footer';`
- Wrap content in a functional component and export as default
- Keep all Tailwind classes intact
- Preserve Vietnamese text, icons (`material-symbols-outlined`), and image `src` URLs

### 4. Register the route in App.jsx

Add the import and route:
```jsx
import DashboardRecycle from './features/<Feature>/<Page>';
// inside <Routes>:
<Route path="/recycle/dashboard" element={<DashboardRecycle />} />
```

### 5. Verify the conversion

// turbo
```
npm run build --prefix d:\exe1\Re-Nats\my-app
```

Check there are no build errors.
