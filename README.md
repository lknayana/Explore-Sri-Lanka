# Explore Sri Lanka – Journey Beyond Limits

**Integrated Travel Booking and Management System**

## 1. Project Overview

Explore Sri Lanka is a tourism web application developed using the MERN stack. It allows tourists to explore destinations in Sri Lanka, view tour packages, request bookings and track their booking status.

Tourists can also submit reviews and ratings. A separate admin dashboard is available to manage tour packages and customer bookings.

## 2. Main Features

**Tourist Features**
- View destinations and tour packages.
- Search, filter and sort tour packages.
- View package details and itineraries.
- Request tour bookings with vehicle and guide preferences.
- Track bookings using a booking reference and email address.
- Submit reviews and ratings.

**Admin Features**
- Secure administrator login.
- Add, view, edit and delete tour packages.
- View, search and manage customer bookings.
- Confirm or cancel booking requests.
- Delete booking records.

## 3. Technologies Used

- **Frontend:** React.js, Vite, HTML, CSS and JavaScript
- **Backend:** Node.js and Express.js
- **Database:** MongoDB Atlas and Mongoose
- **Authentication:** JWT and bcryptjs
- **Development Tools:** Visual Studio Code, Git and GitHub

## 4. Installation and Setup

Follow these steps to run the project on your computer.

### Step 1: Install the Required Software

Make sure the following software is available:

- Node.js and npm
- Visual Studio Code or another code editor
- Git (for cloning the repository)
- A MongoDB Atlas account

After installing Node.js, open a terminal and check the installation:

```bash
node -v
npm -v
```

These commands should display the installed versions.

### Step 2: Download the Project

Open a terminal and clone the project from GitHub:

```bash
git clone <https://github.com/lknayana/Explore-Sri-Lanka.git>
```

Open the downloaded project folder in Visual Studio Code.

You can also download the project as a ZIP file from GitHub and extract it.

### Step 3: Configure MongoDB Atlas

The application uses MongoDB Atlas to store tour packages, booking requests, reviews and administrator accounts.

1. Sign in to MongoDB Atlas.
2. Create a project and a database cluster if you do not already have one.
3. Create a database user with a username and password.
4. In **Network Access**, allow the IP address of the computer running the backend.
5. Open the cluster's connection options and copy the MongoDB connection string.
6. Replace the username and password in the connection string with your database user's details.

The connection string is used by the backend to connect to MongoDB Atlas.

### Step 4: Install Backend Dependencies

Open a terminal in the project folder and run:

```bash
cd backend
npm install
```

This installs the Node.js packages required by the backend.

### Step 5: Configure Backend Environment Variables

Inside the `backend` folder, create a file named `.env`.

Add the MongoDB connection string, JWT secret and server port as explained in Section 5.

Make sure the MongoDB connection string is correct before starting the backend.

### Step 6: Start the Backend Server

From the `backend` folder, run:

```bash
node server.js
```

The backend runs on:

`http://localhost:5000`

The terminal should show the server and database connection messages when the application starts successfully.

Keep this terminal open while using the website.

### Step 7: Install Frontend Dependencies

Open a second terminal in the project folder.

Run:

```bash
cd frontend
npm install
```

This installs React, Vite and the other frontend packages.

### Step 8: Start the Frontend

From the `frontend` folder, run:

```bash
npm run dev
```

Vite starts the frontend development server.

Open the following address in your browser:

`http://localhost:5173`

The Explore Sri Lanka website should now be available.

### Step 9: Check the Application

After starting both servers, you can check the main functions:

1. Open the homepage and visit the Packages page.
2. View the details of a tour package.
3. Submit a sample booking request.
4. Use the booking reference and email address to track the booking.
5. Submit a sample review.
6. Log in as an administrator to manage packages and bookings.

The frontend and backend must both be running for database-related functions to work.

## 5. Environment Variables

Create a `.env` file inside the `backend` folder.

Add the following variables:

```env
MONGO_URI=mongodb_connection_string
JWT_SECRET=secret_key
PORT=5000
```

**MONGO_URI:** The connection string copied from MongoDB Atlas.

**JWT_SECRET:** A long, random secret used to sign administrator authentication tokens.

**PORT:** The port used by the backend server.

Replace the example values with your own settings.

For security, do not upload the `.env` file to GitHub. Keep database passwords and JWT secrets private.

## 6. Admin Login Setup

The application uses a separate administrator login system. There is no public registration page for administrators.

Administrator accounts are created using the project's admin setup process and stored in MongoDB Atlas. Passwords are hashed using bcryptjs.

After an administrator account has been created:

1. Start the frontend and backend servers.
2. Open the website.
3. Go to the Admin Login page.
4. Enter the administrator username and password.
5. Click **Login** to access the admin dashboard.

The admin dashboard allows administrators to manage tour packages and customer booking requests.

## 7. Project Folder Structure

The project is divided into frontend and backend folders. The frontend contains the website pages and user interface. The backend handles API requests, authentication and database operations.

```text
Explore-Sri-Lanka/
│
├── frontend/
│   ├── public/
│   │   └── images/          # Website images
│   │
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Tourist and admin pages
│   │   ├── services/        # Backend API connections
│   │   ├── context/         # Shared application state
│   │   ├── App.jsx          # Main application
│   │   └── main.jsx         # React entry point
│   │
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── config/              # Database configuration
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Request handling
│   ├── routes/              # API routes
│   ├── middleware/          # Authentication
│   ├── scripts/             # Setup scripts
│   ├── server.js            # Backend entry point
│   └── package.json
│
│
└── README.md
```

This structure helps keep the frontend, backend and database-related code organized. It also makes the project easier to understand and maintain.