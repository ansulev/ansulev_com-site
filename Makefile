.PHONY: help dev build clean install

# --- COMANDOS PRINCIPALES ---

# Desarrollo: ¡CORREGIDO! Primero construye el CSS, luego arranca los servidores.
dev:
	@echo "📦 Building initial CSS with Tailwind..."
	@npm run build
	@echo "🚀 Starting Hugo & Tailwind dev servers..."
	@npm run watch & hugo server --bind="0.0.0.0" --port=1313 --disableFastRender

# Construcción para Producción
build:
	@echo "📦 Building CSS with Tailwind..."
	@npm run build
	@echo "🏗️ Building Hugo site for production..."
	@hugo --minify

# Limpieza
clean:
	@echo "🧹 Cleaning build files and caches..."
	@rm -rf public/ resources/ node_modules/ package-lock.json static/css
	@echo "✅ Clean complete"

# Instalación
install:
	@echo "📦 Installing dependencies..."
	@npm install

# Ayuda
help:
	@echo "🎯 Available commands:"
	@echo "   make dev        - Start Hugo & Tailwind dev servers"
	@echo "   make build      - Build site for production"
	@echo "   make clean      - Clean all build files"
	@echo "   make install    - Install dependencies"

