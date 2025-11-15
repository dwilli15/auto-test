# Architecture Overview

Agent Orchestrator is a desktop application built with a modern, modular architecture that supports both local and cloud-based AI agent orchestration.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Desktop Application                       │
│                   (Electron Container)                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Frontend (React/Next.js)                  │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │  │
│  │  │  Pages   │  │Components│  │  Stores  │            │  │
│  │  │          │  │          │  │ (Zustand)│            │  │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘            │  │
│  │       │             │             │                    │  │
│  │       └─────────────┴─────────────┘                    │  │
│  │                     │                                   │  │
│  │              ┌──────▼──────┐                           │  │
│  │              │  API Client │                           │  │
│  │              └──────┬──────┘                           │  │
│  └─────────────────────┼────────────────────────────────┘  │
└────────────────────────┼─────────────────────────────────┘
                         │ HTTP/REST
                         ▼
        ┌────────────────────────────────┐
        │    Backend (FastAPI/Python)     │
        │  ┌──────────────────────────┐  │
        │  │      API Routes          │  │
        │  │  /agents /workflows      │  │
        │  │  /teams  /logs /llm      │  │
        │  └────────┬─────────────────┘  │
        │           │                     │
        │  ┌────────▼─────────────────┐  │
        │  │    Business Services     │  │
        │  │  • Workflow Executor     │  │
        │  │  • LLM Service          │  │
        │  │  • Sandbox Executor     │  │
        │  └────────┬─────────────────┘  │
        └───────────┼──────────────────┘
                    │
        ┌───────────┴──────────────┐
        │                          │
        ▼                          ▼
┌───────────────┐        ┌─────────────────┐
│  Local LLMs   │        │   Cloud APIs    │
│  • Ollama     │        │   • OpenAI      │
│  • LM Studio  │        │   • Anthropic   │
└───────────────┘        └─────────────────┘
```

## Component Details

### Frontend Layer

#### 1. Electron Container
- Provides native desktop experience
- Handles window management
- Bridges web and native APIs
- Manages application lifecycle

**Key Files:**
- `frontend/electron/main.js` - Main process
- `frontend/electron/preload.js` - Preload scripts

#### 2. React Application (Next.js)
- Server-side rendering capable
- File-based routing
- Built-in optimization

**Pages:**
- `/` - Home dashboard
- `/agents` - Agent management
- `/workflows` - Workflow builder
- `/monitor` - Execution monitoring
- `/settings` - Configuration
- `/onboarding` - Tutorial

#### 3. State Management (Zustand)
Lightweight state management with stores:
- `agentStore` - Agent CRUD operations
- `workflowStore` - Workflow management

#### 4. Components
- **UI Components** (`components/ui.tsx`) - Reusable components
- **Page Components** - Page-specific components
- **Layout Components** - Shared layouts

#### 5. API Client
- Axios-based HTTP client
- Type-safe requests
- Error handling
- Request/response interceptors

### Backend Layer

#### 1. FastAPI Application
Modern, async Python web framework:
- Automatic API documentation (OpenAPI)
- Type validation (Pydantic)
- Async request handling
- WebSocket support

**Main Entry:** `backend/main.py`

#### 2. API Routes
RESTful endpoints organized by resource:

**Agents (`/api/agents`)**
- `GET /` - List agents
- `GET /{id}` - Get agent
- `POST /` - Create agent
- `PUT /{id}` - Update agent
- `DELETE /{id}` - Delete agent

**Workflows (`/api/workflows`)**
- `GET /` - List workflows
- `GET /{id}` - Get workflow
- `POST /` - Create workflow
- `PUT /{id}` - Update workflow
- `DELETE /{id}` - Delete workflow
- `POST /{id}/execute` - Execute workflow

**Teams (`/api/teams`)**
- CRUD operations for agent teams

**Logs (`/api/logs`)**
- `GET /` - List execution logs
- `GET /active-executions` - Active workflows

**LLM (`/api/llm`)**
- `GET /ollama/models` - List Ollama models
- `POST /test` - Test LLM connection

#### 3. Services

**Workflow Executor** (`services/workflow_executor.py`)
- Orchestrates agent execution
- Manages workflow state
- Handles errors and retries
- Collects execution logs

**LLM Service** (`services/llm_service.py`)
- Unified interface for LLM providers
- Provider-specific implementations
- Connection management
- Request/response handling

**Sandbox Executor** (`services/sandbox.py`)
- Safe code execution
- Resource limiting
- Isolation strategies:
  - Docker containers (planned)
  - Process isolation
  - Direct execution

#### 4. Models (Pydantic)
Type-safe data models:
- `Agent` - AI agent configuration
- `Workflow` - Workflow definition
- `Team` - Agent team
- `ExecutionLog` - Log entries
- `LLMConfig` - LLM configuration

### Data Flow

#### Creating an Agent
```
User → Frontend → API Client → POST /api/agents → Agent Route
  → Create Agent → Store in Memory → Return Agent → Update UI
```

#### Executing a Workflow
```
User → Frontend → API Client → POST /api/workflows/{id}/execute
  → Workflow Route → Workflow Executor → For each agent:
    → LLM Service → LLM Provider (Ollama/OpenAI/etc.)
    → Collect Response → Next Agent → Final Result
  → Update Workflow Status → Return Result → Update UI
```

#### Monitoring Execution
```
Frontend → Poll /api/logs?workflowId={id} → Get Logs
  → Display in Monitor Dashboard
```

## Technology Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **HTTP:** Axios + React Query
- **Workflow UI:** React Flow
- **Icons:** Lucide React
- **Desktop:** Electron 28

### Backend
- **Framework:** FastAPI
- **Language:** Python 3.9+
- **Validation:** Pydantic
- **Server:** Uvicorn
- **HTTP Client:** httpx
- **Testing:** pytest

### LLM Providers
- **Local:** Ollama, LM Studio
- **Cloud:** OpenAI, Anthropic
- **Custom:** Any OpenAI-compatible API

## Design Patterns

### Frontend Patterns

**1. Component Composition**
```typescript
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

**2. Custom Hooks**
```typescript
const { agents, addAgent } = useAgentStore();
```

**3. Type Safety**
```typescript
interface Agent {
  id: string;
  name: string;
  // ...
}
```

### Backend Patterns

**1. Dependency Injection**
```python
async def execute_workflow(
    workflow_id: str, 
    background_tasks: BackgroundTasks
):
    executor = get_workflow_executor()
```

**2. Async/Await**
```python
async def generate(prompt: str) -> str:
    response = await self.client.post(...)
```

**3. Factory Pattern**
```python
def create_llm_service(config: LLMConfig) -> LLMService:
    return LLMService(config)
```

## Security Considerations

### Input Validation
- Pydantic models validate all inputs
- Type checking prevents invalid data
- Sanitization of user inputs

### Sandboxing
- Isolated execution environments
- Resource limits (planned)
- Network restrictions (planned)

### API Security
- CORS configured for local use
- No public API exposure by default
- Local storage only

### Data Privacy
- Local-first architecture
- Optional cloud providers
- No telemetry or tracking

## Performance Optimization

### Frontend
- Code splitting (Next.js)
- Lazy loading components
- Optimized images
- Minimal re-renders (Zustand)

### Backend
- Async I/O operations
- Background task execution
- Connection pooling
- Efficient data structures

### LLM Calls
- Configurable timeouts
- Token limit management
- Request batching (future)
- Response caching (future)

## Scalability

### Current Limitations
- In-memory data storage
- Single-instance backend
- Sequential workflow execution

### Future Enhancements
- Database persistence (SQLite/PostgreSQL)
- Distributed execution
- Parallel agent execution
- Workflow queuing system
- Redis for caching

## Extension Points

### Adding New LLM Providers
1. Extend `LLMService` class
2. Add provider type to models
3. Update frontend settings UI
4. Document configuration

### Adding New Node Types
1. Define node type in workflow models
2. Create React component
3. Implement execution logic
4. Add to workflow builder

### Custom Agents
1. Extend `Agent` model
2. Add specialized capabilities
3. Create custom UI
4. Document usage

## Development Workflow

1. Frontend changes: `npm run dev:frontend`
2. Backend changes: `npm run dev:backend`
3. Both together: `npm run dev`
4. Desktop app: `npm run electron:dev`
5. Tests: `npm test`
6. Build: `npm run build`

## Deployment Options

### Desktop Application
- Package with Electron Builder
- Distribute as installers (.dmg, .exe, .AppImage)
- Auto-updates (future)

### Web Application
- Frontend: Static export to CDN
- Backend: Container deployment
- Separate scaling

### Self-Hosted
- Docker Compose (future)
- Single-command deployment
- Included database
