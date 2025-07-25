# Aplicaciones Interactivas | Grupo 7 | UADE 

## Aclaración previa a la inicialización:

* En la carpeta `backend/` deberia encontrarse el archivo ".env". Caso contrario, se deberá crearlo con los siguientes datos:
  
```
MONGO_URI=mongodb://localhost:27017/il_vero_ristorante
JWT_SECRET=tu_clave_secreta_muy_segura
PORT=5000
```

## Guía rápida de Uso:

1. Descargar el proyecto como .zip, descomprimirlo y abrir la carpeta con el IDE de preferencia. Dentro del proyecto, se recomienda abrir la terminal (ctrl + J o command + J) y dividirla en 2.
   
2. En la terminal 1:
   - npm i (instalación de dependencias)
3. En la terminal 2:
   - cd backend (dirigirse a la carpeta de backend)
   - npm i (instalación de dependencias)
   - npm run dev (para inicializar el backend)
4. En la terminal 1: npm run dev (para inicializar el frontend)
5. Abrir el navegador en la ruta creada al inicializar el frontend (ej: http://localhost:5173/)

## Menu Login

   localhost:5173/login

   usuario: admin
   contrasena: admin123

## Menu admin

   localhost:5173/menuAdmin
   
   *Al loguearse correctamente, será dirigido automáticamente
   
   - Se podrá acceder a los módulos Platos y Usuario

## Módulo Platos

- Se podrá crear, editar y borrar platos
- Opcion para deslogearse
   
## Módulo Usuario

- Se podrá crear, editar y borrar usuarios
- Opcion para deslogearse


# Desarrollo de Documentación extendida:

## Indice 

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías empleadas](#tecnologías-empleadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Comandos útiles](#comandos-útiles)
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
- Sistema de roles y permisos
- Protección contra accesos no autorizados
- Validación de datos en cliente y servidor

## Sistema de Seguridad y Roles

### Roles del Sistema
El sistema implementa un sistema de roles para controlar el acceso a diferentes funcionalidades:

1. **Usuario Regular (role: 'user')**
   - Puede ver el catálogo de platos
   - Puede dejar reseñas
   - No puede acceder al panel de administración
   - Es el rol por defecto al crear una nueva cuenta

2. **Administrador (role: 'admin')**
   - Tiene todos los permisos de usuario regular
   - Puede acceder al panel de administración
   - Puede gestionar platos (CRUD)
   - Puede gestionar usuarios (CRUD)
   - Puede crear nuevos usuarios admin
   - Puede eliminar platos y usuarios lógicamente

### Protección de Rutas

#### Rutas Públicas
- `/api/dishes` - Obtener todos los platos

#### Rutas Protegidas (Admin)
A probarse con postman
- `/api/dishes` - POST/PUT/DELETE - Gestión de platos
- `/api/users` - GET/POST/PUT/DELETE - Gestión de usuarios (De no estar logeados deberia dar un 'Oops')
- `/api/auth/login` - Autenticación

### Medidas de Seguridad Implementadas

1. **Autenticación**
   - JWT (JSON Web Tokens) para autenticación
   - Tokens con expiración (24h)
   - Verificación de tokens en todas las rutas protegidas
   - Mensajes de error genéricos para evitar información sensible

2. **Contraseñas**
   - Hasheadas con bcrypt
   - Salting único por usuario
   - Validación de fuerza de contraseña
   - No se almacenan en texto plano

3. **Validación de Datos**
   - En cliente (frontend)
   - En servidor (backend)
   - Esquemas de validación en MongoDB
   - Manejo de errores centralizado

4. **Protección contra Accesos No Autorizados**
   - Middleware de autenticación
   - Verificación de roles
   - Eliminación lógica de datos
   - Protección contra inyección SQL

5. **Manejo de Errores**
   
   (Empleando la libreria Axios)

   - Centralizado en el backend
   - Mensajes genéricos para usuarios
   - Logging para desarrolladores
   - Manejo de errores HTTP estándar

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

En la carpeta `backend/` deberia existir un .env, en caso de no existir crea un archivo `.env` con:

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

## Comandos útiles

- **Frontend:**  
  `npm run dev` — Inicia el servidor de desarrollo de React.

- **Backend:**  
  `npm run dev` — Inicia el backend con nodemon (recarga automática).
  `node src/server.js` — Inicia el backend en modo producción.
  `npm run create-admin` — Crea un usuario administrador.

## Pruebas de la API con REST Client

Para probar los endpoints de la API, puedes usar la extensión REST Client de VS Code. Se incluye un archivo de pruebas en:

```
tests/api-tests.http
```

Este archivo contiene ejemplos de peticiones HTTP para probar los endpoints principales del sistema, incluyendo:

1. **Login**
   ```http
   POST http://localhost:5050/api/auth/login
   Content-Type: application/json

   {
       "username": "admin",
       "password": "admin123"
   }
   ```

2. **Obtener Platos**
   ```http
   GET http://localhost:5050/api/dishes
   ```

3. **Obtener Platos por Categoría**
   ```http
   GET http://localhost:5050/api/dishes/category/Pizzas
   ```

Para usar el archivo de pruebas:
1. Instala la extensión REST Client en VS Code
2. Abre el archivo `tests/api-tests.http`
3. Haz clic en el botón "Send Request" junto a cada endpoint
4. Los resultados se mostrarán en la pestaña "REST Client"

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

## Documentación Técnica Detallada

### 1. Arquitectura del Sistema

#### Estructura General
```
APIS_UADE/
│
├── backend/           # Backend Node.js/Express
│   ├── controllers/   # Controladores de la API
│   ├── models/        # Modelos de MongoDB
│   ├── routes/        # Rutas de la API
│   ├── middleware/    # Middleware personalizado
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
└── ...
```

### 2. Autenticación y Autorización (JWT)

#### Generación de Tokens
```javascript
// backend/controllers/authController.js
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_muy_segura';

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};
```

#### Middleware de Autenticación
```javascript
// Middleware para verificar token
exports.requireAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Authentication error' });
  }
};
```

### 3. Conexión con MongoDB

#### Configuración de MongoDB
```javascript
// backend/src/app.js
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
```

#### Ejemplo de Modelo
```javascript
// backend/models/Dish.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Entradas', 'Pizzas', 'Pastas', 'Postres']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});
```

### 4. Configuración de Axios

   De esta forma consumimos la api

#### Configuración Global
```javascript
// frontend/src/config/axios.js
import axios from 'axios';
import config from './config';

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

#### Uso en Servicios
```javascript
// frontend/src/services/api.js
import axiosInstance from '../config/axios';

export const getDishes = () => axiosInstance.get('/dishes');
export const createDish = (data) => axiosInstance.post('/dishes', data);
```

### 5. Middleware Personalizados

#### Middleware de Logging
```javascript
// backend/middleware/logger.js
const logger = (req, res, next) => {
  console.log(`
    ${req.method} ${req.path}
    Headers: ${JSON.stringify(req.headers)}
    Body: ${JSON.stringify(req.body)}
  `);
  next();
};
```

#### Middleware de Error Handling
```javascript
// backend/src/app.js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Something went wrong!' 
  });
});
```

### 6. Protección de Tokens

#### Almacenamiento Seguro
- Los tokens se almacenan en el localStorage del navegador
- Se usan variables de entorno para la clave secreta
- No se exponen tokens en el frontend

#### Validación de Tokens
- Verificación de firmas
- Validación de expiración
- Verificación de roles
- Manejo de errores centralizado

#### Eliminación Lógica
```javascript
// backend/controllers/dishController.js
exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(
      req.params.id,
      {
        isActive: false,
        deletedAt: new Date(),
        deletedBy: req.user.userId
      },
      { new: true }
    );
    res.json({ message: 'Plato eliminado lógicamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

**Desarrollado con ❤️ para Il Vero Ristorante**

- Arthur Callomamani acalllomamani@uade.edu.ar
- Emir Gerbasi egerbasi@uade.edu.ar
- Tomas Bermejo tbermejo@uade.edu.ar

