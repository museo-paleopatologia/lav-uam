# Museo Virtual de Paleopatología

Un museo virtual interactivo que explora la historia de la enfermedad en la humanidad a través del estudio de restos arqueológicos. Proyecto educativo y divulgativo sobre paleopatología.

![Paleopatología](https://images.unsplash.com/photo-1776202176510-80871355f03e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600)

## 🎯 Objetivo

Crear una experiencia educativa accesible, visual e interactiva que transforme el conocimiento científico complejo sobre paleopatología en contenido comprensible para estudiantes, docentes y público general.

## ✨ Características

- **Hero impactante** con imágenes arqueológicas de alta calidad
- **Colección de casos** interactiva con 4 patologías principales:
  - Trepanación craneal
  - Artritis en restos antiguos
  - Tuberculosis espinal (Mal de Pott)
  - Fracturas y traumatismos
- **Quiz educativo** interactivo para poner a prueba conocimientos
- **Línea de tiempo** histórica de enfermedades
- **Modales detallados** con explicaciones simples y científicas
- **Diseño totalmente responsive** (mobile-first)
- **Animaciones sutiles** que mejoran la experiencia de usuario
- **Alta accesibilidad** (WCAG AA)

## 🎨 Diseño

### Estética
- **Tipo**: Museo arqueológico contemporáneo
- **Paleta**: Tonos neutros (beige arena #F5F1E8) con acentos terracota (#C1440E)
- **Tipografía**:
  - Títulos: Cormorant Garamond (serif elegante)
  - Cuerpo: Work Sans (sans-serif legible)

### Accesibilidad
- Contraste alto de colores (WCAG AA)
- Tipografía mínimo 16px
- Navegación usable con teclado
- Jerarquía clara de headings
- Imágenes con alt text descriptivo

## 🛠️ Tecnologías

- **React 18.3.1** - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utility-first
- **Motion (Framer Motion)** - Animaciones fluidas
- **Vite** - Build tool y dev server
- **Lucide React** - Iconografía
- **Unsplash** - Imágenes de alta calidad

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/paleopatologia-museo-virtual.git

# Entrar al directorio
cd paleopatologia-museo-virtual

# Instalar dependencias con pnpm (recomendado)
pnpm install

# O con npm
npm install
```

## 🚀 Uso

```bash
# Modo desarrollo
pnpm dev

# Compilar para producción
pnpm build
```

El proyecto se abrirá en `http://localhost:5173` por defecto.

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx          # Navegación sticky
│   │   ├── Hero.tsx            # Sección principal
│   │   ├── CaseCard.tsx        # Tarjeta de caso
│   │   ├── CaseModal.tsx       # Modal detallado
│   │   ├── Quiz.tsx            # Quiz interactivo
│   │   ├── Timeline.tsx        # Línea temporal
│   │   └── Footer.tsx          # Pie de página
│   └── App.tsx                 # Componente principal
├── styles/
│   ├── theme.css               # Variables de tema
│   └── fonts.css               # Importación de fuentes
└── ...
```

## 🎓 Uso Educativo

Este proyecto está diseñado específicamente para:

- **Estudiantes**: Aprender sobre paleopatología de forma visual e interactiva
- **Docentes**: Utilizar como material didáctico en aulas
- **Público general**: Descubrir la historia de la enfermedad humana
- **Investigadores**: Divulgar conocimiento científico de forma accesible

### Secciones educativas

1. **¿Qué es la Paleopatología?** - Introducción conceptual
2. **Colección de Casos** - Ejemplos reales con explicaciones duales
3. **Quiz Interactivo** - Evaluación de conocimientos
4. **Línea de Tiempo** - Contexto histórico de enfermedades
5. **Recursos Educativos** - Material complementario

## 🌐 Despliegue

Este proyecto está optimizado para desplegarse en:

- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- Cualquier hosting que soporte aplicaciones React

### Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Créditos

- **Imágenes**: [Unsplash](https://unsplash.com)
- **Iconos**: [Lucide](https://lucide.dev)
- **Fuentes**: [Google Fonts](https://fonts.google.com)

## 📧 Contacto

Para preguntas o sugerencias sobre el proyecto:
- Email: info@paleopatologia.edu
- Issues: [GitHub Issues](https://github.com/TU_USUARIO/paleopatologia-museo-virtual/issues)

---

**Nota**: Este es un proyecto educativo y divulgativo con fines pedagógicos. Las imágenes y contenido están destinados exclusivamente para educación e investigación.

Desarrollado con ❤️ para hacer la ciencia más accesible.
