# Guía de Contribución

¡Gracias por tu interés en contribuir a este proyecto! 🎉

## Cómo Contribuir

### Reportar Bugs

1. Verifica que el bug no haya sido reportado antes
2. Abre un issue con una descripción clara
3. Incluye pasos para reproducir el problema
4. Añade capturas de pantalla si es posible

### Sugerir Mejoras

1. Abre un issue describiendo la mejora
2. Explica por qué sería útil
3. Proporciona ejemplos si es posible

### Pull Requests

1. Fork el repositorio
2. Crea una rama desde `main`:
   ```bash
   git checkout -b feature/mi-nueva-feature
   ```
3. Realiza tus cambios siguiendo las guías de estilo
4. Asegúrate de que los tests pasen:
   ```bash
   npm test
   npm run e2e
   ```
5. Commit tus cambios con mensajes descriptivos:
   ```bash
   git commit -m "feat: añadir nueva funcionalidad X"
   ```
6. Push a tu fork:
   ```bash
   git push origin feature/mi-nueva-feature
   ```
7. Abre un Pull Request

## Guías de Estilo

### TypeScript

- Usa TypeScript estricto
- Documenta funciones públicas con JSDoc
- Nombra variables y funciones de forma descriptiva
- Usa interfaces para tipos complejos

### Angular

- Usa Standalone Components
- Implementa Signals cuando sea apropiado
- Sigue la guía de estilo oficial de Angular
- Mantén componentes pequeños y enfocados

### CSS/Tailwind

- Usa clases de Tailwind siempre que sea posible
- Mantén estilos custom en archivos SCSS separados
- Usa variables CSS para temas

### Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `style:` cambios de formato
- `refactor:` refactorización de código
- `test:` añadir o modificar tests
- `chore:` tareas de mantenimiento

## Código de Conducta

- Sé respetuoso con todos los colaboradores
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto

## ¿Necesitas Ayuda?

No dudes en abrir un issue si tienes preguntas o necesitas ayuda.

¡Gracias por contribuir! 🚀

