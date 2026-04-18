#!/bin/bash

# Script de configuración para GitHub
# Este script te ayuda a subir el proyecto a GitHub rápidamente

echo "🚀 Configuración de GitHub para Paleopatología Museo Virtual"
echo "============================================================"
echo ""

# Verificar si ya es un repositorio git
if [ -d .git ]; then
    echo "⚠️  Este directorio ya es un repositorio git."
    read -p "¿Deseas continuar de todas formas? (s/n): " continue
    if [ "$continue" != "s" ]; then
        echo "Cancelado."
        exit 0
    fi
else
    # Inicializar repositorio
    echo "📦 Inicializando repositorio git..."
    git init
    echo "✅ Repositorio inicializado"
fi

echo ""
echo "Ahora necesitas crear un repositorio en GitHub:"
echo "1. Ve a https://github.com/new"
echo "2. Nombre: paleopatologia-museo-virtual"
echo "3. Descripción: Museo virtual interactivo sobre paleopatología"
echo "4. Público o Privado (tu elección)"
echo "5. NO marques 'Initialize with README' (ya tenemos uno)"
echo "6. NO añadas .gitignore ni LICENSE (ya tenemos)"
echo ""
read -p "Presiona ENTER cuando hayas creado el repositorio en GitHub..."

echo ""
read -p "Ingresa tu nombre de usuario de GitHub: " github_user
echo ""

# Actualizar URLs en archivos
echo "📝 Actualizando URLs en archivos..."
sed -i "s/TU_USUARIO/$github_user/g" README.md
sed -i "s/TU_USUARIO/$github_user/g" package.json
sed -i "s/TU_USUARIO/$github_user/g" DEPLOYMENT.md
sed -i "s/TU_USUARIO/$github_user/g" QUICK_START.md
echo "✅ URLs actualizadas"

# Configurar git
echo ""
echo "⚙️  Configuración de git local..."
read -p "Tu nombre (para commits): " user_name
read -p "Tu email (para commits): " user_email

git config user.name "$user_name"
git config user.email "$user_email"
echo "✅ Git configurado"

# Añadir archivos
echo ""
echo "📁 Añadiendo archivos al repositorio..."
git add .
echo "✅ Archivos añadidos"

# Commit inicial
echo ""
echo "💾 Creando commit inicial..."
git commit -m "🎉 Inicio del proyecto: Museo Virtual de Paleopatología

- Implementación completa del museo virtual interactivo
- Diseño responsive y accesible (WCAG AA)
- 4 casos de paleopatología documentados
- Quiz educativo interactivo
- Línea de tiempo histórica
- Componentes React con TypeScript
- Estilos con Tailwind CSS v4
- Animaciones con Motion (Framer Motion)

Proyecto educativo y divulgativo sobre la historia de la enfermedad
en la humanidad a través del estudio de restos arqueológicos."
echo "✅ Commit creado"

# Añadir remote
echo ""
echo "🔗 Conectando con GitHub..."
git branch -M main
git remote add origin "https://github.com/$github_user/paleopatologia-museo-virtual.git"
echo "✅ Remote añadido"

# Push
echo ""
echo "🚀 Subiendo código a GitHub..."
read -p "¿Deseas hacer push ahora? (s/n): " do_push

if [ "$do_push" = "s" ]; then
    git push -u origin main
    echo ""
    echo "🎉 ¡Listo! Tu proyecto está en GitHub"
    echo ""
    echo "🔗 Repositorio: https://github.com/$github_user/paleopatologia-museo-virtual"
    echo ""
    echo "📋 Próximos pasos:"
    echo "   1. Edita el README si necesitas personalizar algo más"
    echo "   2. Configura GitHub Pages o despliega en Vercel/Netlify"
    echo "   3. Invita colaboradores si es un proyecto de equipo"
    echo ""
    echo "📚 Guías útiles:"
    echo "   - QUICK_START.md: Inicio rápido"
    echo "   - DEPLOYMENT.md: Guía de despliegue"
    echo "   - CONTRIBUTING.md: Guía de contribución"
else
    echo ""
    echo "⏸️  Push pospuesto. Cuando estés listo, ejecuta:"
    echo "   git push -u origin main"
fi

echo ""
echo "✨ ¡Gracias por usar el Museo Virtual de Paleopatología!"
