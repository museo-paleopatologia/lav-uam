# 👋 ¡Bienvenido al Museo Virtual de Paleopatología!

## 🎯 ¿Qué es este proyecto?

Un museo virtual interactivo completo sobre paleopatología (estudio de enfermedades en restos antiguos) diseñado para educación y divulgación científica.

## 🚀 ¿Qué hacer ahora?

### ✅ Paso 1: Verificar que funciona

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

Abre http://localhost:5173 y verifica que todo funciona.

### ✅ Paso 2: Publicar en GitHub

**Opción Fácil - Script Automático:**
```bash
./SETUP_GITHUB.sh
```

**Opción Manual:**
Lee `CHECKLIST_GITHUB.md` para instrucciones paso a paso.

### ✅ Paso 3: Desplegar en la web

Una vez en GitHub:
```bash
# Opción Vercel (recomendado)
npm i -g vercel
vercel
```

Ver `DEPLOYMENT.md` para más opciones (Netlify, GitHub Pages).

## 📚 Documentación Completa

| Archivo | Qué contiene |
|---------|-------------|
| **README.md** | Documentación principal del proyecto |
| **QUICK_START.md** | Inicio rápido en 5 minutos |
| **CHECKLIST_GITHUB.md** | ✅ Pasos para publicar en GitHub |
| **DEPLOYMENT.md** | Guía de despliegue en Vercel, Netlify, etc. |
| **CONTRIBUTING.md** | Guía para contribuir al proyecto |
| **PROJECT_STRUCTURE.md** | Arquitectura y organización del código |
| **CODE_OF_CONDUCT.md** | Código de conducta |
| **SETUP_GITHUB.sh** | Script automático para GitHub |

## 🎨 Características del Proyecto

✨ **Diseño completo:**
- Hero impactante con imagen arqueológica
- 4 casos de paleopatología documentados
- Quiz interactivo educativo
- Línea de tiempo histórica de enfermedades
- Navegación responsive y accesible
- Modales con información detallada

🎯 **Tecnologías:**
- React 18 + TypeScript
- Tailwind CSS v4
- Motion (Framer Motion)
- Vite

♿ **Accesibilidad:**
- Contraste WCAG AA
- Navegación por teclado
- Responsive (mobile-first)
- Tipografía legible

## 🔧 Personalización Rápida

### Cambiar colores

Edita `src/styles/theme.css`:
```css
--accent: #C1440E;  /* Tu color principal */
```

### Añadir más casos

Edita `src/app/App.tsx` en el array `casesData`.

### Cambiar imágenes

Usa Unsplash o sustituye las URLs en los componentes.

## 📝 Antes de Publicar

**¡IMPORTANTE!** Reemplaza `TU_USUARIO` con tu usuario de GitHub en:
- README.md
- package.json
- DEPLOYMENT.md
- QUICK_START.md

Esto lo hace automáticamente `SETUP_GITHUB.sh` o puedes hacerlo manual.

## 🎓 Para Uso Educativo

Este proyecto es ideal para:
- Presentaciones académicas
- Divulgación científica
- Portfolios de desarrollo
- Proyectos de clase
- Recursos educativos

## 🆘 ¿Necesitas ayuda?

1. **Problemas técnicos:** Lee `QUICK_START.md`
2. **Despliegue:** Lee `DEPLOYMENT.md`
3. **Contribuir:** Lee `CONTRIBUTING.md`
4. **Estructura código:** Lee `PROJECT_STRUCTURE.md`

## ✨ Próximos Pasos Sugeridos

1. [ ] Probar localmente
2. [ ] Publicar en GitHub
3. [ ] Desplegar en Vercel/Netlify
4. [ ] Compartir con comunidad educativa
5. [ ] Añadir más casos de paleopatología
6. [ ] Traducir a otros idiomas (opcional)

## 🙏 Créditos

- **Imágenes:** Unsplash
- **Iconos:** Lucide React
- **Fuentes:** Google Fonts (Cormorant Garamond, Work Sans)

---

**¡Todo listo para compartir tu museo virtual con el mundo!** 🌍

Si tienes dudas, revisa la documentación completa en los archivos mencionados arriba.
