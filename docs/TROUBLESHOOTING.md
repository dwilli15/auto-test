# Troubleshooting Guide

Common issues and solutions for Agent Orchestrator.

## Installation Issues

### Node.js or npm not found

**Problem:** `command not found: node` or `command not found: npm`

**Solution:**
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Verify installation: `node --version` and `npm --version`
3. Restart your terminal

### Python not found

**Problem:** `command not found: python` or `command not found: python3`

**Solution:**
1. Install Python from [python.org](https://www.python.org/)
2. Verify installation: `python --version` or `python3 --version`
3. On Windows, make sure "Add Python to PATH" was checked during installation

### Dependencies installation fails

**Problem:** `npm install` or `pip install` fails

**Solutions:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall
- Use Python virtual environment:
  ```bash
  cd backend
  python -m venv venv
  source venv/bin/activate  # or venv\Scripts\activate on Windows
  pip install -r requirements.txt
  ```
- Check your internet connection
- Try using different npm registry: `npm config set registry https://registry.npmjs.org/`

## Runtime Issues

### Port already in use

**Problem:** `Error: Port 8000 already in use` or `Port 3000 already in use`

**Solutions:**

**Linux/macOS:**
```bash
# Find process using port 8000
lsof -ti:8000
# Kill the process
kill -9 <PID>

# Or for port 3000
lsof -ti:3000 | xargs kill -9
```

**Windows:**
```cmd
# Find process using port 8000
netstat -ano | findstr :8000
# Kill the process
taskkill /PID <PID> /F
```

**Alternative:** Change the port in configuration files

### Frontend won't start

**Problem:** `npm run dev:frontend` fails

**Solutions:**
1. Make sure you're in the frontend directory
2. Delete `.next` folder and `node_modules`, then reinstall
3. Check for TypeScript errors: `npm run build`
4. Verify Next.js config: `frontend/next.config.js`

### Backend won't start

**Problem:** `npm run dev:backend` fails

**Solutions:**
1. Make sure you're in the backend directory
2. Check Python version: `python --version` (needs 3.9+)
3. Verify all dependencies are installed: `pip list`
4. Check for syntax errors: `python -m py_compile main.py`
5. Look at the error message for missing modules and install them

## Ollama Issues

### Cannot connect to Ollama

**Problem:** "Ollama connection error" or "Failed to fetch Ollama models"

**Solutions:**
1. Check if Ollama is installed: `ollama --version`
2. Start Ollama service:
   ```bash
   ollama serve
   ```
3. Verify Ollama is running:
   ```bash
   curl http://localhost:11434/api/tags
   ```
4. Check the Ollama URL in Settings (default: `http://localhost:11434`)

### No models available

**Problem:** Ollama is running but no models show up

**Solutions:**
1. Pull a model:
   ```bash
   ollama pull llama2
   ```
2. List available models:
   ```bash
   ollama list
   ```
3. Restart the application after pulling models

### Ollama model download slow

**Solutions:**
- Use a smaller model (e.g., `llama2:7b` instead of `llama2:70b`)
- Check your internet connection
- Download during off-peak hours
- Consider using a mirror or proxy

## LLM Provider Issues

### OpenAI API errors

**Problem:** "OpenAI API error" or "Invalid API key"

**Solutions:**
1. Verify your API key is correct (no extra spaces)
2. Check if you have credits: [platform.openai.com/account/billing](https://platform.openai.com/account/billing)
3. Verify the model name is correct (e.g., `gpt-3.5-turbo`, `gpt-4`)
4. Check rate limits and quotas

### Anthropic API errors

**Problem:** "Anthropic API error"

**Solutions:**
1. Verify API key is correct
2. Check the model name (e.g., `claude-2`, `claude-instant-1`)
3. Ensure you have access to the model you're trying to use
4. Check your account status and credits

## Workflow Execution Issues

### Workflow doesn't execute

**Problem:** Clicking "Run" doesn't do anything

**Solutions:**
1. Check if agents are properly configured
2. Verify LLM provider is configured and accessible
3. Check browser console for errors (F12 → Console)
4. Check backend logs for errors
5. Try a simple workflow with one agent first

### Workflow execution timeout

**Problem:** "Execution timeout" error

**Solutions:**
1. Increase timeout in agent settings
2. Reduce `max_tokens` for faster responses
3. Use a faster model (e.g., GPT-3.5 instead of GPT-4)
4. Simplify the workflow
5. Check your internet connection for cloud APIs

### Agent responses are empty

**Problem:** Agent completes but returns no output

**Solutions:**
1. Check system prompt is not too restrictive
2. Verify the model is appropriate for the task
3. Increase `max_tokens`
4. Check LLM provider logs
5. Try with a different model

## UI Issues

### Blank screen

**Problem:** Application shows blank screen

**Solutions:**
1. Check browser console for errors (F12)
2. Clear browser cache and reload
3. Try a different browser
4. Check if JavaScript is enabled
5. Verify all frontend files are built: `npm run build:frontend`

### Drag-and-drop not working

**Problem:** Cannot drag agents in workflow builder

**Solutions:**
1. Refresh the page
2. Check if React Flow is loaded (check console)
3. Try clicking the agent first, then dragging
4. Clear browser cache
5. Update browser to latest version

### Dark mode issues

**Problem:** Dark mode doesn't work or looks broken

**Solutions:**
1. Toggle dark mode in system settings
2. Check Tailwind CSS is properly configured
3. Clear browser cache
4. Verify CSS classes are correct

## Electron Desktop App Issues

### App won't start

**Problem:** Double-clicking the app does nothing

**Solutions:**
1. Start from terminal to see errors: `npm run electron:dev`
2. Check if Node.js is installed
3. Rebuild Electron: `cd frontend && npm rebuild electron`
4. Delete `node_modules` and reinstall

### App crashes on startup

**Problem:** App starts then immediately closes

**Solutions:**
1. Check terminal for error messages
2. Verify all dependencies are installed
3. Check Electron version compatibility
4. Try running in web mode first: `npm run dev`

## Performance Issues

### Application is slow

**Solutions:**
1. Use local LLMs (Ollama) instead of cloud APIs
2. Reduce `max_tokens` for agents
3. Close other applications
4. Check system resources (RAM, CPU)
5. Use a smaller LLM model

### Workflow execution is slow

**Solutions:**
1. Use faster models (GPT-3.5 instead of GPT-4)
2. Reduce agent count in workflow
3. Optimize system prompts to be more concise
4. Check internet speed for cloud APIs
5. Use local GPU for Ollama if available

## Data Issues

### Lost agents or workflows

**Problem:** Created agents/workflows disappeared

**Solutions:**
1. Currently data is stored in memory only (restarts clear data)
2. Export your agents and workflows before closing
3. Use browser localStorage (future feature)
4. Consider using Docker volume for persistence

### Cannot delete agent/workflow

**Problem:** Delete button doesn't work

**Solutions:**
1. Refresh the page
2. Check if the item is in use by another workflow
3. Check browser console for errors
4. Try using API directly: `DELETE http://localhost:8000/api/agents/{id}`

## Build Issues

### Frontend build fails

**Problem:** `npm run build:frontend` fails

**Solutions:**
1. Check for TypeScript errors: `npm run lint`
2. Delete `.next` and rebuild
3. Update dependencies: `npm update`
4. Check for missing environment variables

### Electron build fails

**Problem:** `npm run electron:build` fails

**Solutions:**
1. Ensure frontend is built first: `npm run build:frontend`
2. Check Electron Builder configuration
3. Verify all files are in the correct locations
4. Check for sufficient disk space
5. Try building for specific platform: `npm run electron:build -- --mac` or `--win` or `--linux`

## Network Issues

### Cannot access backend API

**Problem:** Frontend cannot connect to backend

**Solutions:**
1. Verify backend is running: `http://localhost:8000`
2. Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
3. Check CORS settings in backend
4. Verify no firewall is blocking the connection
5. Try accessing API directly in browser

### CORS errors

**Problem:** "CORS policy" errors in console

**Solutions:**
1. Verify CORS configuration in `backend/main.py`
2. Make sure frontend URL is in `allow_origins`
3. Restart backend after changes
4. Check if using correct protocol (http vs https)

## Getting More Help

If you're still experiencing issues:

1. **Check existing issues:** [GitHub Issues](https://github.com/dwilli15/auto-test/issues)
2. **Review documentation:** Check all docs in the `docs/` folder
3. **Enable debug logging:** Set log level to "debug" in Settings
4. **Create an issue:** Provide:
   - Operating system and version
   - Node.js and Python versions
   - Steps to reproduce
   - Error messages
   - Screenshots if applicable

## Debugging Tips

### Enable verbose logging

**Backend:**
Edit `backend/main.py` and set log level to DEBUG

**Frontend:**
Open browser console (F12) to see detailed logs

### Check API endpoints manually

Test API directly with curl or browser:
```bash
# List agents
curl http://localhost:8000/api/agents

# List workflows
curl http://localhost:8000/api/workflows

# Health check
curl http://localhost:8000/health
```

### Test LLM connection

```bash
# Test Ollama
curl http://localhost:11434/api/tags

# Test OpenAI (replace YOUR_KEY)
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_KEY"
```

### Reset application

If all else fails, reset everything:
```bash
# Remove all dependencies
rm -rf node_modules frontend/node_modules backend/venv

# Remove build artifacts
rm -rf frontend/.next frontend/out backend/__pycache__

# Reinstall
npm run install:all

# Restart
npm run dev
```
