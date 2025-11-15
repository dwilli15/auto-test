# Agent Orchestrator

A no-code local OS agent orchestration GUI that enables users to create, manage, and coordinate autonomous agent teams. Build powerful AI workflows without writing code.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

- **🎨 No-Code Visual Workflow Builder**: Drag-and-drop interface for designing agent workflows
- **🤖 Multi-Agent Orchestration**: Create and manage teams of autonomous AI agents with specific roles
- **🔌 Flexible LLM Support**: Connect to local models (Ollama, LM Studio) or cloud APIs (OpenAI, Anthropic)
- **🔒 Offline-First**: Run entirely locally with Ollama and other local LLMs
- **📊 Real-Time Monitoring**: Transparent logs and execution dashboards
- **🛡️ Sandboxed Execution**: Safe, isolated agent execution environments
- **👥 Beginner-Friendly**: Interactive tutorials and guided onboarding
- **⚡ Modular Architecture**: Extensible connector system for new LLM providers

## 🏗️ Architecture

The project consists of three main components:

1. **Frontend**: Electron + Next.js + React + TypeScript desktop application
2. **Backend**: Python FastAPI server for agent orchestration
3. **LLM Connectors**: Modular system supporting Ollama, OpenAI, Anthropic, and custom providers

```
agent-orchestrator/
├── frontend/           # Electron + Next.js GUI
│   ├── src/
│   │   ├── app/       # Next.js pages
│   │   ├── components/# React components
│   │   ├── stores/    # Zustand state management
│   │   ├── lib/       # Utilities and API client
│   │   └── types/     # TypeScript definitions
│   └── electron/      # Electron main process
├── backend/           # FastAPI server
│   ├── app/
│   │   ├── models/    # Pydantic models
│   │   ├── routes/    # API endpoints
│   │   └── services/  # Business logic
│   └── main.py        # FastAPI app
├── docs/              # Documentation
└── examples/          # Example workflows
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **Ollama** (optional, for local LLMs) - [Download here](https://ollama.ai)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dwilli15/auto-test.git
   cd auto-test
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..

   # Install backend dependencies
   cd backend
   python -m pip install -r requirements.txt
   cd ..
   ```

3. **(Optional) Install Ollama for local LLMs**
   ```bash
   # Download from https://ollama.ai or use:
   # macOS/Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Pull a model
   ollama pull llama2
   ```

### Running the Application

**Option 1: Run as Desktop App (Recommended)**
```bash
npm run electron:dev
```

**Option 2: Run Web Version**
```bash
# Terminal 1: Start backend
npm run dev:backend

# Terminal 2: Start frontend
npm run dev:frontend
```

Then open http://localhost:3000 in your browser.

## 📖 Usage Guide

### 1. Configure LLM Providers

Navigate to **Settings** to configure your LLM providers:

- **Ollama (Local)**: Default at `http://localhost:11434`
- **OpenAI**: Enter your API key
- **Anthropic**: Enter your API key

### 2. Create Your First Agent

1. Go to the **Agents** page
2. Click **Create Agent**
3. Fill in:
   - Name: e.g., "Research Assistant"
   - Role: e.g., "Researcher"
   - Description: What the agent does
   - LLM Provider: Choose Ollama, OpenAI, or Anthropic
   - Model: e.g., "llama2" or "gpt-4"
   - System Prompt: Instructions for the agent
4. Click **Create Agent**

### 3. Design a Workflow

1. Go to the **Workflows** page
2. Drag agents from the sidebar onto the canvas
3. Connect agents with edges to define data flow
4. Save and run your workflow

### 4. Monitor Execution

Visit the **Monitor** page to see:
- Real-time execution logs
- Active workflows
- Token usage statistics
- Agent status

## 🎓 Tutorial

For first-time users, click the **Tutorial** button on the home page for an interactive walkthrough of all features.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Backend settings
API_HOST=0.0.0.0
API_PORT=8000

# Ollama settings (optional)
OLLAMA_BASE_URL=http://localhost:11434

# OpenAI settings (optional)
OPENAI_API_KEY=your-key-here

# Anthropic settings (optional)
ANTHROPIC_API_KEY=your-key-here
```

### Frontend Configuration

Create `.env.local` in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🛠️ Development

### Project Structure

- **Frontend**: React components with TypeScript, styled with Tailwind CSS
- **State Management**: Zustand for global state
- **Workflow Canvas**: React Flow for visual workflow builder
- **API Communication**: Axios with React Query
- **Desktop App**: Electron for native desktop experience

### Building for Production

```bash
# Build frontend
npm run build:frontend

# Package as desktop app
npm run electron:build
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Frontend tests only
cd frontend && npm test

# Backend tests only
cd backend && pytest
```

## 📦 Deployment

### Desktop Application

The application can be packaged as a standalone desktop app:

```bash
npm run package
```

This creates installers for:
- macOS: `.dmg` file
- Windows: `.exe` installer
- Linux: `.AppImage` file

### Web Application

Deploy the frontend and backend separately:

1. **Backend**: Deploy to any Python hosting service (Heroku, AWS, Google Cloud)
2. **Frontend**: Deploy to Vercel, Netlify, or any static hosting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with cutting-edge open source technologies:
- [Ollama](https://ollama.ai) - Local LLM runtime
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Next.js](https://nextjs.org/) - React framework
- [React Flow](https://reactflow.dev/) - Visual workflow builder
- [Electron](https://www.electronjs.org/) - Desktop app framework
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 🚧 Roadmap

- [ ] Add more LLM providers (HuggingFace, Cohere, etc.)
- [ ] Implement workflow templates
- [ ] Add agent memory and context persistence
- [ ] Enhanced monitoring with metrics visualization
- [ ] Plugin system for custom tools and integrations
- [ ] Multi-user support with authentication
- [ ] Cloud sync for workflows and agents
- [ ] Mobile app support

## 📞 Support

For issues and questions:
- GitHub Issues: [Report a bug](https://github.com/dwilli15/auto-test/issues)
- Documentation: Coming soon
- Discord: Coming soon

---

Made with ❤️ for the AI community
