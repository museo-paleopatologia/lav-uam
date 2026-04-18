# Guía de Contribución

¡Gracias por tu interés en contribuir al Museo Virtual de Paleopatología! Este documento te guiará a través del proceso.

## 🌟 Formas de Contribuir

- 🐛 Reportar bugs
- 💡 Sugerir nuevas características
- 📝 Mejorar la documentación
- 🎨 Mejorar el diseño o UX
- 🔬 Añadir nuevos casos de paleopatología
- 🌍 Traducir el contenido a otros idiomas
- ✅ Mejorar la accesibilidad

## 📋 Antes de Empezar

1. Revisa los [Issues existentes](https://github.com/TU_USUARIO/paleopatologia-museo-virtual/issues) para evitar duplicados
2. Lee el código de conducta
3. Familiarízate con la estructura del proyecto

## 🚀 Proceso de Contribución

### 1. Fork y Clona

```bash
# Fork el repositorio en GitHub, luego:
git clone https://github.com/TU_USUARIO/paleopatologia-museo-virtual.git
cd paleopatologia-museo-virtual
```

### 2. Crea una Rama

```bash
# Para nueva característica
git checkout -b feature/nombre-caracteristica

# Para corrección de bug
git checkout -b fix/nombre-bug

# Para documentación
git checkout -b docs/descripcion
```

### 3. Realiza tus Cambios

- Escribe código limpio y legible
- Sigue las convenciones de estilo existentes
- Mantén la accesibilidad (WCAG AA mínimo)
- Asegura que el diseño sea responsive
- Comenta código complejo cuando sea necesario

### 4. Prueba tus Cambios

```bash
# Instala dependencias
pnpm install

# Ejecuta en modo desarrollo
pnpm dev

# Verifica que todo funcione correctamente
```

### 5. Commit

```bash
# Añade tus cambios
git add .

# Commit con mensaje descriptivo
git commit -m "tipo: descripción breve

Descripción más detallada del cambio si es necesario.
"
```

**Tipos de commit:**
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan funcionalidad)
- `refactor`: Refactorización de código
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento

### 6. Push y Pull Request

```bash
git push origin nombre-de-tu-rama
```

Luego abre un Pull Request en GitHub con:
- Título descriptivo
- Descripción detallada de los cambios
- Capturas de pantalla (si aplica)
- Referencias a issues relacionados

## 📝 Estándares de Código

### React/TypeScript
- Usa TypeScript para todos los componentes
- Componentes funcionales con hooks
- Props tipadas con interfaces
- Nombres descriptivos para variables y funciones

### Estilos
- Usa Tailwind CSS para estilos
- Mantén la paleta de colores del tema
- Variables CSS en `theme.css` para valores reutilizables
- Asegura contraste adecuado (WCAG AA)

### Accesibilidad
- Todos los elementos interactivos deben ser accesibles por teclado
- Usa etiquetas semánticas HTML5
- Proporciona `alt` text descriptivo para imágenes
- Mantén jerarquía de headings (h1, h2, h3...)
- Contraste mínimo 4.5:1 para texto normal

## 🎯 Áreas de Mejora Prioritarias

1. **Contenido educativo**: Añadir más casos de paleopatología
2. **Internacionalización**: Soporte multiidioma
3. **Interactividad**: Más elementos interactivos educativos
4. **Recursos**: Material descargable para docentes
5. **Performance**: Optimizaciones de carga

## 📚 Añadir Nuevos Casos

Para añadir un nuevo caso de paleopatología:

1. Añade el objeto en `casesData` en `App.tsx`:
```typescript
{
  id: number,
  title: string,
  description: string,
  imageUrl: string,
  period: string,
  simpleExplanation: string,
  scientificExplanation: string,
  characteristics: string[]
}
```

2. Asegúrate de que:
   - La imagen sea de alta calidad
   - La explicación simple sea clara para público general
   - La explicación científica sea rigurosa
   - Las características sean observables y específicas

## ❓ Preguntas

Si tienes preguntas, puedes:
- Abrir un [Issue](https://github.com/TU_USUARIO/paleopatologia-museo-virtual/issues)
- Contactar por email: info@paleopatologia.edu

## 🙏 Reconocimiento

Todos los contribuidores serán reconocidos en el README del proyecto.

¡Gracias por hacer la ciencia más accesible! 🎓
