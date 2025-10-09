# ===== Etapa de build =====
FROM node:20-alpine AS build
WORKDIR /app

# Copia solo manifiestos primero (mejor caché)
COPY package*.json ./

# Instala deps en modo limpio
RUN npm ci

# Copia el resto del código
COPY . .
ENV NODE_ENV=production

# Construye la app (funciona tanto con Vite como con Vue CLI)
RUN npm run build

# ===== Etapa de run: Nginx sirviendo estáticos =====
FROM nginx:alpine

# Config Nginx para SPA (history mode)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copia artefactos compilados
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
