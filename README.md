# Account Management Application

A simple and functional React application for managing user accounts with authentication features.

## Features

- **User Registration** - Create new accounts with validation
- **User Login** - Secure authentication system
- **Account Management** - View and edit profile information
- **Form Validation** - Client-side validation with error handling
- **Responsive Design** - Mobile-friendly Bootstrap interface

## Technologies Used

- React 18
- React Router 6
- Bootstrap 5
- localStorage (for data persistence)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/SlothyRock/Account-Management-Application.git
cd Account-Management-Application
```

2. Install dependencies
```bash
npm install
```

3. Start the application
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Register**: Create a new account with first name, last name, email, and password
2. **Login**: Sign in using your registered credentials
3. **Manage Account**: View and update your profile information

## Project Structure
```
Account-Management-Application/
├── src/
│   ├── pages/
│   │   ├── Login.js          # Login page
│   │   ├── Register.js       # Registration page
│   │   └── Account.js        # Account management
│   ├── utils/
│   │   └── auth.js           # Authentication utilities
│   ├── App.js                # Main app with routing
│   └── index.js              # Entry point
├── public/
│   └── index.html
└── package.json
```

## Key Features Implementation

- **Protected Routes**: Account page requires authentication
- **Form Validation**: Email format, password strength, required fields
- **Error Handling**: User-friendly error messages
- **State Management**: React hooks (useState, useEffect)
- **Data Persistence**: localStorage for user data

## Notes

- This is a demonstration project using localStorage
- In production, use a backend API and database
- Passwords should be hashed in production environments

## Repository

[https://github.com/SlothyRock/Account-Management-Application](https://github.com/SlothyRock/Account-Management-Application)

## License

This project was created for educational purposes.
```

**Also, for your GitHub repository description field, use:**
```
React Account Management App - User registration, login, and profile management system
