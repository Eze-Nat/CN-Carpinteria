# CN Carpintería – Fullstack Business Platform

Aplicación web fullstack desarrollada para la gestión empresarial y visualización dinámica de productos y servicios.

El proyecto está diseñado con enfoque en arquitectura limpia, escalabilidad y buenas prácticas de ingeniería de software.

---

## 🚀 Stack Tecnológico

### Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Clean Architecture
- Docker (entorno de base de datos)

### Frontend
- React
- Vite
- JavaScript
- TailwindCSS
- Responsive Design

---

## 🧩 Arquitectura

El backend está estructurado bajo principios de **Clean Architecture**, con separación clara en capas:

- **Domain** → Entidades y contratos
- **Application** → Casos de uso
- **Infrastructure** → Persistencia y repositorios
- **API** → Endpoints REST

Se implementan APIs RESTful para la gestión de categorías e imágenes.

El diseño está orientado a mantenibilidad, testabilidad y escalabilidad futura.

---

## 🗄 Base de Datos

- PostgreSQL
- Migraciones con Entity Framework Core
- Configuración mediante Docker para entorno de desarrollo local

---

## ⚙️ Funcionalidades actuales

- CRUD de categorías
- Gestión de imágenes por categoría
- Panel administrativo protegido
- Integración frontend-backend mediante consumo de API REST
- Arquitectura preparada para futuras extensiones (e-commerce y sistema financiero)

---

## 📦 Estructura del proyecto

CN-Carpinteria/
│
├── frontend/ # Aplicación React
│
└── backend/ # Backend .NET 8
├── CNCarpinteria.API
├── CNCarpinteria.Application
├── CNCarpinteria.Domain
├── CNCarpinteria.Infrastructure
└── CNCarpinteria.sln


---

## 🛠 Configuración de entorno

### Backend

1. Configurar conexión a PostgreSQL en `appsettings.Development.json`
2. Ejecutar migraciones:
3. Ejecutar la API:

### Frontend

---

## 🎯 Objetivo del proyecto

Desarrollar una plataforma empresarial fullstack aplicando principios de arquitectura de software, separación de responsabilidades y diseño modular, con visión de escalabilidad y mantenimiento a largo plazo.

---

## 👨‍💻 Autor

Ezequiel Natale  
Full Stack Developer | .NET 8 | C# | React | PostgreSQL  