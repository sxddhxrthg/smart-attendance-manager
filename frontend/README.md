# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
# Zenith Grade ⚡️

Zenith Grade is an **Academic Operating System** designed for SRM students. What started as a simple attendance tracker is evolving into a cinematic, premium platform that unifies all academic needs into a single, cohesive experience.

## The Vision

Inspired by the design philosophies of Apple, Linear, Vercel, Arc Browser, and Raycast, Zenith Grade provides a fast, keyboard-first, and beautifully animated interface.

### Planned Modules (Phase 1-3)
- [x] **Dashboard:** Your academic command center.
- [x] **Schedule:** Manage your classes and timetable.
- [x] **Attendance:** Track, manage, and optimize your attendance.
- [ ] **Marks:** Track your internal and external assessments.
- [ ] **CGPA Planner:** Simulate and plan your grade point average.
- [ ] **Analytics:** Insights and trends across your academic data.
- [ ] **Calendar:** Academic calendar, exam dates, and holidays.
- [ ] **Faculty Finder:** Locate faculty cabins and view schedules.
- [ ] **Notes:** Organize your study materials.
- [ ] **AI Assistant:** Your personal academic copilot.
- [ ] **Placement Tracker:** Monitor applications and interviews.
- [ ] **Study Planner:** Schedule tasks and prepare for exams.

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (Theme-driven Architecture)
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Routing:** React Router v7
- **Icons:** Lucide React

## Development Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Run type checking
pnpm run check

# Build for production
pnpm run build
```

## Architecture

The project follows a modular, scalable structure:
- `src/layouts/`: The App Shell, Sidebar, and core layout components.
- `src/pages/`: Lazy-loaded feature modules.
- `src/components/ui/`: Reusable, robust primitives (Buttons, Cards, Modals).
- `src/store/`: Zustand stores for global state (Theme, Sidebar, Command Palette).
- `src/constants/`: Centralized configurations (Navigation, Themes).
- `src/hooks/`: Custom React hooks.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
