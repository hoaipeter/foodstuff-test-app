# 🛒 Retail Calculator - Foodstuffs Technical Exercise

## Overview

A modern, fully-tested retail calculator built with React, TypeScript, and Formik. This application calculates order totals with progressive discounts and regional tax rates, demonstrating professional software development practices including test-driven development, comprehensive testing, and automated quality checks.

---

## 🚀 Features

### Core Functionality

- **Order Calculation:**
  - Number of items (positive integers)
  - Price per item (decimal values supported)
  - Region selection (5 New Zealand regions)
- **Progressive Discounts:**
  - 3% discount on orders ≥ $1,000
  - 5% discount on orders ≥ $5,000
  - 7% discount on orders ≥ $7,000
  - 10% discount on orders ≥ $10,000
  - 15% discount on orders ≥ $50,000
- **Regional Tax Rates:**
  - AUK (Auckland): 6.85%
  - WLG (Wellington): 8.00%
  - WAI (Waikato): 6.25%
  - CHC (Christchurch): 4.00%
  - TAS (Tasman): 8.25%

### User Experience

- ✨ **Form Validation:** Real-time validation with helpful error messages
- 🎨 **Modern UI:** Gradient design with smooth animations
- 📱 **Responsive:** Works on desktop, tablet, and mobile
- 💾 **Reset Function:** Clear form and results with one click
- 📊 **Reference Tables:** View discount tiers and tax rates

---

## 🧩 Tech Stack

### Frontend

- **React 19.2.0** - Modern UI library with latest features
- **TypeScript 5.9.3** - Type-safe development
- **Formik 2.4.6** - Form state management and validation
- **Vite 7.1.14** - Lightning-fast build tool
- **SCSS/Sass 1.93.2** - Advanced styling with variables and nesting

### Testing

- **Jest 30.2.0** - Test framework
- **React Testing Library 16.3.0** - Component testing
- **@testing-library/user-event 14.6.1** - User interaction simulation
- **60 comprehensive tests** with 97%+ coverage

### Code Quality

- **ESLint 9.38.0** - Code linting with TypeScript support
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks for quality gates
- **lint-staged 16.2.6** - Run checks on staged files only

### Architecture

- **Custom Hooks** - Reusable business logic
- **Pure Utility Functions** - Testable calculation logic
- **TypeScript Path Aliases** - Clean imports with `#/` prefix

---

## ⚙️ Setup & Run

### Prerequisites

- **Node.js:** >= 22.12.0
- **Yarn:** Latest version

### 1. Clone the repository

```bash
git clone https://github.com/hoaipeter/foodstuff-test-app.git
cd foodstuff-test-app-1
```

### 2. Install dependencies

```bash
yarn install
# or simply
yarn
```

### 3. Run the development server

```bash
yarn dev
```

Visit `http://localhost:5173` in your browser.

### 4. Build for production

```bash
yarn build
```

Build output will be in the `dist/` directory.

### 5. Preview production build

```bash
yarn preview
```

---

## 🐳 Docker Deployment

The application includes Docker support for both development and production environments.

### Docker Prerequisites

- **Docker:** Latest version
- **Docker Compose:** Latest version

### Quick Start

```bash
# Development mode (with hot reload)
yarn docker:dev

# Production mode
yarn docker:prod

# Stop services
docker-compose down
```

### Development Mode

Run the app in development mode with hot reload on port 5173:

```bash
yarn docker:dev
```

Visit `http://localhost:5173` in your browser.

**Features:**

- 🔥 Hot module replacement
- 📁 Volume mounting (changes reflect immediately)
- 🛠️ Full development tooling

### Production Mode

Run the app in production mode on port 3000:

```bash
yarn docker:prod
```

Visit `http://localhost:3000` in your browser.

**Features:**

- 🚀 Optimized Nginx configuration
- 📦 Gzip compression
- 🔒 Security headers
- ⚡ Asset caching (1 year for JS/CSS)
- 💚 Health checks every 30 seconds

### Docker Architecture

**Multi-stage Build:**

- **Builder Stage:** Node.js 22.12.0 Alpine - Installs dependencies and builds the app
- **Production Stage:** Nginx Alpine - Serves static files with optimized configuration

**Production Features:**

- ✅ Gzip compression for faster loading
- ✅ Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- ✅ SPA routing support (all routes serve index.html)
- ✅ Static asset caching (1 year for JS/CSS, no-cache for HTML)
- ✅ Health checks every 30 seconds
- ✅ Automatic container restart on failure

**Build Features:**

- Small image size (~50MB for production)
- Multi-stage build with Node.js 22.12.0 Alpine
- Nginx Alpine for serving static files
- No-cache builds for consistency
- Frozen lockfile for reproducible builds

---

## 🧪 Testing

This project has **comprehensive test coverage** with 60 tests across 4 test suites.

### Run Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage report
yarn test:coverage
```

### Current Test Coverage

- **Statements:** 97.4% ✅
- **Branches:** 90% ✅
- **Functions:** 100% ✅
- **Lines:** 97.29% ✅

All metrics exceed the 90% threshold!

### Test Structure

```
src/__tests__/
├── App.test.tsx                    # Component UI tests (14 tests)
├── calculator.test.ts              # Utility function tests (23 tests)
├── calculator.integration.test.tsx # End-to-end flows (14 tests)
└── useCalculator.test.tsx          # Hook logic tests (9 tests)
```

### Test Categories

1. **Unit Tests:**
   - Pure utility functions (calculator logic)
   - Custom React hooks
   - Type definitions

2. **Component Tests:**
   - Form validation
   - User interactions
   - Conditional rendering
   - Error handling

3. **Integration Tests:**
   - Complete calculation flows
   - All discount tiers
   - All tax rates
   - Edge cases and boundaries
   - Multi-step user workflows

---

## 🎨 Code Quality

### Linting

```bash
# Check for linting errors
yarn lint

# Auto-fix linting errors
yarn lint:fix
```

### Formatting

```bash
# Format all files (supports: ts, tsx, js, jsx, json, css, scss, md)
yarn format

# Check if files are formatted
yarn format:check
```

### Styling

This project uses **SCSS** (Sass) for styling:

- **Variables:** Color palette and reusable values
- **Nesting:** Organized hierarchical styles
- **Parent Selectors (&):** Clean pseudo-classes and modifiers
- **Better Maintainability:** Easier to update themes

SCSS files are automatically compiled by Vite during development and build.

---

## 📁 Project Structure

```
foodstuff-test-app-1/
├── .github/
│   └── workflows/           # GitHub Actions (CI/CD automation)
├── .husky/                  # Git hooks configuration
├── src/
│   ├── __mocks__/          # Mock files for testing
│   ├── __tests__/          # Test files
│   │   ├── App.test.tsx
│   │   ├── calculator.test.ts
│   │   ├── calculator.integration.test.tsx
│   │   └── useCalculator.test.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── index.ts
│   │   └── useCalculator.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── calculator.types.ts
│   │   └── index.ts
│   ├── utils/
│   │   └── calculator.ts   # Calculation utility functions
│   ├── App.scss            # Main styles (SCSS)
│   ├── App.tsx             # Main component
│   ├── main.tsx            # Application entry point
│   ├── setupTests.ts       # Jest configuration
│   └── vite-env.d.ts       # Vite type definitions
├── .dockerignore           # Docker build context exclusions
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Multi-stage Docker build
├── nginx.conf              # Nginx web server configuration
├── eslint.config.js        # ESLint configuration
├── jest.config.ts          # Jest configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md
```

---

---

## 🏗️ Development Workflow

### State Management

The application uses **local React state** with custom hooks for simplicity:

- **No Redux** - Unnecessary complexity for this use case
- **Formik** - Handles form state and validation
- **useState** - Manages calculation results in `useCalculator` hook
- **Pure Functions** - Business logic separated in `utils/calculator.ts`

### Architecture Decisions

1. **Custom Hook (`useCalculator`):**
   - Encapsulates calculation logic
   - Manages result and error state
   - Provides `calculate` and `reset` functions
   - 100% test coverage

2. **Pure Utility Functions:**
   - `calculateOrder()` - Main calculation logic
   - `getDiscountPercentage()` - Discount tier lookup
   - `getTaxRate()` - Regional tax lookup
   - Easy to test, no side effects

3. **Form Management:**
   - Formik handles validation and submission
   - Custom validation functions
   - Error messages for invalid inputs
   - Clean separation of concerns

---

## 🪝 Git Hooks (Husky)

This project uses **Husky** to enforce code quality standards through Git hooks:

### Pre-commit Hook

Runs automatically before each commit:

- ✅ Lints and auto-fixes staged files (via `lint-staged`)
- ✅ Formats staged files with Prettier
- ✅ Only checks changed files (fast!)

### Configuration

```json
// lint-staged configuration in package.json
{
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,scss,md}": ["prettier --write"]
}
```

### Pre-push Hook

Runs before pushing to remote:

- ✅ Runs all tests
- ✅ Verifies production build succeeds
- ⏱️ Takes longer but ensures quality

### Bypassing Hooks

In rare cases, you can skip hooks using:

```bash
git commit --no-verify
git push --no-verify
```

⚠️ **Use sparingly and only when absolutely necessary!**

---

## 📦 Versioning & Release Management

This project follows **Semantic Versioning** (semver) with **automated version bumping** after PR merges.

### Version Format: `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes (e.g., `1.0.0` → `2.0.0`)
- **MINOR**: New features, backward compatible (e.g., `1.0.0` → `1.1.0`)
- **PATCH**: Bug fixes, backward compatible (e.g., `1.0.0` → `1.0.1`)

### 🚀 Quick Start - Auto Version Bump

1. Create feature branch from `main`
2. Make your changes and commit with conventional format
3. Create PR with appropriate title
4. Merge PR → Version auto-bumps automatically! 🎉

### PR Title Format & Version Bumps

| PR Title Pattern                       | Version Bump | Example           |
| -------------------------------------- | ------------ | ----------------- |
| `feat:` or `feature:`                  | **MINOR**    | `1.0.0` → `1.1.0` |
| `fix:` or `bugfix:`                    | **PATCH**    | `1.0.0` → `1.0.1` |
| `feat!:` or contains `BREAKING CHANGE` | **MAJOR**    | `1.0.0` → `2.0.0` |
| Other (docs, chore, style, etc.)       | **PATCH**    | `1.0.0` → `1.0.1` |

### 📝 Examples

```bash
# Feature - Minor Bump
PR Title: feat: add calculator history feature
Result: 1.2.3 → 1.3.0

# Bug Fix - Patch Bump
PR Title: fix: correct tax calculation
Result: 1.2.3 → 1.2.4

# Breaking Change - Major Bump
PR Title: feat!: redesign calculator API (BREAKING CHANGE)
Result: 1.2.3 → 2.0.0
```

### ✅ What Happens After Merging PR

1. 🤖 **GitHub Action detects** merged PR to `main`
2. � **Installs dependencies** and runs tests
3. 🏗️ **Builds production bundle** using Vite
4. �🔍 **Analyzes PR title** and commit messages
5. 📝 **Bumps version** in `package.json`
6. 🏷️ **Creates git tag** (e.g., `v1.2.3`)
7. 📦 **Archives build artifacts** (ZIP and TAR.GZ)
8. 🚀 **Creates GitHub Release** with:
   - Release notes from PR body
   - Downloadable build artifacts (ZIP & TAR.GZ)
   - Installation instructions
   - Full changelog
9. ✨ **Commits version changes** back to `main` with `[skip ci]`

### 📦 Build Artifacts

Each release includes ready-to-deploy build artifacts:

- **foodstuff-calculator-v{version}.zip** - Production build (ZIP format)
- **foodstuff-calculator-v{version}.tar.gz** - Production build (TAR.GZ format)

**To deploy:**

1. Download the build artifact from the GitHub Release
2. Extract the archive
3. Upload the contents to web server or CDN
4. The app is ready to serve! 🎉

### 🔧 Manual Version Bumping

If you need to manually bump the version locally:

```bash
# Patch: 1.0.0 → 1.0.1 (bug fixes)
yarn version:patch

# Minor: 1.0.0 → 1.1.0 (new features)
yarn version:minor

# Major: 1.0.0 → 2.0.0 (breaking changes)
yarn version:major

# Push changes
git push && git push --tags
```

---

## 🎯 Key Learnings & Best Practices

### Testing Strategy

1. **Write Tests First (TDD):**
   - Define expected behavior
   - Write failing tests
   - Implement functionality
   - Refactor with confidence

2. **Test Pyramid:**
   - **23 Unit Tests** - Pure functions (fast, isolated)
   - **23 Component Tests** - UI behavior (medium speed)
   - **14 Integration Tests** - End-to-end flows (comprehensive)

3. **Coverage is Quality:**
   - 97%+ coverage ensures reliability
   - Tests document expected behavior
   - Prevents regressions
   - Enables confident refactoring

### Code Quality

1. **TypeScript First:**
   - Catch errors at compile time
   - Better IDE support
   - Self-documenting code
   - Refactoring safety

2. **Separation of Concerns:**
   - UI components (React)
   - Business logic (pure functions)
   - State management (hooks)
   - Styling (SCSS)

3. **Consistent Style:**
   - ESLint for code quality
   - Prettier for formatting
   - Git hooks enforce standards
   - Team consistency

### Performance

- **Vite** - Fast HMR during development
- **Code Splitting** - Optimized production builds
- **Pure Functions** - Memoization-friendly
- **No Unnecessary Re-renders** - Proper state management

---

## 🐛 Troubleshooting

### Build Issues

**SCSS not compiling?**

```bash
# Ensure sass is installed
yarn add -D sass
```

**TypeScript errors?**

```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
yarn install
```

### Test Issues

**Tests failing after changes?**

```bash
# Clear Jest cache
yarn test --clearCache
yarn test
```

**Coverage not updating?**

```bash
# Remove old coverage
rm -rf coverage
yarn test:coverage
```

### Git Hook Issues

**Pre-commit hook failing?**

```bash
# Run linting manually
yarn lint:fix
yarn format

# Reinstall hooks
yarn prepare
```

### Docker Issues

**Docker build failing?**

```bash
# Check Docker daemon is running
docker info

# Clear Docker cache and rebuild
docker system prune -a
yarn docker:build
```

**Container won't start?**

```bash
# Check if port is already in use
lsof -i :3000  # Production
lsof -i :5173  # Development

# View container logs
docker logs foodstuff-app
docker-compose logs foodstuff-calculator
```

**Changes not reflecting in development container?**

```bash
# Ensure you're using the dev service with volume mounting
yarn docker:dev

# Rebuild if needed
docker-compose up --build foodstuff-calculator-dev
```

**Image size too large?**

```bash
# Check image size
docker images foodstuff-calculator

# Ensure .dockerignore is properly configured
cat .dockerignore

# Production image should be ~50MB (nginx:alpine + built assets)
```

---

### Project-Specific

- **Path Aliases:** Use `#/` prefix (e.g., `import { useCalculator } from '#/hooks'`)
- **Test Files:** Place in `src/__tests__/` directory
- **Type Definitions:** Place in `src/types/` directory
- **Utility Functions:** Place in `src/utils/` directory

---

## 🤝 Contributing

### Workflow

1. **Create a feature branch:**

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes:**
   - Write tests first
   - Implement functionality
   - Ensure tests pass
   - Update documentation

3. **Commit with conventional format:**

   ```bash
   git commit -m "feat: add new feature"
   ```

4. **Push and create PR:**

   ```bash
   git push origin feat/your-feature-name
   ```

5. **PR Requirements:**
   - All tests passing ✅
   - Coverage maintained at 90%+ ✅
   - Linting passing ✅
   - Build succeeds ✅

### Commit Message Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructure
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**

```bash
feat(calculator): add decimal support
fix(validation): handle negative numbers
docs: update API documentation
test(hooks): add useCalculator tests
```

---

## 📄 License

This project is part of the Foodstuffs Software Engineer Technical Exercise.

---

## 👤 Author

**Duke Ho**

- GitHub: [@hoaipeter](https://github.com/hoaipeter)
- Repository: [foodstuff-test-app](https://github.com/hoaipeter/foodstuff-test-app)

---

## 🙏 Acknowledgments

- Foodstuffs New Zealand for the technical exercise
- React team for the excellent framework
- Testing Library for intuitive testing utilities
- Open source community for amazing tools

---

### � GitHub Workflows

Two workflow options are available in `.github/workflows/`:

**`version-bump.yml`**

- Smart detection of version bump type
- Analyzes PR title, body, and commits
- Creates GitHub releases automatically
- Full control over versioning logic

**Choose one workflow and delete the other!**

### 🎯 Best Practices

1. ✅ Always use conventional commit format
2. ✅ Write clear, descriptive PR titles
3. ✅ Test thoroughly before merging
4. ✅ Don't manually edit version in PRs (let automation handle it)
5. ✅ Review the generated release notes after merge
6. ✅ Update documentation for breaking changes

### 🔐 Permissions

The workflow is configured with necessary permissions:

```yaml
permissions:
  contents: write
```

This allows the GitHub Action to:

- Commit version changes back to `main`
- Create git tags
- Create GitHub releases

---
