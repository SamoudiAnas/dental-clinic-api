# Dental Clinic API - Backend for Appointment Booking System with Express, PostgresSQL & Sequelize🚀

## Description🌟

The Dental Clinic API is a backend application built with Express, PostgresSQL, and Sequelize. It serves as the backend for an Appointment Booking System.

## Links

- [🔗 Visit the live project running here!](https://dental-clinic-user.vercel.app)

## Technical specifications ⚡️

- **Node v20.11.0**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express js**: A minimal and flexible Node.js web application framework.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Sequelize**: A promise-based Node.js ORM for PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **PostgreSQL**: A powerful, open-source object-relational database system.

## Key Highlights

- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Appointment Booking**: Customers can easily schedule appointments online.
- **Availability Checking**: Customers can check available time slots before booking appointments.

## Getting Started 🖥️

To get started with the project, follow these steps:

1. Clone the repository: git clone https://github.com/SamoudiAnas/dental-clinic-api.git
2. Navigate to the project directory: cd your-project-directory
3. Install dependencies: npm install
4. Set your database env in `.env` file

```plaintext
POSTGRES_DB_HOST=your_db_host
POSTGRES_DB_PORT=your_db_port
POSTGRES_DB_USER=your_db_user
POSTGRES_DB_PASSWORD=your_db_password
POSTGRES_DB_NAME=your_db_name
NODE_ENV=development
PORT=5000
JWT_SECRET=your_jwt_secret
```

5. Run the development server: npm run dev
6. Make your API calls to http://localhost:{PORT} using your app or Postman

## API Endpoints

Here are some of the key API endpoints:

### Authentication

- **POST /auth/create-account** : Register a new user.
- **POST /auth/login** : Authenticate a user and return a JWT.

### Users

- **GET /users** : Get all users.
- **GET /users/:id** : Get a specific user by ID.
- **PUT /users/:id** : Update a user's information.
- **DELETE /users/:id** : Delete a user.

### Appointments

- **POST /appointments** : Create a new appointment.
- **GET /appointments** : Get all appointments.
- **GET /appointments/:id** : Get a specific appointment by ID.
- **PUT /appointments/:id** : Update an appointment.
- **DELETE /appointments/:id** : Delete an appointment.

### Availability

- **GET /availability** : Check available time slots.

## Contributing

We welcome contributions from the community. If you'd like to contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch: git checkout -b feature-name.
3. Make your changes and commit them: git commit -m 'Add new feature'.
4. Push to the branch: git push origin feature-name.
5. Submit a pull request.

## License

This project is licensed under the MIT License.
