# ✅ Checklist para Publicar en GitHub

## 📋 Antes de Publicar

- [x] Código completo y funcional
- [x] README.md creado con documentación
- [x] .gitignore configurado
- [x] LICENSE añadida (MIT)
- [x] CONTRIBUTING.md con guía de contribución
- [x] CODE_OF_CONDUCT.md
- [x] Templates de Issues y PRs
- [x] package.json actualizado con metadata
- [x] Documentación completa (QUICK_START, DEPLOYMENT, etc.)

## 🚀 Pasos para Publicar

### Opción 1: Usar el Script Automático (Recomendado)

```bash
./SETUP_GITHUB.sh
```

Este script te guiará paso a paso y:
- ✅ Inicializa git si no existe
- ✅ Actualiza URLs con tu usuario de GitHub
- ✅ Configura git local
- ✅ Crea commit inicial
- ✅ Conecta con GitHub
- ✅ Hace push

### Opción 2: Manual

#### 1. Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre: `paleopatologia-museo-virtual`
3. Descripción: `Museo virtual interactivo sobre paleopatología - Proyecto educativo`
4. **Público** (para que sea accesible)
5. **NO** marques:
   - ❌ Initialize with README
   - ❌ Add .gitignore
   - ❌ Choose a license

#### 2. Actualizar URLs

Reemplaza `TU_USUARIO` con tu usuario de GitHub en:
- [ ] README.md
- [ ] package.json
- [ ] DEPLOYMENT.md
- [ ] QUICK_START.md

```bash
# Automático (Linux/Mac)
sed -i 's/TU_USUARIO/tu_usuario_github/g' README.md package.json DEPLOYMENT.md QUICK_START.md

# Manual: Buscar y reemplazar en cada archivo
```

#### 3. Inicializar Git

```bash
git init
git add .
git commit -m "🎉 Inicio del proyecto: Museo Virtual de Paleopatología"
```

#### 4. Conectar con GitHub

```bash
git branch -M main
git remote add origin https://github.com/TU_USUARIO/paleopatologia-museo-virtual.git
git push -u origin main
```

## 🎯 Después de Publicar

### Configurar GitHub Repository

1. **Settings > General:**
   - [ ] Añadir descripción del proyecto
   - [ ] Añadir topics: `paleopatologia`, `educacion`, `react`, `museum`, `archaeology`, `science`
   - [ ] Añadir website (cuando despliegues)

2. **Settings > Features:**
   - [x] Issues activados
   - [x] Discussions (opcional, para comunidad)
   - [ ] Projects (opcional, para roadmap)

3. **Settings > Pages:**
   - [ ] Configurar si usas GitHub Pages
   - Source: Deploy from branch `gh-pages` (si aplica)

### Desplegar el Sitio

Elige una plataforma:

#### Vercel (Más fácil)
```bash
npm i -g vercel
vercel
```

#### Netlify
1. Conecta tu repo de GitHub
2. Build: `pnpm build`
3. Publish: `dist`

#### GitHub Pages
Ver [DEPLOYMENT.md](DEPLOYMENT.md)

### Proteger Branch Main

Settings > Branches > Add rule:
- Branch name pattern: `main`
- [x] Require pull request reviews before merging
- [x] Require status checks to pass

## 📣 Promoción (Opcional)

- [ ] Añadir el proyecto a tu perfil de GitHub
- [ ] Compartir en redes académicas
- [ ] Añadir a listas de proyectos educativos
- [ ] Contactar instituciones educativas
- [ ] Publicar en comunidades de divulgación científica

## 🎓 Para Uso Académico

Si es un proyecto de clase o investigación:

1. **Añadir en README:**
   - Institución académica
   - Curso/asignatura
   - Profesor/supervisor
   - Fecha

2. **Citar fuentes:**
   - Referencias científicas
   - Crédito a imágenes
   - Datos utilizados

3. **Licencia:**
   - Ya incluye MIT
   - Apropiada para uso educativo

## 🔍 Verificación Final

Antes de hacer público:

- [ ] Navegar todo el sitio localmente (`pnpm dev`)
- [ ] Build de producción sin errores (`pnpm build`)
- [ ] Preview funciona (`pnpm preview`)
- [ ] No hay información personal sensible
- [ ] No hay API keys hardcodeadas
- [ ] Imágenes cargan correctamente
- [ ] Responsive en móvil, tablet, desktop
- [ ] README claro y completo
- [ ] Links funcionan

## 📧 Contacto y Soporte

Configura en el repo:
- Email de contacto en README
- Issue templates activos
- Contributing guidelines claras

## 🎉 ¡Listo!

Tu proyecto está listo para el mundo. URLs que tendrás:

- **Repositorio:** `https://github.com/TU_USUARIO/paleopatologia-museo-virtual`
- **Sitio web:** `https://tu-proyecto.vercel.app` (o similar)
- **Issues:** `https://github.com/TU_USUARIO/paleopatologia-museo-virtual/issues`

---

**¿Necesitas ayuda?**
Lee la documentación completa en los archivos:
- `QUICK_START.md` - Inicio rápido
- `DEPLOYMENT.md` - Guía de despliegue
- `CONTRIBUTING.md` - Guía de contribución
- `PROJECT_STRUCTURE.md` - Arquitectura del proyecto
