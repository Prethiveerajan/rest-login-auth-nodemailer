Here's a template for a README file for your project. It covers basic sections such as project description, setup instructions, and usage.

```markdown
# REST Login Authentication with Nodemailer

## Overview

This project implements a RESTful API for user authentication with features for password reset using Nodemailer. It includes functionality for user registration, login, and password reset via email. The backend is built using Node.js, Express, and MongoDB.

## Features

- **User Authentication:** Secure login with JWT tokens.
- **Password Reset:** Token-based password reset sent via email.
- **Protected Routes:** Access to certain routes requires authentication.

## Setup

### Prerequisites

- Node.js
- MongoDB
- A GitHub repository (for source control)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Prethiveerajan/rest-login-auth-nodemailer.git
   cd rest-login-auth-nodemailer
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DB_URL=mongodb://localhost:27017/your-database-name
   SECRET_KEY=your-jwt-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   ```

4. **Start the Server:**

   ```bash
   npm start
   ```

   The server will be running on `http://localhost:8080` by default.

## API Endpoints

### Authentication

- **Login:**

  **Endpoint:** `POST /api/login`

  **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

  **Response:**
  ```json
  {
    "token": "your-jwt-token"
  }
  ```

- **Protected Data:**

  **Endpoint:** `GET /api/data`

  **Headers:**
  ```http
  Authorization: Bearer your-jwt-token
  ```

  **Response:**
  ```json
  {
    "message": "Welcome, user@example.com! This is protected data."
  }
  ```

### User Management

- **Get User:**

  **Endpoint:** `GET /api/user/:userId`

  **Response:**
  ```json
  {
    "email": "user@example.com",
    "password": "hashed-password"
  }
  ```

- **Update User:**

  **Endpoint:** `PUT /api/user/:userId`

  **Request Body:**
  ```json
  {
    "email": "new-email@example.com"
  }
  ```

  **Response:**
  ```json
  {
    "email": "new-email@example.com",
    "password": "hashed-password"
  }
  ```

- **Delete User:**

  **Endpoint:** `DELETE /api/user/:userId`

  **Response:**
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

### Password Reset

- **Request Password Reset:**

  **Endpoint:** `POST /api/reset-app`

  **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```

  **Response:**
  ```json
  {
    "message": "Email sent successfully"
  }
  ```

- **Reset Password:**

  **Endpoint:** `POST /api/reset-pass/:token`

  **Request Body:**
  ```json
  {
    "password": "newpassword"
  }
  ```

  **Response:**
  ```json
  {
    "message": "Password reset successful"
  }
  ```

## Troubleshooting

- **Token Expired or Invalid Error:**

  Ensure the token is correctly generated and not expired. Check the server logs to confirm token values and expiration times.

- **Email Sending Issues:**

  Verify the email credentials in the `.env` file and ensure the email service is working properly.

## Contributing

Feel free to open issues or submit pull requests if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License.

```

### Customization

- **Replace Placeholder Values:** Ensure to replace placeholders like `your-jwt-secret-key`, `your-email@gmail.com`, and `your-email-password` with actual values.
- **Add More Details:** Depending on your project, you might need to add more details, such as advanced usage, deployment instructions, or testing information.

Feel free to modify and expand this README to better fit your project’s specifics!
