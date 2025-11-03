# Blog API - Usage Guide

## Quick Start Guide

This guide will help you get the Blog API up and running and start making API calls.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/GregKmpf/Blog.git
cd Blog
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- express (web framework)
- typeorm (ORM)
- pg (PostgreSQL driver)
- dotenv (environment variables)
- typescript (TypeScript compiler)
- And all development dependencies

### 3. Set Up PostgreSQL Database

#### Option A: Using pgAdmin or PostgreSQL CLI

1. Open PostgreSQL CLI:
   ```bash
   psql -U postgres
   ```

2. Create a database:
   ```sql
   CREATE DATABASE blog_db;
   ```

3. Create a user (optional, or use existing):
   ```sql
   CREATE USER blog_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE blog_db TO blog_user;
   ```

#### Option B: Using pgAdmin GUI

1. Open pgAdmin
2. Right-click on "Databases" → Create → Database
3. Name it `blog_db`
4. Save

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following configuration (adjust values for your setup):

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=blog_db

# Server Configuration
PORT=3001
```

**Example .env file:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres123
DB_NAME=blog_db
PORT=3001
```

⚠️ **Important:** Never commit the `.env` file to version control!

### 5. Start the Development Server

```bash
npm run dev
```

You should see:
```
Server running on http://localhost:3001
```

If you see this message, your API is ready to accept requests! 🎉

### 6. Verify Database Connection

The server will automatically:
- Connect to PostgreSQL
- Create the `user` table if it doesn't exist
- Log "Server running on http://localhost:3001"

If there's an error, check:
- PostgreSQL is running
- Database credentials in `.env` are correct
- Database exists

## Making API Requests

### Using cURL (Command Line)

#### Create a User

```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com"
  }'
```

**Expected Response (201 Created):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

#### Get All Users

```bash
curl http://localhost:3001/users
```

**Expected Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com"
  }
]
```

### Using Postman

#### Setup Postman Collection

1. **Create a New Collection**
   - Open Postman
   - Click "New" → "Collection"
   - Name it "Blog API"

2. **Create User Request**
   - Click "Add Request"
   - Name: "Create User"
   - Method: `POST`
   - URL: `http://localhost:3001/users`
   - Headers:
     - Key: `Content-Type`
     - Value: `application/json`
   - Body → raw → JSON:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com"
     }
     ```
   - Click "Send"

3. **Get Users Request**
   - Click "Add Request"
   - Name: "Get All Users"
   - Method: `GET`
   - URL: `http://localhost:3001/users`
   - Click "Send"

### Using JavaScript/Fetch

```javascript
// Create a user
async function createUser() {
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'John Doe',
      email: 'john.doe@example.com'
    })
  });
  
  const user = await response.json();
  console.log('Created user:', user);
}

// Get all users
async function getUsers() {
  const response = await fetch('http://localhost:3001/users');
  const users = await response.json();
  console.log('All users:', users);
}

// Call the functions
createUser();
getUsers();
```

### Using Python/Requests

```python
import requests
import json

# Base URL
BASE_URL = "http://localhost:3001"

# Create a user
def create_user():
    url = f"{BASE_URL}/users"
    payload = {
        "name": "John Doe",
        "email": "john.doe@example.com"
    }
    response = requests.post(url, json=payload)
    print(f"Status: {response.status_code}")
    print(f"User created: {response.json()}")

# Get all users
def get_users():
    url = f"{BASE_URL}/users"
    response = requests.get(url)
    print(f"Status: {response.status_code}")
    print(f"Users: {response.json()}")

# Execute
create_user()
get_users()
```

## API Reference

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/users` | Create a new user | `{name, email}` | User object |
| GET | `/users` | Get all users | None | Array of users |

### Request/Response Details

#### POST /users

**Request:**
```json
{
  "name": "string (required)",
  "email": "string (required, unique)"
}
```

**Success Response (201):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Error Responses:**

- **400 Bad Request** - Missing required fields
  ```json
  {
    "message": "Name and email are required"
  }
  ```

- **500 Internal Server Error** - Database error (e.g., duplicate email)
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

#### GET /users

**Request:** No body required

**Success Response (200):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com"
  }
]
```

**Error Response:**

- **500 Internal Server Error** - Database connection error
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

## Testing Scenarios

### Happy Path Testing

1. **Create First User**
   ```bash
   curl -X POST http://localhost:3001/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice","email":"alice@example.com"}'
   ```
   Expected: 201 Created

2. **Create Second User**
   ```bash
   curl -X POST http://localhost:3001/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Bob","email":"bob@example.com"}'
   ```
   Expected: 201 Created

3. **Get All Users**
   ```bash
   curl http://localhost:3001/users
   ```
   Expected: 200 OK with array of 2 users

### Error Testing

1. **Missing Name Field**
   ```bash
   curl -X POST http://localhost:3001/users \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```
   Expected: 400 Bad Request

2. **Missing Email Field**
   ```bash
   curl -X POST http://localhost:3001/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User"}'
   ```
   Expected: 400 Bad Request

3. **Duplicate Email**
   ```bash
   # First request succeeds
   curl -X POST http://localhost:3001/users \
     -H "Content-Type: application/json" \
     -d '{"name":"User 1","email":"duplicate@example.com"}'
   
   # Second request fails
   curl -X POST http://localhost:3001/users \
     -H "Content-Type: application/json" \
     -d '{"name":"User 2","email":"duplicate@example.com"}'
   ```
   Expected: First succeeds (201), second fails (500)

## Troubleshooting

### Common Issues and Solutions

#### 1. "Cannot connect to database"

**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solutions:**
- Ensure PostgreSQL is running: `sudo service postgresql start`
- Check PostgreSQL is listening on port 5432
- Verify DB_HOST and DB_PORT in `.env`

#### 2. "Missing environment variables"

**Symptoms:**
```
Error: Missing one or more required environment variables
```

**Solutions:**
- Ensure `.env` file exists in root directory
- Check all required variables are set: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- Restart the server after changing `.env`

#### 3. "Authentication failed"

**Symptoms:**
```
error: password authentication failed for user
```

**Solutions:**
- Verify username and password in `.env`
- Check PostgreSQL user exists: `psql -U postgres -c "\du"`
- Reset password if needed

#### 4. "Database does not exist"

**Symptoms:**
```
error: database "blog_db" does not exist
```

**Solutions:**
- Create database: `createdb blog_db`
- Or in psql: `CREATE DATABASE blog_db;`

#### 5. Port already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solutions:**
- Change PORT in `.env` to different value (e.g., 3002)
- Or kill process using port 3001:
  - Linux/Mac: `lsof -ti:3001 | xargs kill`
  - Windows: `netstat -ano | findstr :3001` then `taskkill /PID <PID> /F`

## Development Workflow

### Recommended Workflow

1. **Start the server in development mode**
   ```bash
   npm run dev
   ```

2. **Make code changes** - The server auto-reloads on save

3. **Test with Postman or cURL** - Verify changes work

4. **Check server logs** - Look for errors in terminal

5. **Iterate** - Repeat steps 2-4

### Database Management

#### View Database Contents

Connect to database:
```bash
psql -U postgres -d blog_db
```

List tables:
```sql
\dt
```

View users:
```sql
SELECT * FROM "user";
```

Delete all users (for testing):
```sql
DELETE FROM "user";
```

Drop and recreate table:
```sql
DROP TABLE "user";
-- Restart server to recreate
```

## Next Steps

### Adding More Features

1. **Add UPDATE endpoint**
   - Create `updateUserController` in UserController.ts
   - Add `PUT /users/:id` route

2. **Add DELETE endpoint**
   - Create `deleteUserController` in UserController.ts
   - Add `DELETE /users/:id` route

3. **Add GET single user**
   - Create `getUserByIdController` in UserController.ts
   - Add `GET /users/:id` route

### Frontend Integration

Once you have a frontend (React, Angular, Vue, etc.):

```javascript
// Example React hook for fetching users
import { useState, useEffect } from 'react';

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return { users, loading };
}
```

## Additional Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [REST API Best Practices](https://restfulapi.net/)

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review server logs for error messages
3. Check PostgreSQL logs
4. Verify all dependencies are installed
5. Ensure environment variables are correct

Happy coding! 🚀
