# Installation Guide

Complete guide for installing and setting up Agent Orchestrator on different platforms.

## System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 11+, or Linux (Ubuntu 20.04+)
- **RAM**: 4 GB
- **Disk Space**: 2 GB
- **Node.js**: 18.0 or higher
- **Python**: 3.9 or higher

### Recommended Requirements
- **RAM**: 8 GB or more
- **Disk Space**: 5 GB or more (for local LLM models)
- **GPU**: Optional, improves local LLM performance

## Installation Steps

### 1. Install Prerequisites

#### Node.js
Download and install from [nodejs.org](https://nodejs.org/)

Verify installation:
```bash
node --version  # Should be v18.0.0 or higher
npm --version
```

#### Python
Download and install from [python.org](https://www.python.org/)

Verify installation:
```bash
python --version  # or python3 --version
pip --version     # or pip3 --version
```

### 2. Clone the Repository

```bash
git clone https://github.com/dwilli15/auto-test.git
cd auto-test
```

### 3. Install Dependencies

#### Install All Dependencies (Recommended)
```bash
npm run install:all
```

#### Or Install Manually

**Root dependencies:**
```bash
npm install
```

**Frontend dependencies:**
```bash
cd frontend
npm install
cd ..
```

**Backend dependencies:**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 4. (Optional) Install Ollama for Local LLMs

Ollama allows you to run LLMs locally without API keys.

#### macOS
```bash
brew install ollama
# or download from https://ollama.ai
```

#### Linux
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

#### Windows
Download the installer from [ollama.ai](https://ollama.ai)

#### Verify Ollama Installation
```bash
ollama --version
```

#### Pull a Model
```bash
ollama pull llama2
# or other models: mistral, codellama, etc.
```

### 5. Configure Environment Variables

#### Backend Configuration
Create `backend/.env`:
```env
API_HOST=0.0.0.0
API_PORT=8000
OLLAMA_BASE_URL=http://localhost:11434
```

#### Frontend Configuration
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Running the Application

### Option 1: Desktop Application (Recommended)

```bash
npm run electron:dev
```

This starts both the backend and frontend, then launches the Electron desktop app.

### Option 2: Web Application

Start the backend and frontend separately:

**Terminal 1 - Backend:**
```bash
npm run dev:backend
# or
cd backend && python -m uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

Then open http://localhost:3000 in your browser.

## Troubleshooting

### Common Issues

#### "Port 8000 already in use"
Kill the process using port 8000:
```bash
# Linux/macOS
lsof -ti:8000 | xargs kill -9

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

#### "Module not found" errors
Reinstall dependencies:
```bash
npm run install:all
```

#### Ollama connection failed
1. Verify Ollama is running:
   ```bash
   ollama list
   ```
2. Check the URL in Settings (default: http://localhost:11434)
3. Try restarting Ollama:
   ```bash
   # macOS/Linux
   ollama serve
   ```

#### Python dependencies installation failed
Use a virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

## Next Steps

1. Complete the [Getting Started Tutorial](../README.md#-tutorial)
2. Configure your [LLM providers](./llm-providers.md)
3. Create your [first agent](./creating-agents.md)
4. Build your [first workflow](./workflows.md)

## Updating

To update to the latest version:

```bash
git pull origin main
npm run install:all
```

## Uninstallation

To completely remove Agent Orchestrator:

```bash
# Remove the repository
cd ..
rm -rf auto-test

# (Optional) Uninstall Ollama
# macOS: brew uninstall ollama
# Linux: sudo rm /usr/local/bin/ollama
# Windows: Use Control Panel
```
