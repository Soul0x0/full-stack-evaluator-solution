## React & .NET Task Manager

A simple task management app with a React frontend and a .NET 9 Web API backend using PostgreSQL.

## Backend Setup

1. Make sure .NET 9 SDK and PostgreSQL are installed.
2. Clone the repository and navigate to the backend folder:

```bash
cd backend
```

3. Update the connection string in appsettings.json to match your PostgreSQL credentials.
4. Apply migrations and create the database:

```bash
dotnet ef database update
```

5. Run the backend:

```bash
dotnet run
```

## The API will be available at http://localhost:5215 (or your configured port).

## Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file at the root of the frontend folder:

```ini
VITE_API_BASE_URL=http://localhost:5215
```

4. Start the frontend:

```bash
npm run dev
```

### The app will be available at http://localhost:5173 (default Vite port).

### Usage

- Add a new task (for a new or existing user).
- Edit or delete tasks using the UI.
- Tasks display in a table/grid with completion status.

### Notes

- Ensure PostgreSQL is running before starting the backend.
- CORS is configured to allow requests from the frontend.
- This is a test project and does not include authentication.
