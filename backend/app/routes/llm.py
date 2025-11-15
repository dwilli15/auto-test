from fastapi import APIRouter, HTTPException
from app.models import LLMConfig
from typing import List
import httpx

router = APIRouter()

@router.get("/ollama/models")
async def list_ollama_models():
    """List available Ollama models"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get("http://localhost:11434/api/tags")
            if response.status_code == 200:
                data = response.json()
                return data.get("models", [])
            else:
                raise HTTPException(status_code=500, detail="Failed to fetch Ollama models")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ollama connection error: {str(e)}")

@router.post("/test")
async def test_llm_connection(config: LLMConfig):
    """Test LLM provider connection"""
    try:
        if config.provider == "ollama":
            base_url = config.baseUrl or "http://localhost:11434"
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{base_url}/api/tags")
                if response.status_code == 200:
                    return {"success": True, "message": "Ollama connection successful"}
                else:
                    return {"success": False, "message": "Failed to connect to Ollama"}
        
        elif config.provider == "openai":
            if not config.apiKey:
                return {"success": False, "message": "OpenAI API key required"}
            # TODO: Test OpenAI connection
            return {"success": True, "message": "OpenAI configuration accepted (not tested)"}
        
        elif config.provider == "anthropic":
            if not config.apiKey:
                return {"success": False, "message": "Anthropic API key required"}
            # TODO: Test Anthropic connection
            return {"success": True, "message": "Anthropic configuration accepted (not tested)"}
        
        else:
            return {"success": False, "message": "Unsupported provider"}
            
    except Exception as e:
        return {"success": False, "message": f"Connection error: {str(e)}"}
