# Guía de Despliegue

Esta guía te ayudará a desplegar el Museo Virtual de Paleopatología en diferentes plataformas.

## 📋 Requisitos Previos

- Node.js 18+ instalado
- pnpm (recomendado) o npm
- Cuenta en la plataforma de hosting elegida

## 🚀 Despliegue en Vercel (Recomendado)

### Opción 1: Desde GitHub (Más fácil)

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Haz clic en "Import Project"
4. Selecciona tu repositorio de GitHub
5. Vercel detectará automáticamente la configuración de Vite
6. Haz clic en "Deploy"

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

**Configuración automática:**
- Build Command: `vite build`
- Output Directory: `dist`
- Framework Preset: Vite

## 🌐 Despliegue en Netlify

### Opción 1: Desde GitHub

1. Ve a [netlify.com](https://netlify.com)
2. Haz clic en "New site from Git"
3. Selecciona tu repositorio
4. Configura:
   - Build command: `pnpm build`
   - Publish directory: `dist`
5. Haz clic en "Deploy site"

### Opción 2: Drag & Drop

```bash
# Construir el proyecto
pnpm build

# Subir la carpeta dist/ a Netlify manualmente
```

### Configuración en netlify.toml

Crea un archivo `netlify.toml` en la raíz:

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📄 Despliegue en GitHub Pages

1. Instala `gh-pages`:
```bash
pnpm add -D gh-pages
```

2. Añade en `package.json`:
```json
"scripts": {
  "predeploy": "pnpm build",
  "deploy": "gh-pages -d dist"
},
"homepage": "https://TU_USUARIO.github.io/paleopatologia-museo-virtual"
```

3. Actualiza `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/paleopatologia-museo-virtual/',
  // ... resto de configuración
})
```

4. Despliega:
```bash
pnpm deploy
```

5. Configura GitHub Pages:
   - Ve a Settings > Pages
   - Selecciona la rama `gh-pages`
   - Guarda

## 🐳 Despliegue con Docker

### Dockerfile

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}
```

### Construir y ejecutar

```bash
# Construir imagen
docker build -t paleopatologia-museo .

# Ejecutar
docker run -p 8080:80 paleopatologia-museo
```

## 🔧 Variables de Entorno

Este proyecto no requiere variables de entorno en producción, ya que todas las imágenes vienen de Unsplash y no hay APIs privadas.

Si en el futuro añades APIs que requieren keys:

1. Crea `.env.production`:
```
VITE_API_KEY=tu_api_key_aqui
```

2. En tu código usa:
```typescript
const apiKey = import.meta.env.VITE_API_KEY
```

3. Configura las variables en tu plataforma de hosting:
   - Vercel: Settings > Environment Variables
   - Netlify: Site settings > Build & deploy > Environment

## ⚡ Optimizaciones de Producción

### Build optimizado

El comando `pnpm build` ya incluye:
- Minificación de JS/CSS
- Tree shaking
- Code splitting
- Optimización de assets

### Mejoras adicionales

```bash
# Analizar el bundle
pnpm add -D rollup-plugin-visualizer

# En vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer()
  ]
})
```

## 🔍 Testing en Producción

Antes de desplegar, verifica:

```bash
# Construir
pnpm build

# Previsualizar localmente
pnpm preview
```

Abre `http://localhost:4173` y verifica:
- [ ] Todas las páginas cargan
- [ ] Las imágenes se muestran
- [ ] Las animaciones funcionan
- [ ] Responsive en móvil
- [ ] No hay errores en consola

## 📊 Monitoreo Post-Despliegue

### Analytics (Opcional)

Si deseas añadir analytics:

**Google Analytics:**
```typescript
// En index.html o App.tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

**Plausible (Alternativa privacy-friendly):**
```html
<script defer data-domain="tudominio.com" src="https://plausible.io/js/script.js"></script>
```

## 🆘 Solución de Problemas

### Las imágenes no cargan

- Verifica que las URLs de Unsplash sean accesibles
- Revisa la consola del navegador para errores CORS

### Error 404 en rutas

- Configura redirects para SPA (ver configuración de Netlify arriba)
- En Vercel se configura automáticamente

### Build falla

```bash
# Limpiar caché
rm -rf node_modules dist
pnpm install
pnpm build
```

### Performance lenta

- Verifica que el build esté usando modo producción
- Asegúrate de que gzip/brotli esté habilitado en el servidor
- Usa CDN para assets estáticos

## 📞 Soporte

Si tienes problemas con el despliegue:
- Revisa los [Issues](https://github.com/TU_USUARIO/paleopatologia-museo-virtual/issues)
- Crea un nuevo issue con:
  - Plataforma de hosting
  - Logs de error
  - Pasos que seguiste

---

**¡Listo!** Tu museo virtual estará accesible para estudiantes de todo el mundo 🎓
