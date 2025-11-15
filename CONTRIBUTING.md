# Contributing to Agent Orchestrator

Thank you for your interest in contributing to Agent Orchestrator! This document provides guidelines and information for contributors.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/dwilli15/auto-test/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (OS, Node version, Python version)
   - Screenshots if applicable

### Suggesting Features

1. Check existing issues and discussions
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Submitting Code

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the coding style (see below)
   - Add tests if applicable
   - Update documentation
4. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

## Development Setup

See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions.

Quick start:
```bash
git clone https://github.com/dwilli15/auto-test.git
cd auto-test
npm run install:all
```

## Project Structure

```
agent-orchestrator/
├── frontend/          # React/TypeScript/Electron frontend
│   ├── src/app/      # Next.js pages
│   ├── src/components/ # React components
│   ├── src/stores/   # Zustand state management
│   └── src/lib/      # Utilities
├── backend/          # Python FastAPI backend
│   ├── app/routes/   # API endpoints
│   ├── app/services/ # Business logic
│   └── app/models/   # Data models
├── docs/             # Documentation
└── examples/         # Example workflows
```

## Coding Standards

### Frontend (TypeScript/React)

- Use TypeScript for all new code
- Follow React best practices and hooks
- Use functional components
- Add proper TypeScript types
- Use Tailwind CSS for styling
- Keep components small and focused

Example:
```typescript
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className="p-4 bg-white rounded">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};
```

### Backend (Python)

- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Keep functions small and focused
- Use async/await for I/O operations

Example:
```python
async def process_data(data: dict) -> dict:
    """
    Process the input data.
    
    Args:
        data: Input data dictionary
        
    Returns:
        Processed data dictionary
    """
    # Implementation
    return processed_data
```

## Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
pytest
```

## Documentation

- Update README.md for major changes
- Add/update docstrings and comments
- Update relevant documentation files in `docs/`
- Include examples where appropriate

## Git Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add workflow templates feature
fix: resolve agent execution timeout issue
docs: update installation guide for Windows
```

## Pull Request Guidelines

- Keep PRs focused on a single feature/fix
- Include tests for new functionality
- Update documentation
- Ensure all tests pass
- Add screenshots for UI changes
- Reference related issues

## Adding New LLM Providers

To add support for a new LLM provider:

1. Update `backend/app/services/llm_service.py`
2. Add provider-specific implementation
3. Update `frontend/src/types/index.ts` with new provider type
4. Add UI options in Settings page
5. Document in `docs/LLM-PROVIDERS.md`
6. Add tests

## Adding New Features

For major features:

1. Discuss in an issue first
2. Break into smaller tasks
3. Create feature branch
4. Implement incrementally
5. Add documentation
6. Submit PR

## Questions?

- Open an issue for discussion
- Check existing documentation
- Review closed PRs for examples

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
