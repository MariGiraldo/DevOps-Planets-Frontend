# DevOps Planet - Frontend

Una aplicación educativa de juego basada en niveles para aprender DevOps.

## Requisitos

- Node.js v18 o superior
- npm o yarn

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

## Construcción

```bash
npm run build
```

## Vista previa de producción

```bash
npm run preview
```

## Estructura del Proyecto

- **src/components/** - Componentes reutilizables (Button, Card, Navbar, Alien)
- **src/pages/** - Páginas de la aplicación (Login, Registro, Niveles, etc.)
- **src/routes/** - Configuración de rutas
- **src/services/** - Servicios de API
- **src/assets/** - Imágenes e iconos

## Rutas Disponibles

- `/` - Página de bienvenida
- `/login` - Iniciar sesión
- `/registro` - Crear cuenta
- `/mundo-niveles` - Seleccionar nivel
- `/nivel1` a `/nivel5` - Niveles del juego
- `/victoria` - Página de victoria

## Notas

- El proyecto utiliza React Router para la navegación
- Los estilos están en CSS puro en cada componente
- La API base está configurada como variable de entorno `VITE_API_URL`
