# Expense Tracker

## Overview
Expense Tracker is a web application designed to help users manage their daily expenses efficiently. Users can add, edit, delete, and filter expenses while also tracking spending habits over time.

## Features
- **User Authentication:** Secure login and logout functionality.
- **Expense Management:** Add, edit, delete, and view expenses.
- **Filtering & Sorting:** Filter expenses by category and date.
- **Data Persistence:** Expenses are stored using a backend API.
- **Real-time Updates:** Instant updates using React Query.
- **Responsive UI:** Built using Chakra UI for a smooth user experience.

## Tech Stack
- **Frontend:** React, Chakra UI
- **State Management:** React Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Token (JWT)

## Installation & Setup

### Steps to Run the Project
#### 1. Clone the Repository
```sh
git clone https://github.com/JyotiranjanGhibila/expense_tracker
cd expense-tracker
```

#### 2. Install Dependencies
```sh
npm install
```

#### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
```

#### 4. Start the Backend Server
```sh
node index.js
```

#### 5. Start the Frontend
Open a new terminal window and run:
```sh
npm start
```
The application will be available at `http://localhost:3000/`.

## API Endpoints
### Authentication
- **GET** `/auth/me` - Verify user token
- **POST** `/auth/login` - Login user
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/logout` - Logout user

### Profile
- **GET** `/profile/:id` - Fetch user profile

### Expenses
- **GET** `/get/expenses` - Fetch all expenses with filtering options (category, date, pagination)
- **POST** `/add/expense` - Add a new expense
- **PUT** `/update/expense` - Update an existing expense
- **DELETE** `/delete/expense/:id` - Delete an expense
