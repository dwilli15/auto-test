"""
LLM service for communicating with different LLM providers.
Supports Ollama (local), OpenAI, Anthropic, and custom providers.
"""
import httpx
import os
from typing import Optional, Dict, Any, List
from app.models import LLMConfig

class LLMService:
    """Service for interacting with various LLM providers"""
    
    def __init__(self, config: LLMConfig):
        self.config = config
        self.client = httpx.AsyncClient(timeout=60.0)
    
    async def generate(
        self, 
        prompt: str, 
        system_prompt: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None
    ) -> str:
        """
        Generate text using the configured LLM provider.
        
        Args:
            prompt: The user prompt
            system_prompt: Optional system prompt
            temperature: Temperature for generation (overrides config)
            max_tokens: Max tokens to generate (overrides config)
            
        Returns:
            Generated text
        """
        temp = temperature if temperature is not None else self.config.temperature
        tokens = max_tokens if max_tokens is not None else self.config.maxTokens
        
        if self.config.provider == "ollama":
            return await self._generate_ollama(prompt, system_prompt, temp, tokens)
        elif self.config.provider == "openai":
            return await self._generate_openai(prompt, system_prompt, temp, tokens)
        elif self.config.provider == "anthropic":
            return await self._generate_anthropic(prompt, system_prompt, temp, tokens)
        else:
            return await self._generate_custom(prompt, system_prompt, temp, tokens)
    
    async def _generate_ollama(
        self, 
        prompt: str, 
        system_prompt: Optional[str],
        temperature: float,
        max_tokens: int
    ) -> str:
        """Generate using Ollama"""
        base_url = self.config.baseUrl or "http://localhost:11434"
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        try:
            response = await self.client.post(
                f"{base_url}/api/chat",
                json={
                    "model": self.config.modelName,
                    "messages": messages,
                    "options": {
                        "temperature": temperature,
                        "num_predict": max_tokens
                    },
                    "stream": False
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get("message", {}).get("content", "")
            else:
                return f"Error: Ollama returned status {response.status_code}"
        except Exception as e:
            return f"Error communicating with Ollama: {str(e)}"
    
    async def _generate_openai(
        self, 
        prompt: str, 
        system_prompt: Optional[str],
        temperature: float,
        max_tokens: int
    ) -> str:
        """Generate using OpenAI API"""
        if not self.config.apiKey:
            return "Error: OpenAI API key not configured"
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        try:
            response = await self.client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.config.apiKey}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": self.config.modelName,
                    "messages": messages,
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                return data["choices"][0]["message"]["content"]
            else:
                return f"Error: OpenAI returned status {response.status_code}"
        except Exception as e:
            return f"Error communicating with OpenAI: {str(e)}"
    
    async def _generate_anthropic(
        self, 
        prompt: str, 
        system_prompt: Optional[str],
        temperature: float,
        max_tokens: int
    ) -> str:
        """Generate using Anthropic API"""
        if not self.config.apiKey:
            return "Error: Anthropic API key not configured"
        
        try:
            response = await self.client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": self.config.apiKey,
                    "anthropic-version": "2023-06-01",
                    "Content-Type": "application/json"
                },
                json={
                    "model": self.config.modelName,
                    "messages": [{"role": "user", "content": prompt}],
                    "system": system_prompt or "",
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                return data["content"][0]["text"]
            else:
                return f"Error: Anthropic returned status {response.status_code}"
        except Exception as e:
            return f"Error communicating with Anthropic: {str(e)}"
    
    async def _generate_custom(
        self, 
        prompt: str, 
        system_prompt: Optional[str],
        temperature: float,
        max_tokens: int
    ) -> str:
        """Generate using custom OpenAI-compatible API"""
        if not self.config.baseUrl:
            return "Error: Custom API base URL not configured"
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        headers = {"Content-Type": "application/json"}
        if self.config.apiKey:
            headers["Authorization"] = f"Bearer {self.config.apiKey}"
        
        try:
            response = await self.client.post(
                f"{self.config.baseUrl}/chat/completions",
                headers=headers,
                json={
                    "model": self.config.modelName,
                    "messages": messages,
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                return data["choices"][0]["message"]["content"]
            else:
                return f"Error: Custom API returned status {response.status_code}"
        except Exception as e:
            return f"Error communicating with custom API: {str(e)}"
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()

def create_llm_service(config: LLMConfig) -> LLMService:
    """Factory function to create an LLM service"""
    return LLMService(config)
