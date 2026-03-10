# Contributing to Uniphimedia

Thank you for your interest in contributing to the Uniphimedia monorepo! This document provides guidelines for contributing to the housing-designer app and shared packages.

## Project Structure

This is a pnpm monorepo with the following structure:

```
uniphimedia/
├── apps/
│   └── housing-designer/     # Main 3D housing design application
├── packages/
│   ├── shared-types/         # Common TypeScript types
│   ├── room-modules/         # Pre-built room tile registry
│   ├── systems-engine/       # Snap resolver & system merging
│   └── materials-library/    # PBR material catalog
└── .github/                  # Community health files
```

## Development Setup

### Prerequisites

- Node.js 18+ and pnpm 8+
- Git

### Getting Started

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/uniphimedia.git
   cd uniphimedia
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Build all packages:
   ```bash
   pnpm build
   ```

4. Run the housing-designer app in development mode:
   ```bash
   pnpm dev
   ```

## Making Changes

### Branch Naming

- `feat/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Adding or updating tests

### Commit Messages

We follow the Conventional Commits specification:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Scopes:**
- `housing-designer`: The main app
- `shared-types`: Type definitions package
- `room-modules`: Room module registry
- `systems-engine`: Snap & merge engine
- `materials-library`: Material catalog
- `root`: Monorepo root configuration

**Examples:**
```
feat(housing-designer): add room rotation controls
fix(systems-engine): resolve snap detection for corner cases
docs(room-modules): add JSDoc comments to module registry
```

## Code Quality

### TypeScript

- All code must be written in TypeScript with strict mode enabled
- Run type checking before committing: `pnpm typecheck`
- Prefer explicit types over `any`

### Linting

- Run ESLint: `pnpm lint`
- Auto-fix issues where possible: `pnpm lint --fix`

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Include trailing commas in multi-line objects/arrays
- Document complex logic with comments

## Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the guidelines above
3. **Test thoroughly** - ensure the app runs and builds successfully
4. **Update documentation** if you're adding/changing functionality
5. **Commit with conventional commit messages**
6. **Push to your fork** and submit a pull request
7. **Respond to feedback** from maintainers during code review

### PR Description Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes.

## Screenshots (if applicable)
Add screenshots to help reviewers understand visual changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented complex areas of my code
- [ ] My changes generate no new warnings or errors
- [ ] I have tested my changes locally
```

## Architecture Guidelines

### Housing Designer App

- **Views** should be self-contained React components in `src/views/`
- **Store logic** should live in Zustand stores in `src/store/`
- Use Babylon.js for all 3D rendering

### Shared Packages

- **shared-types**: Export TypeScript types/interfaces only
- **room-modules**: Registry of pre-built room definitions with connectors
- **systems-engine**: Pure functions for snap detection and system merging
- **materials-library**: Material catalog with PBR properties

### Adding New Room Modules

1. Define the module in `packages/room-modules/src/index.ts`
2. Include all 6 connectors (4 walls + floor + ceiling)
3. Add default system nodes for HVAC, electrical, and plumbing
4. Document dimensions and intended use case

### Adding New Materials

1. Add material definition to `packages/materials-library/src/index.ts`
2. Include category and subcategory
3. Provide PBR properties (albedo, roughness, metallic)
4. Add texture references if available

## Questions or Issues?

If you have questions or run into issues:

- Check existing [Issues](https://github.com/dutchiono/uniphimedia/issues)
- Open a new issue with a clear description
- Tag with appropriate labels (bug, question, enhancement, etc.)

## License

By contributing to Uniphimedia, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Uniphimedia! 🏠✨