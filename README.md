# Market Fruits

Proyecto de ecommerce de frutas desarrollado en React + Vite + Zustand en un Monorepo estructurado con PNPM Workspaces.

---

## Instalación y ejecución local

1. Clona el repositorio:

```bash
git clone git@github.com:luddypuerta/market-fruits.git
cd market-fruits
```

2. Instala las dependencias:

```bash
pnpm install
```

3. Construye la librería compartida (`ui-lib`):

```bash
pnpm --filter @libluddy/ui-lib build
```

4. Ejecuta el proyecto en local:

```bash
pnpm --filter web dev
```

La aplicación estará disponible en `http://localhost:5005`.

---

## 🛠️ Proceso de Despliegue y Configuración de CI/CD

La aplicación está desplegada utilizando **AWS Amplify** con una estrategia de CI/CD basada en GitHub.  
Cada `push` a la rama `main` genera automáticamente un nuevo build y despliegue.

- **Plataforma usada**: AWS Amplify Hosting
- **Flujo de CI/CD**:
  - Instalación de dependencias
  - Build de librerías internas
  - Build del frontend
  - Deploy automático al entorno de producción

**Archivo `amplify.yml` de configuración**:

```yaml
version: 1
applications:
  - appRoot: apps/web
    frontend:
      phases:
        preBuild:
          commands:
            - npm install -g pnpm@8.15.6
            - pnpm install
            - pnpm --filter @libluddy/ui-lib build
        build:
          commands:
            - pnpm --filter web build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
          - ../../node_modules/**/*
          - ../../packages/ui-lib/node_modules/**/*
```

**Justificación**:
- Se eligió **AWS Amplify** por su integración nativa con GitHub, facilidad de despliegue de monorepositorios y automatización de CI/CD sin necesidad de configurar infraestructura manualmente.

---

## 📚 Decisiones técnicas

### Gestión del estado
- **Zustand**: Ligero, reactivo y fácil de usar para gestionar el carrito de compras y estados de la UI.

### Patrones de diseño
- **Atomic Design**: Organización de componentes por átomos y organismos en la librería `ui-lib`.
- **Monorepo (PNPM Workspaces)**: Se separa la lógica de componentes reutilizables (`@libluddy/ui-lib`) y la aplicación principal (`apps/web`).

### Estructura del proyecto
```
market-fruits/
├── apps/
│   └── web/        # Aplicación principal (frontend React + Vite)
├── packages/
│   └── ui-lib/     # Librería de componentes compartidos
├── amplify.yml     # Configuración de CI/CD para AWS Amplify
├── pnpm-workspace.yaml
└── README.md
```

---

## 🔗 Enlace de producción

- [Aplicación desplegada en AWS Amplify](https://main.d15730ajv1iokl.amplifyapp.com)

---

