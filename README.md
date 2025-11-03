# Blog API

A RESTful API built with TypeScript, Express, and TypeORM for managing a blog platform with user management capabilities.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)

## 📋 What Was Built

This project is a **Blog API backend system** developed as part of a Web and Mobile Development university course. It provides a foundation for a complete blog platform with the following features:

### Core Features
- ✅ **RESTful API** with Express.js
- ✅ **TypeScript** for type-safe development
- ✅ **PostgreSQL** database integration via TypeORM
- ✅ **User Management** system with Create and Read operations
- ✅ **Environment-based configuration** for security
- ✅ **Automated database synchronization** in development mode
- ✅ **Hot-reload development** environment with nodemon

### Architecture Components

#### 1. **Server Configuration** (`src/server.ts`)
- Express.js server initialization
- Database connection management
- Middleware configuration (JSON parsing)
- Route registration
- Error handling for failed connections

#### 2. **Database Configuration** (`src/data-source.ts`)
- TypeORM DataSource configuration
- PostgreSQL connection setup
- Environment variable validation
- Entity registration
- Automatic schema synchronization (development)

#### 3. **User Entity** (`src/entity/users.ts`)
- User model with TypeORM decorators
- Fields: `id` (auto-generated), `name`, `email` (unique)
- Database table mapping

#### 4. **User Controller** (`src/controllers/UserController.ts`)
- `createUserController`: Creates new users
- `getUsersController`: Retrieves all users
- Input validation
- Error handling and appropriate HTTP status codes

#### 5. **Routes** (`src/routes/user.routes.ts`)
- `POST /users` - Create a new user
- Additional endpoints ready for expansion (GET, PUT, DELETE)

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Type-safe JavaScript development |
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for building the API |
| **TypeORM** | ORM for database operations |
| **PostgreSQL** | Relational database |
| **dotenv** | Environment variable management |
| **nodemon** | Development auto-reload |
| **ts-node** | TypeScript execution for Node.js |

## 📁 Project Structure

```
Blog/
├── src/
│   ├── controllers/
│   │   └── UserController.ts    # Business logic for user operations
│   ├── entity/
│   │   └── users.ts              # User entity/model
│   ├── routes/
│   │   └── user.routes.ts        # API route definitions
│   ├── data-source.ts            # Database configuration
│   └── server.ts                 # Application entry point
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── .env                          # Environment variables (not in repo)
└── README.md                     # This file
```

## 🚀 Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/GregKmpf/Blog.git
   cd Blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   PORT=3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:3001`

## 📡 API Endpoints

### Create User
**POST** `/users`

Creates a new user in the database.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Get All Users
**GET** `/users` (ready for implementation)

Retrieves all users from the database.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

## 📊 Database Schema

### User Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT |
| name | VARCHAR | NOT NULL |
| email | VARCHAR | UNIQUE, NOT NULL |

## 🔧 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the production server with ts-node |
| `npm run dev` | Start development server with hot-reload (nodemon) |

## 🔐 Security Features

- Environment variables for sensitive data (database credentials)
- Input validation in controllers
- Unique email constraint to prevent duplicates
- TypeScript for compile-time type safety

## 📝 Development Notes

### Configuration Files

**tsconfig.json**
- Configured for Node.js with ESNext module system
- Experimental decorators enabled for TypeORM
- Strict type checking enabled
- Source maps for debugging

**package.json**
- All dependencies properly defined
- Development and production dependencies separated
- Scripts configured for easy development

### Known Issues & Solutions Implemented
1. ✅ Fixed TypeORM import issues with `verbatimModuleSyntax: false`
2. ✅ Resolved process.env typing with `@types/node`
3. ✅ Configured ts-node for TypeScript execution with nodemon
4. ✅ Fixed entity import paths
5. ✅ Configured database connection with proper error handling

## 🎯 Future Enhancements

- [ ] Add authentication and authorization (JWT)
- [ ] Implement blog post CRUD operations
- [ ] Add comments functionality
- [ ] Implement user roles and permissions
- [ ] Add input sanitization and validation middleware
- [ ] Implement pagination for list endpoints
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests
- [ ] Frontend interface with React

## 📚 Learning Resources

This project demonstrates:
- RESTful API design principles
- TypeScript with Node.js
- Database ORM usage (TypeORM)
- Environment-based configuration
- Error handling in Express.js
- Project structure for scalable applications

## 👨‍💻 Development Process

Detailed development notes can be found in:
- `fisrtday.readme` - Initial setup and configuration steps
- `relatorio.readme` - Day-by-day development progress
- `bancodedados.readme` - Database connection notes

## 📄 License

This is a university project developed for educational purposes.

## 🤝 Contributing

This is an educational project, but suggestions and feedback are welcome!

---

**Status:** 🟢 Active Development  
**Created for:** Web and Mobile Development Course  
**Goal:** Build a production-ready blog platform
