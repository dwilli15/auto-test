# Quick Reference Guide

## 🚀 Quick Start Commands

### First Time Setup
```bash
# Clone repository
git clone https://github.com/dwilli15/auto-test.git
cd auto-test

# Automated setup and run (recommended)
./start.sh           # Linux/macOS
start.bat            # Windows

# Or manual installation
npm run install:all
```

### Running the Application

```bash
# Desktop Application
npm run electron:dev

# Web Application (both frontend & backend)
npm run dev

# Backend only
npm run dev:backend

# Frontend only
npm run dev:frontend

# With Docker
docker-compose up
```

### Building for Production

```bash
# Build frontend
npm run build:frontend

# Package desktop app
npm run electron:build

# Test
npm test
```

## 📁 File Locations

### Frontend
- **Pages**: `frontend/src/app/*/page.tsx`
- **Components**: `frontend/src/components/`
- **Stores**: `frontend/src/stores/`
- **API Client**: `frontend/src/lib/api.ts`
- **Types**: `frontend/src/types/index.ts`

### Backend
- **Main App**: `backend/main.py`
- **Routes**: `backend/app/routes/`
- **Services**: `backend/app/services/`
- **Models**: `backend/app/models/`
- **Tests**: `backend/test_basic.py`

### Configuration
- **Frontend Config**: `frontend/package.json`, `frontend/next.config.js`
- **Backend Config**: `backend/requirements.txt`
- **Docker**: `docker-compose.yml`
- **Electron**: `frontend/electron/main.js`

## 🔧 Common Tasks

### Add a New LLM Provider

1. Update `backend/app/services/llm_service.py`
2. Add provider type to `frontend/src/types/index.ts`
3. Update Settings UI in `frontend/src/app/settings/page.tsx`
4. Document in `docs/LLM-PROVIDERS.md`

### Create a New Page

1. Create `frontend/src/app/[page-name]/page.tsx`
2. Add route to navigation
3. Create necessary components
4. Update store if needed

### Add API Endpoint

1. Update route in `backend/app/routes/`
2. Add to `backend/main.py` router
3. Update API client in `frontend/src/lib/api.ts`
4. Add TypeScript types if needed

### Add a New Agent Type

1. Extend Agent model in `backend/app/models/`
2. Update agent form in `frontend/src/app/agents/page.tsx`
3. Update workflow builder
4. Document usage

## 🌐 URLs & Ports

- **Frontend (Web)**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Ollama**: http://localhost:11434

## 📚 Documentation Index

### User Guides
- [README.md](README.md) - Main documentation
- [Installation](docs/INSTALLATION.md) - Setup guide
- [FAQ](docs/FAQ.md) - Common questions
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Problem solving

### LLM Configuration
- [LLM Providers](docs/LLM-PROVIDERS.md) - Provider setup
- [Settings Page](frontend/src/app/settings/page.tsx) - UI config

### Development
- [Architecture](docs/ARCHITECTURE.md) - System design
- [Contributing](CONTRIBUTING.md) - How to contribute
- [Changelog](CHANGELOG.md) - Version history

### Examples
- [Examples README](examples/README.md)
- [Research Workflow](examples/research-and-summarize.json)

## 🎯 Key Features by Page

### Home (`/`)
- Feature showcase
- Quick navigation
- Getting started

### Agents (`/agents`)
- Create/edit/delete agents
- Configure LLM settings
- Manage roles

### Workflows (`/workflows`)
- Visual workflow builder
- Drag-and-drop agents
- Execute workflows

### Monitor (`/monitor`)
- Real-time logs
- Execution metrics
- Active workflows

### Settings (`/settings`)
- LLM provider config
- Connection testing
- System settings

### Onboarding (`/onboarding`)
- Step-by-step tutorial
- Interactive guide
- Best practices

## 🔑 Environment Variables

### Backend (.env in backend/)
```env
API_HOST=0.0.0.0
API_PORT=8000
OLLAMA_BASE_URL=http://localhost:11434
OPENAI_API_KEY=your-key-here
ANTHROPIC_API_KEY=your-key-here
```

### Frontend (.env.local in frontend/)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🐛 Debugging

### Check Backend Status
```bash
curl http://localhost:8000/health
```

### View API Documentation
Open http://localhost:8000/docs

### Check Ollama
```bash
curl http://localhost:11434/api/tags
ollama list
```

### View Logs
- **Browser Console**: F12 → Console
- **Backend**: Terminal output
- **Monitor Page**: In-app logs

### Common Issues
See [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## 📦 Dependencies

### Frontend Main
- react, react-dom
- next
- typescript
- electron
- reactflow
- zustand
- axios
- tailwindcss

### Backend Main
- fastapi
- uvicorn
- pydantic
- httpx
- ollama
- openai
- anthropic

## 🔄 Development Workflow

1. Make changes to code
2. Test locally: `npm run dev`
3. Run tests: `npm test`
4. Lint: `npm run lint`
5. Build: `npm run build`
6. Commit changes
7. Push to repository

## 🎨 Code Style

### TypeScript/React
- Functional components
- TypeScript for all files
- Tailwind for styling
- Props interfaces

### Python
- Type hints
- Docstrings
- Async/await
- PEP 8 style

## 🚢 Deployment

### Desktop App
```bash
npm run package
# Creates installers in frontend/dist/
```

### Docker
```bash
docker-compose up -d
```

### Web
1. Build frontend: `npm run build:frontend`
2. Deploy backend: Python hosting (Heroku, AWS, etc.)
3. Deploy frontend: Static hosting (Vercel, Netlify, etc.)

## 💡 Tips

- Start with the tutorial (`/onboarding`)
- Use Ollama for free local testing
- Check Monitor page for execution details
- Save work frequently (no auto-save yet)
- Read the FAQ for common questions
- Use Settings to test LLM connections

## 🔗 Useful Links

- [Ollama Models](https://ollama.ai/library)
- [OpenAI Platform](https://platform.openai.com/)
- [Anthropic Console](https://console.anthropic.com/)
- [React Flow Docs](https://reactflow.dev/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Next.js Docs](https://nextjs.org/docs)

## 📞 Getting Help

1. Check [FAQ](docs/FAQ.md)
2. Review [Troubleshooting](docs/TROUBLESHOOTING.md)
3. Search [GitHub Issues](https://github.com/dwilli15/auto-test/issues)
4. Create new issue with details

---

For complete documentation, see [README.md](README.md) and the [docs/](docs/) folder.
