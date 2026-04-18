# 🚀 Inicio Rápido

Guía para poner en marcha el proyecto en **menos de 5 minutos**.

## 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/TU_USUARIO/paleopatologia-museo-virtual.git
cd paleopatologia-museo-virtual
```

## 2️⃣ Instalar Dependencias

### Con pnpm (recomendado)
```bash
pnpm install
```

### Con npm
```bash
npm install
```

### Con yarn
```bash
yarn install
```

## 3️⃣ Iniciar Servidor de Desarrollo

```bash
pnpm dev
```

El proyecto estará disponible en: **http://localhost:5173**

## 4️⃣ ¡Listo! 🎉

Abre tu navegador y explora el museo virtual.

---

## 📁 Estructura Rápida

```
src/
├── app/
│   ├── App.tsx              # 🏠 Componente principal
│   └── components/          # 🧩 Todos los componentes
│       ├── Navbar.tsx       # Navegación
│       ├── Hero.tsx         # Sección inicial
│       ├── CaseCard.tsx     # Tarjetas de casos
│       ├── CaseModal.tsx    # Detalles de casos
│       ├── Quiz.tsx         # Quiz interactivo
│       ├── Timeline.tsx     # Línea de tiempo
│       └── Footer.tsx       # Pie de página
└── styles/
    ├── theme.css            # 🎨 Colores y variables
    └── fonts.css            # 📝 Fuentes
```

## 🛠️ Comandos Útiles

```bash
# Desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Vista previa del build
pnpm preview
```

## ✏️ Personalización Rápida

### Cambiar colores

Edita `src/styles/theme.css`:

```css
:root {
  --background: #F5F1E8;      /* Fondo principal */
  --foreground: #2C1810;       /* Texto principal */
  --accent: #C1440E;           /* Color de acento */
}
```

### Añadir un nuevo caso

Edita `src/app/App.tsx` y añade en `casesData`:

```typescript
{
  id: 5,
  title: 'Nuevo Caso',
  description: 'Descripción breve',
  imageUrl: 'https://...',
  period: 'Época histórica',
  simpleExplanation: 'Explicación simple',
  scientificExplanation: 'Explicación técnica',
  characteristics: ['Característica 1', 'Característica 2']
}
```

## 🌐 Desplegar

### Vercel (1 comando)
```bash
npm i -g vercel
vercel
```

### Netlify (manual)
1. `pnpm build`
2. Sube la carpeta `dist/` a Netlify

## 🆘 ¿Problemas?

### Puerto 5173 ocupado
```bash
pnpm dev --port 3000
```

### Dependencias no instalan
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### No se ven las imágenes
- Verifica conexión a internet (usa Unsplash)
- Revisa la consola del navegador

## 📚 Siguiente Paso

Lee el [README completo](README.md) para información detallada.

---

**¿Todo funcionando?** ¡Empieza a contribuir! Ver [CONTRIBUTING.md](CONTRIBUTING.md)
