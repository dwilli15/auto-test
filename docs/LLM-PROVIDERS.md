# LLM Provider Configuration Guide

Guide for configuring different LLM providers in Agent Orchestrator.

## Supported Providers

Agent Orchestrator supports multiple LLM providers:

1. **Ollama** (Local) - Recommended for privacy and offline use
2. **OpenAI** (Cloud) - GPT-3.5, GPT-4, and other models
3. **Anthropic** (Cloud) - Claude models
4. **Custom** - Any OpenAI-compatible API

## Ollama (Local LLMs)

### Advantages
- ✅ Free and open source
- ✅ Complete privacy - runs locally
- ✅ Offline capability
- ✅ No API costs
- ✅ Fast response times (with good hardware)

### Setup

1. **Install Ollama**: See [Installation Guide](./INSTALLATION.md#4-optional-install-ollama-for-local-llms)

2. **Pull Models**:
   ```bash
   # Recommended models
   ollama pull llama2          # General purpose (7B)
   ollama pull mistral         # Fast and capable (7B)
   ollama pull codellama       # Code-focused (7B)
   ollama pull llama2:13b      # More capable but slower (13B)
   ```

3. **Configure in Agent Orchestrator**:
   - Go to Settings
   - Ollama URL: `http://localhost:11434` (default)
   - Click "Test" to verify connection

### Available Models

| Model | Size | Best For | Speed |
|-------|------|----------|-------|
| llama2 | 7B | General tasks | Fast |
| llama2:13b | 13B | Complex reasoning | Medium |
| llama2:70b | 70B | Advanced tasks | Slow |
| mistral | 7B | Balanced performance | Fast |
| codellama | 7B | Programming | Fast |
| vicuna | 7B/13B | Conversations | Fast/Medium |

## OpenAI

### Advantages
- ✅ Most powerful models (GPT-4)
- ✅ Excellent reasoning capabilities
- ✅ Large context windows
- ✅ Reliable API

### Setup

1. **Get API Key**:
   - Sign up at [platform.openai.com](https://platform.openai.com/)
   - Navigate to API Keys
   - Create a new secret key

2. **Configure in Agent Orchestrator**:
   - Go to Settings
   - Enter your API key in the OpenAI section
   - Save settings

### Available Models

| Model | Context | Best For | Cost (per 1M tokens) |
|-------|---------|----------|----------------------|
| gpt-3.5-turbo | 16K | Fast, cheap tasks | $0.50 / $1.50 |
| gpt-4 | 8K | Complex reasoning | $30 / $60 |
| gpt-4-turbo | 128K | Long contexts | $10 / $30 |

### Cost Management Tips
- Use GPT-3.5-turbo for simple tasks
- Set max_tokens limits
- Monitor usage in the OpenAI dashboard
- Use Ollama for development/testing

## Anthropic (Claude)

### Advantages
- ✅ Large context windows (100K+)
- ✅ Strong reasoning
- ✅ Helpful and harmless
- ✅ Good for long documents

### Setup

1. **Get API Key**:
   - Sign up at [console.anthropic.com](https://console.anthropic.com/)
   - Create an API key

2. **Configure in Agent Orchestrator**:
   - Go to Settings
   - Enter your API key in the Anthropic section
   - Save settings

### Available Models

| Model | Context | Best For | Cost (per 1M tokens) |
|-------|---------|----------|----------------------|
| claude-instant | 100K | Fast tasks | $1.63 / $5.51 |
| claude-2 | 100K | Complex tasks | $8 / $24 |
| claude-3-opus | 200K | Most capable | $15 / $75 |

## Custom Providers

For OpenAI-compatible APIs (LocalAI, LM Studio, etc.):

1. **Configure in Settings**:
   - Provider: Custom
   - Base URL: Your API endpoint
   - API Key: If required
   - Model Name: As required by your API

2. **Compatible Services**:
   - LM Studio
   - LocalAI
   - Text Generation WebUI
   - vLLM
   - Any OpenAI-compatible API

## Choosing the Right Provider

### For Learning/Development
**Use Ollama** - Free, private, no rate limits

### For Production
**Use Cloud Providers** - More reliable, scalable

### For Privacy-Sensitive Data
**Use Ollama or Custom Local** - Data never leaves your machine

### For Cost Optimization
1. Use Ollama for development
2. Use GPT-3.5-turbo for production simple tasks
3. Use GPT-4 only for complex reasoning
4. Cache results when possible

## Best Practices

### Temperature Settings
- **0.0-0.3**: Factual, deterministic tasks
- **0.4-0.7**: Balanced creativity and consistency
- **0.8-1.0**: Creative, varied outputs

### Max Tokens
- Set appropriate limits to control costs
- Typical ranges:
  - Short responses: 100-500
  - Medium responses: 500-2000
  - Long responses: 2000-4000

### System Prompts
- Be specific about the agent's role
- Include output format requirements
- Specify any constraints
- Give examples if needed

## Troubleshooting

### Ollama Issues
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama
ollama serve

# Pull model again if corrupted
ollama pull llama2 --force
```

### API Key Issues
- Verify the key is correct (no extra spaces)
- Check if the key has proper permissions
- Verify billing is set up (OpenAI/Anthropic)
- Check rate limits

### Performance Issues
- Use smaller models (7B instead of 70B)
- Reduce max_tokens
- Lower temperature slightly
- Batch requests when possible

## Testing Your Configuration

1. Go to Settings
2. Click "Test" next to your configured provider
3. Create a test agent with that provider
4. Run a simple workflow to verify it works
