# Frequently Asked Questions (FAQ)

## General Questions

### What is Agent Orchestrator?

Agent Orchestrator is a no-code desktop application that lets you create, manage, and coordinate teams of AI agents to accomplish complex tasks. You can build workflows visually without writing any code.

### Who is this for?

- **Non-developers** who want to automate tasks with AI
- **Developers** who want rapid prototyping
- **Researchers** experimenting with multi-agent systems
- **Anyone** interested in AI agent orchestration

### Is it free?

Yes, Agent Orchestrator is free and open source (MIT License). However, you may incur costs if you use cloud LLM providers like OpenAI or Anthropic.

### Does it require internet?

No! You can run it completely offline using Ollama for local LLMs. Internet is only needed if you want to use cloud providers (OpenAI, Anthropic, etc.).

## Installation & Setup

### What are the system requirements?

- **OS:** Windows 10+, macOS 11+, or Linux (Ubuntu 20.04+)
- **RAM:** 4GB minimum, 8GB recommended
- **Disk:** 2GB minimum, 5GB+ if using local LLMs
- **Software:** Node.js 18+, Python 3.9+

### Do I need to install Ollama?

No, Ollama is optional. It's recommended if you want to run local LLMs for privacy and offline use, but you can use cloud providers instead.

### Can I use it on a Raspberry Pi?

Potentially, but it's not optimized for it. The backend might work, but running local LLMs would be very slow. Cloud providers would work better.

### How do I update to the latest version?

```bash
git pull origin main
npm run install:all
```

## LLM Providers

### Which LLM provider should I use?

- **Ollama (Local):** Best for privacy, offline use, and learning. Free but requires good hardware.
- **OpenAI:** Best for quality and reliability. Paid service.
- **Anthropic:** Best for long documents and context. Paid service.
- **Custom:** For advanced users with their own LLM infrastructure.

### Can I use multiple providers at once?

Yes! Each agent can use a different provider. For example, Agent 1 could use Ollama while Agent 2 uses OpenAI.

### How much does it cost to use OpenAI/Anthropic?

Costs vary by model and usage. For example:
- OpenAI GPT-3.5: ~$0.50 per 1M input tokens
- OpenAI GPT-4: ~$30 per 1M input tokens
- Anthropic Claude: ~$8 per 1M input tokens

Check their pricing pages for current rates.

### What models are available with Ollama?

Many! Popular ones include:
- llama2 (Meta's open model)
- mistral (Fast and capable)
- codellama (Code-focused)
- vicuna (Conversation)
- And many more at [ollama.ai/library](https://ollama.ai/library)

### Can I use GPT-4?

Yes, if you have access to OpenAI's GPT-4 API. Just configure your OpenAI API key and select `gpt-4` as the model name.

## Agents & Workflows

### What is an agent?

An agent is an AI assistant with a specific role (e.g., Researcher, Writer, Analyst). Each agent has its own LLM, system prompt, and configuration.

### What is a workflow?

A workflow connects multiple agents together to accomplish a complex task. For example: Research Agent → Summary Agent → Editor Agent.

### How many agents can I have?

There's no hard limit, but performance depends on your system resources and the LLM provider you're using.

### Can agents communicate with each other?

Yes! In a workflow, the output of one agent becomes the input for the next agent in the sequence.

### Can workflows run in parallel?

Not yet, but this is planned for a future release. Currently, agents execute sequentially.

### Can I save and reuse workflows?

Currently, workflows are stored in memory and lost when you close the application. Persistent storage is planned for a future release.

### Can I share workflows with others?

You can export/import workflow JSON files (feature coming soon). For now, you'd need to manually recreate them.

## Features & Capabilities

### Is there a visual workflow builder?

Yes! Drag agents from the sidebar onto the canvas and connect them with edges to define the flow.

### Can I monitor workflow execution?

Yes, the Monitor page shows real-time logs, active workflows, and execution statistics.

### Is there a tutorial?

Yes! Click the "Tutorial" button on the home page for an interactive walkthrough of all features.

### Can agents access the internet?

Not directly in the current version. Agents can only process the input you provide. Web search and tool use are planned for future releases.

### Can agents write code?

Agents can generate code as text, but they don't execute it by default. The sandboxed execution feature is in development.

### Can I use my own data/documents?

Currently, you'd need to paste your data into the workflow input. Document upload and vector database support are planned.

## Privacy & Security

### Is my data safe?

- **With Ollama:** Your data never leaves your computer
- **With cloud providers:** Data is sent to their APIs (check their privacy policies)
- **In the app:** Data is stored locally in memory only

### Do you collect any data?

No. Agent Orchestrator has no telemetry, tracking, or analytics.

### Can I use this in a corporate environment?

Yes, especially with Ollama for complete data privacy. However, check your company's policies regarding AI usage.

### Is the code auditable?

Yes! It's 100% open source. You can review all code on GitHub.

## Technical Questions

### What technologies are used?

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Electron
- **Backend:** Python, FastAPI, Pydantic
- **Workflow:** React Flow
- **State:** Zustand
- **Desktop:** Electron

### Can I contribute to the project?

Yes! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Can I extend it with plugins?

Not yet, but a plugin system is planned for a future release.

### Is there an API?

Yes! The backend exposes a REST API at `http://localhost:8000`. Check `/docs` for auto-generated documentation.

### Can I use it as a library?

Currently it's designed as a standalone application, but you could potentially import components or services.

### Does it support webhooks?

Not yet, but this is planned for workflow triggers.

## Performance

### Why is it slow?

Possible reasons:
- Using a large model (try smaller models like llama2:7b instead of llama2:70b)
- Slow internet (for cloud providers)
- Insufficient hardware (for local LLMs)
- High token limits (reduce max_tokens)

### How can I make it faster?

- Use smaller/faster models
- Reduce max_tokens
- Use GPT-3.5 instead of GPT-4
- Use local LLMs with GPU acceleration
- Optimize system prompts to be concise

### Can I use GPU acceleration?

Yes, if you're using Ollama with a compatible GPU. Ollama automatically uses GPU when available.

## Troubleshooting

### The application won't start

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions.

### Ollama connection failed

1. Make sure Ollama is installed: `ollama --version`
2. Start Ollama: `ollama serve`
3. Verify it's running: `curl http://localhost:11434/api/tags`
4. Check the URL in Settings

### My agents/workflows disappeared

Currently, data is stored in memory and lost on restart. Persistent storage is coming in a future release.

### The workflow execution never completes

- Check the Monitor page for errors
- Verify your LLM provider is configured correctly
- Try a simpler workflow first
- Check timeout settings

## Future Features

### What's on the roadmap?

- Database persistence
- Workflow templates
- Agent marketplace
- Plugin system
- Multi-user support
- Cloud sync
- Mobile app
- More LLM providers
- Advanced workflow features (loops, conditions, parallel execution)
- Tool use (web search, file access, etc.)
- Document processing
- Vector databases

### When will [feature] be released?

Check the [CHANGELOG.md](../CHANGELOG.md) for planned features. We can't provide specific dates, but we're actively developing.

### Can I request a feature?

Yes! Open an issue on GitHub with your feature request.

## Getting Help

### Where can I get help?

1. Check the [Documentation](../docs/)
2. Review the [Troubleshooting Guide](./TROUBLESHOOTING.md)
3. Search [GitHub Issues](https://github.com/dwilli15/auto-test/issues)
4. Create a new issue with details

### How do I report a bug?

Open an issue on GitHub with:
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, versions)
- Screenshots if applicable

### Is there a community?

Coming soon! We're planning:
- Discord server
- Discussion forum
- Example repository

---

**Didn't find your question?** Open an issue on GitHub or check the full documentation.
