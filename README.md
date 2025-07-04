# Il Vero Ristorante

Aplicación web fullstack para un restaurante italiano que permite ver el menú, gestionar platos desde un panel de administración, y permitir a los usuarios dejar reseñas.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías empleadas](#tecnologías-empleadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [Comandos útiles](#comandos-útiles)
- [Ejemplo de uso de la API](#ejemplo-de-uso-de-la-api)
- [Acceso al Panel de Administración](#acceso-al-panel-de-administración)
- [Notas y buenas prácticas](#notas-y-buenas-prácticas)
- [Contribuir](#contribuir)

## Descripción

Este proyecto permite:
- **Catálogo de platos** organizados por categorías
- **Panel de administración** protegido para gestionar platos y usuarios
- **Gestión completa de platos** (CRUD - Crear, Leer, Actualizar, Eliminar)
- **Sistema de reseñas** donde los usuarios pueden calificar y comentar platos
- **Autenticación de usuarios** con JWT
- **Diseño responsive** e interfaz moderna

## Características

- Catálogo de platos organizados por categorías
- Panel de administración protegido
- Gestión completa de platos (CRUD)
- Sistema de reseñas y calificaciones
- Autenticación de usuarios
- Diseño responsive
- Interfaz moderna y amigable

## Tecnologías empleadas

| Tecnología     | Ubicación   | ¿Para qué se usa?                                      |
|----------------|-------------|-------------------------------------------------------|
| React          | Frontend    | Construir la interfaz de usuario                      |
| Axios          | Frontend    | Hacer peticiones HTTP al backend                      |
| Tailwind CSS   | Frontend    | Estilizar la interfaz de manera rápida y moderna      |
| Node.js        | Backend     | Ejecutar JavaScript en el servidor                    |
| Express        | Backend     | Crear API y gestionar rutas HTTP                      |
| MongoDB        | Backend     | Almacenar datos persistentes                          |
| JWT            | Backend     | Autenticación y autorización de usuarios              |
| bcrypt         | Backend     | Hashear contraseñas para mayor seguridad              |
| Nodemon        | Backend     | Recargar el servidor automáticamente en desarrollo    |

## Estructura del proyecto

```
APIS_UADE/
│
├── backend/           # Backend Node.js/Express
│   ├── controllers/   # Controladores de la API
│   ├── models/        # Modelos de MongoDB
│   ├── routes/        # Rutas de la API
│   ├── scripts/       # Scripts útiles
│   ├── src/           # Código fuente del servidor
│   ├── public/        # Archivos estáticos
│   ├── package.json   # Dependencias del backend
│   └── ...
│
├── src/               # Frontend React
│   ├── components/    # Componentes React
│   ├── layouts/       # Componentes de layout
│   ├── services/      # Servicios API
│   ├── config/        # Configuración
│   ├── assets/        # Recursos estáticos
│   ├── App.jsx        # Componente principal
│   └── main.jsx       # Punto de entrada
│
├── package.json       # Dependencias del frontend
├── README.md          # Este archivo
└── ...
```

## Instalación y ejecución

### Requisitos previos

- Node.js (v14 o superior)
- MongoDB / Atlas
- npm

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/APIS_UADE.git
cd APIS_UADE
```

### 2. Instala dependencias del frontend

```bash
npm install
```

### 3. Instala dependencias del backend

```bash
cd backend
npm install
```

### 4. Configura las variables de entorno

En la carpeta `backend/`, crea un archivo `.env` con:

```
MONGO_URI=mongodb://localhost:27017/il_vero_ristorante
JWT_SECRET=tu_clave_secreta_muy_segura
PORT=5000
```

### 5. Ejecuta el backend

```bash
npm run dev
```

### 6. Ejecuta el frontend

En otra terminal, desde la raíz del proyecto:

```bash
npm run dev
```

### 7. Crear usuario administrador

```bash
cd backend
npm run create-admin
```

## Variables de entorno

En la carpeta `backend/`, crea un archivo `.env` con:

```
MONGO_URI=mongodb://localhost:27017/il_vero_ristorante
JWT_SECRET=tu_clave_secreta_muy_segura
PORT=5000
```

## Comandos útiles

- **Frontend:**  
  `npm run dev` — Inicia el servidor de desarrollo de React.

- **Backend:**  
  `npm run dev` — Inicia el backend con nodemon (recarga automática).
  `node src/server.js` — Inicia el backend en modo producción.
  `npm run create-admin` — Crea un usuario administrador.

## Ejemplo de uso de la API

### **Autenticación**

- **POST** `/api/auth/login`
  - **Body:**  
    ```json
    {
      "email": "admin@ristorante.com",
      "password": "admin123"
    }
    ```
  - **Respuesta:**  
    ```json
    {
      "token": "jwt_token_aqui",
      "user": { "id": "...", "nombre": "Admin", "role": "admin" }
    }
    ```

### **Platos**

- **GET** `/api/dishes`
  - Devuelve la lista de todos los platos.

- **POST** `/api/dishes` (requiere token de admin)
  - Crea un nuevo plato.

- **PUT** `/api/dishes/:id` (requiere token de admin)
  - Actualiza un plato existente.

- **DELETE** `/api/dishes/:id` (requiere token de admin)
  - Elimina un plato.

### **Reseñas**

- **POST** `/api/reviews`
  - Crea una reseña para un plato.

- **GET** `/api/reviews`
  - Obtiene todas las reseñas.

## Acceso al Panel de Administración

- **URL:** `/login`
- **Usuario:** `admin`
- **Contraseña:** `admin123`

## Notas y buenas prácticas

- **No subas la carpeta `node_modules`** al repositorio. Está en `.gitignore`.
- **No subas archivos `.env`** con datos sensibles. Usa `.env.example` para mostrar la estructura.
- **Documenta tus endpoints** y funcionalidades nuevas en este archivo.
- **Haz commits claros y frecuentes** para mantener el historial del proyecto.
- **Usa el script `create-admin`** para crear usuarios administradores de forma segura.

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

---

**Desarrollado con ❤️ para Il Vero Ristorante**