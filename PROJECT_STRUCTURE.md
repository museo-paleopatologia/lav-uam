# 📂 Estructura del Proyecto

Documentación detallada de la arquitectura y organización del código.

## 📁 Árbol de Directorios

```
paleopatologia-museo-virtual/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md          # Template para reportar bugs
│   │   └── feature_request.md     # Template para solicitar features
│   └── PULL_REQUEST_TEMPLATE.md   # Template para PRs
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Navbar.tsx         # 🧭 Navegación principal
│   │   │   ├── Hero.tsx           # 🎭 Sección hero con imagen
│   │   │   ├── CaseCard.tsx       # 🎴 Tarjeta de caso individual
│   │   │   ├── CaseModal.tsx      # 🔍 Modal con detalles de caso
│   │   │   ├── Quiz.tsx           # 🎯 Quiz interactivo
│   │   │   ├── Timeline.tsx       # ⏱️ Línea de tiempo histórica
│   │   │   └── Footer.tsx         # 📄 Pie de página
│   │   └── App.tsx                # 🏠 Componente raíz
│   ├── styles/
│   │   ├── theme.css              # 🎨 Variables de tema y colores
│   │   └── fonts.css              # 📝 Importación de fuentes
│   └── ...
├── .gitignore                     # Archivos ignorados por git
├── CODE_OF_CONDUCT.md             # Código de conducta
├── CONTRIBUTING.md                # Guía de contribución
├── DEPLOYMENT.md                  # Guía de despliegue
├── LICENSE                        # Licencia MIT
├── package.json                   # Dependencias y scripts
├── QUICK_START.md                 # Inicio rápido
├── README.md                      # Documentación principal
├── SETUP_GITHUB.sh                # Script de setup para GitHub
├── vite.config.ts                 # Configuración de Vite
└── ...
```

## 🧩 Componentes Principales

### Navbar.tsx
**Propósito:** Navegación principal sticky con menú móvil

**Características:**
- Navegación fija al hacer scroll
- Menú hamburguesa responsive
- Smooth scroll a secciones
- Animaciones de entrada

**Dependencias:**
- `lucide-react` (iconos Menu, X)
- `motion/react` (animaciones)

---

### Hero.tsx
**Propósito:** Sección de hero impactante con llamada a la acción

**Características:**
- Imagen de fondo con overlay
- Título principal animado
- Scroll indicator
- Botón CTA

**Props:** Ninguna (configuración interna)

---

### CaseCard.tsx
**Propósito:** Tarjeta para mostrar un caso de paleopatología

**Props:**
```typescript
interface CaseCardProps {
  title: string;           // Nombre del caso
  description: string;     // Descripción breve
  imageUrl: string;        // URL de la imagen
  period: string;          // Período histórico
  onClick: () => void;     // Handler al hacer clic
  index: number;           // Para animaciones escalonadas
}
```

**Características:**
- Hover effects
- Animación de reveal al scroll
- Imagen con zoom en hover

---

### CaseModal.tsx
**Propósito:** Modal con información detallada de un caso

**Props:**
```typescript
interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  period: string;
  imageUrl: string;
  simpleExplanation: string;      // Para público general
  scientificExplanation: string;   // Técnica
  characteristics: string[];       // Lista de características
}
```

**Características:**
- Backdrop con blur
- Scroll interno
- Dos niveles de explicación
- Lista de características

---

### Quiz.tsx
**Propósito:** Quiz educativo interactivo

**Estado interno:**
```typescript
- currentQuestion: number    // Pregunta actual
- selectedAnswer: number     // Respuesta seleccionada
- showResult: boolean        // Mostrar resultado
- score: number             // Puntuación
- quizCompleted: boolean    // Quiz terminado
```

**Características:**
- Preguntas con imágenes
- Feedback inmediato
- Barra de progreso
- Reinicio del quiz

---

### Timeline.tsx
**Propósito:** Línea de tiempo de enfermedades en la historia

**Características:**
- Layout alternado (izq/der)
- Animación al scroll
- Hover effects
- Responsive (vertical en móvil)

---

### Footer.tsx
**Propósito:** Pie de página con navegación y contacto

**Características:**
- Links de navegación
- Información de contacto
- Créditos
- Grid responsive

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
/* Colores principales */
--background: #F5F1E8      /* Beige arena (fondo) */
--foreground: #2C1810      /* Marrón oscuro (texto) */
--accent: #C1440E          /* Terracota (acentos) */
--card: #FFFFFF            /* Blanco (tarjetas) */

/* Colores secundarios */
--secondary: #E5DCC8       /* Beige claro */
--muted: #D4C9B3          /* Arena */
--muted-foreground: #6B5D52 /* Gris cálido */

/* Colores temáticos */
--bone-light: #EDE7DC     /* Color hueso */
--terracotta: #C1440E     /* Terracota */
--sienna: #8B4513         /* Siena */
--earth-dark: #2C1810     /* Tierra oscura */
```

### Tipografía

```css
/* Fuentes */
--font-display: 'Cormorant Garamond', serif  /* Títulos */
--font-body: 'Work Sans', sans-serif         /* Cuerpo */

/* Tamaños base */
- Mínimo: 16px (--font-size)
- Headings: responsive según elemento
- Line height: 1.5 (legibilidad)
```

### Espaciado

Basado en el sistema de Tailwind:
- `gap-3`: 0.75rem
- `gap-4`: 1rem
- `gap-6`: 1.5rem
- `gap-8`: 2rem
- `gap-12`: 3rem

### Breakpoints

```css
/* Mobile first */
sm: 640px    /* Tablet pequeña */
md: 768px    /* Tablet */
lg: 1024px   /* Desktop */
xl: 1280px   /* Desktop grande */
```

---

## 📦 Gestión de Estado

El proyecto usa **React State Hooks** para gestión de estado local:

### En App.tsx
```typescript
const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
const [expandedInfo, setExpandedInfo] = useState(false);
```

### En Quiz.tsx
```typescript
const [currentQuestion, setCurrentQuestion] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
const [showResult, setShowResult] = useState(false);
const [score, setScore] = useState(0);
const [quizCompleted, setQuizCompleted] = useState(false);
```

**Razón:** No se usa estado global (Redux, Context) porque:
- Estado simple y local
- No hay comunicación compleja entre componentes
- Props drilling mínimo
- Mejor rendimiento

---

## 🎭 Animaciones

Todas las animaciones usan **Motion (Framer Motion)**:

### Patrones comunes

**Reveal al scroll:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
```

**Hover:**
```typescript
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

**Entrada escalonada:**
```typescript
transition={{ delay: index * 0.1, duration: 0.6 }}
```

---

## 📊 Datos

### Estructura de Caso

```typescript
interface CaseData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  period: string;
  simpleExplanation: string;
  scientificExplanation: string;
  characteristics: string[];
}
```

### Fuente de Imágenes

Todas las imágenes vienen de **Unsplash**:
- No requieren API key
- Alta calidad
- Uso educativo permitido
- URLs directas

---

## ♿ Accesibilidad

### Implementaciones

✅ **Contraste WCAG AA:**
- Texto principal: 4.5:1 mínimo
- Texto grande: 3:1 mínimo

✅ **Navegación por teclado:**
- Todos los botones accesibles
- Indicadores de focus visibles
- Orden lógico de tabs

✅ **Semántica HTML:**
- Headings jerárquicos (h1 → h2 → h3)
- Tags semánticos (nav, section, footer)
- Alt text en imágenes

✅ **Responsive:**
- Mobile-first
- Breakpoints lógicos
- Touch-friendly (44px+ targets)

---

## 🔧 Configuración

### Vite (vite.config.ts)

```typescript
export default defineConfig({
  plugins: [react()],
  // Otras configuraciones automáticas
})
```

### Tailwind (theme.css)

Variables CSS importadas automáticamente por Tailwind v4.

### TypeScript

Tipado estricto en todos los componentes.

---

## 📝 Convenciones de Código

### Nomenclatura

- **Componentes:** PascalCase (`CaseCard.tsx`)
- **Variables:** camelCase (`selectedCase`)
- **Constantes:** UPPER_CASE o camelCase
- **Interfaces:** PascalCase con sufijo Props si aplica

### Estructura de Componente

```typescript
// 1. Imports
import { useState } from 'react';
import { motion } from 'motion/react';

// 2. Interfaces/Types
interface ComponentProps {
  // ...
}

// 3. Componente
export function Component({ props }: ComponentProps) {
  // 3a. State
  const [state, setState] = useState();
  
  // 3b. Handlers
  const handleClick = () => {};
  
  // 3c. Render
  return <div></div>;
}
```

### Estilos

- Inline Tailwind classes
- Style prop solo para fuentes (por diseño)
- No CSS modules (todo Tailwind)

---

## 🚀 Performance

### Optimizaciones

✅ **Code Splitting:** Automático con Vite
✅ **Tree Shaking:** Elimina código no usado
✅ **Lazy Loading:** Imágenes con loading="lazy" implícito
✅ **Minificación:** Build de producción

### Consideraciones

- Imágenes de Unsplash ya optimizadas
- Motion tree-shakes animaciones no usadas
- Tailwind purge automático en v4

---

## 🧪 Testing (Futuro)

Actualmente no hay tests, pero se recomienda:

```bash
# Instalar Vitest
pnpm add -D vitest @testing-library/react

# Testing E2E
pnpm add -D playwright
```

---

## 📚 Recursos Adicionales

- [Documentación Vite](https://vitejs.dev)
- [Documentación React](https://react.dev)
- [Documentación Tailwind](https://tailwindcss.com)
- [Documentación Motion](https://motion.dev)
- [Unsplash API](https://unsplash.com/developers)

---

**Última actualización:** Abril 2026
