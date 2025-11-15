#!/bin/bash

# Quick start script for Agent Orchestrator
# This script checks dependencies and starts the application

set -e

echo "🚀 Agent Orchestrator - Quick Start"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check Python
echo -n "Checking Python... "
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓${NC} $PYTHON_VERSION"
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version)
    echo -e "${GREEN}✓${NC} $PYTHON_VERSION"
else
    echo -e "${RED}✗${NC} Python not found"
    echo "Please install Python 3.9+ from https://python.org/"
    exit 1
fi

# Check for Ollama (optional)
echo -n "Checking Ollama (optional)... "
if command -v ollama &> /dev/null; then
    echo -e "${GREEN}✓${NC} Installed"
    
    # Check if Ollama is running
    if curl -s http://localhost:11434/api/tags &> /dev/null; then
        echo -e "  ${GREEN}✓${NC} Ollama is running"
    else
        echo -e "  ${YELLOW}⚠${NC} Ollama is installed but not running"
        echo "  Run 'ollama serve' in another terminal"
    fi
else
    echo -e "${YELLOW}⚠${NC} Not installed (optional for local LLMs)"
    echo "  Install from: https://ollama.ai"
fi

echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ] || [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run install:all
    echo ""
fi

# Ask user how to run
echo "How would you like to run Agent Orchestrator?"
echo "1) Desktop Application (Electron)"
echo "2) Web Browser"
echo "3) Backend only"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🖥️  Starting Desktop Application..."
        npm run electron:dev
        ;;
    2)
        echo ""
        echo "🌐 Starting Web Application..."
        echo "Backend will start on http://localhost:8000"
        echo "Frontend will start on http://localhost:3000"
        echo ""
        npm run dev
        ;;
    3)
        echo ""
        echo "⚙️  Starting Backend only..."
        echo "API will be available at http://localhost:8000"
        npm run dev:backend
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac
