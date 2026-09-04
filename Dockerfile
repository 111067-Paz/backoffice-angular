# ==============================================================================
# Dockerfile Multi-Stage Canónico — BackOffice Angular 21 (Tema 12)
# Cátedra: Programación IV / Frontend Unidad 1: Arquitectura y Despliegue
# ==============================================================================

# ------------------------------------------------------------------------------
# Etapa 1: Build de la aplicación Angular 21 Standalone
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Optimización de caché de capas: copiar dependencias primero
COPY package*.json ./
RUN npm ci

# Copiar código fuente y compilar distribución de producción
COPY . .
RUN npm run build -- --configuration=production

# ------------------------------------------------------------------------------
# Etapa 2: Runtime ligero con Nginx Alpine y resolución dinámica envsubst
# ------------------------------------------------------------------------------
FROM nginx:alpine

# Variable de entorno de integración con API Gateway (Tema 01)
ENV API_GATEWAY_URL="http://api-gateway:8080"

# Copiar los archivos estáticos compilados por Angular Application Builder
COPY --from=builder /app/dist/backoffice-angular/browser /usr/share/nginx/html

# Copiar plantilla de Nginx (el entrypoint oficial de nginx ejecuta envsubst automáticamente)
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 80

# Arranque de Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
