# Changelog

All notable changes to Agent Orchestrator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-15

### Added
- Initial release of Agent Orchestrator
- No-code GUI for agent orchestration
- Drag-and-drop workflow builder using React Flow
- Agent management system with role assignment
- Support for multiple LLM providers:
  - Ollama (local)
  - OpenAI (cloud)
  - Anthropic (cloud)
  - Custom OpenAI-compatible APIs
- Real-time monitoring dashboard
- Execution logging system
- Interactive onboarding tutorial
- Sandboxed execution environment (process isolation)
- Desktop application (Electron)
- Web application mode
- Comprehensive documentation
- Example workflows
- Quick start scripts for Linux/macOS and Windows

### Features
- **Frontend**
  - Modern React + TypeScript + Next.js architecture
  - Tailwind CSS for styling
  - Zustand for state management
  - React Query for data fetching
  - Electron for desktop deployment
  
- **Backend**
  - FastAPI with async support
  - Pydantic models for type safety
  - Modular LLM service architecture
  - Workflow execution engine
  - RESTful API with auto-generated docs
  
- **Developer Experience**
  - Comprehensive documentation
  - Example workflows
  - Quick start scripts
  - Docker support
  - TypeScript and Python type safety

### Documentation
- Installation guide
- LLM provider configuration guide
- Architecture overview
- Contributing guidelines
- Troubleshooting guide
- API documentation (auto-generated)

## [Unreleased]

### Planned
- Database persistence (SQLite/PostgreSQL)
- Workflow templates
- Agent memory and context
- Enhanced metrics visualization
- Plugin system for custom tools
- Multi-user support
- Cloud sync
- Mobile app
- More LLM providers (HuggingFace, Cohere, etc.)
- Parallel workflow execution
- Advanced workflow features (loops, conditions)
- Docker container sandboxing
- Agent marketplace
- Workflow marketplace

---

## Release Notes Format

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Features that will be removed in upcoming releases

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security fixes and improvements
