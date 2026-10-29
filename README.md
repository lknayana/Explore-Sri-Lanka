# Explore Sri Lanka – Journey Beyond Limits

**Explore Sri Lanka – Journey Beyond Limits** is a full-stack tourism and travel management web application developed using the MERN stack. It provides a platform for exploring destinations in Sri Lanka, discovering tour packages, requesting bookings, tracking booking statuses, and sharing reviews.

The application includes a responsive tourist interface and a secure administrator dashboard for managing tour packages and booking requests.

---

## 1. Project Overview

Explore Sri Lanka is designed to simplify the process of discovering and booking tour packages across Sri Lanka.

Visitors can explore popular destinations, search for tour packages, view detailed itineraries, and submit booking requests according to their travel preferences.

After submitting a booking request, customers receive a unique booking reference that can be used with their email address to track the booking status.

Administrators can create, update, and delete tour packages, manage customer bookings, and maintain the information displayed throughout the website.

The application uses MongoDB Atlas for persistent data storage and REST APIs for communication between the frontend and backend.

## 2. Technologies Used

### Frontend

- **React.js:** Component-based user interface development
- **Vite:** Frontend development server and production build tool
- **JavaScript:** Application logic and interactions
- **HTML5:** Web page structure
- **CSS3:** Styling and responsive layouts
- **React Router:** Client-side routing and navigation

### Backend

- **Node.js:** Server-side JavaScript runtime
- **Express.js:** REST API development and request handling
- **Mongoose:** MongoDB schema definition, validation, and data operations

### Database

- **MongoDB Atlas:** Cloud-based NoSQL database

### Authentication and Security

- **JSON Web Tokens (JWT):** Administrator authentication
- **bcryptjs:** Secure password hashing and verification
- **Protected API routes:** Authorization for administrator operations
- **Input validation:** Frontend and backend data validation

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB Atlas

---

## 3. Main Features

### 3.1 Tourist Features

#### Homepage

- Automatic image slideshow with manual navigation controls
- Featured tour packages
- Popular Sri Lankan destinations
- Travel information and promotional sections
- Navigation to tour packages and other pages
- Responsive layout

#### Tour Package Browsing

- View available tour packages
- Search packages by name or destination
- Filter packages by duration
- Sort packages by price
- View detailed package descriptions
- Explore daily itineraries and included services
- View accommodation information for multi-day tours

#### Destination Exploration

- Discover popular destinations in Sri Lanka
- View destination images and information
- Explore cultural, historical, and natural attractions

#### Tour Booking

- Select a tour package
- Submit a booking request
- Enter personal and contact information
- Select a travel date
- Specify the number of travellers
- Request a preferred vehicle
- Select a preferred guide language
- Specify the number of tour guides
- Receive a unique booking reference after successful submission

#### Booking Tracking

- Track booking requests using a booking reference and email address
- Copy the booking reference using a dedicated Copy button
- View the current booking status
- Check whether a booking is Pending, Confirmed, or Cancelled

#### Reviews and Ratings

- View reviews related to individual tour packages
- Submit reviews with a name, rating, and comment
- Display star ratings
- Calculate and display average ratings
- Display reviews in newest-first order

#### Information Pages

- About Us
- Contact Us
- Shared navigation bar
- Shared footer

### 3.2 Administrator Features

#### Administrator Authentication

- Secure administrator login
- JWT-based authentication
- Protected administrator pages
- Protected backend API routes
- Administrator logout

#### Tour Package Management

- Create new tour packages
- View existing packages
- Update package information
- Delete tour packages
- Manage package descriptions and prices
- Manage destinations, images, and itineraries
- Manage included services and accommodation details
- Prevent deletion of packages with related bookings or reviews

#### Booking Management

- View all submitted booking requests
- Search bookings by customer or package
- Filter bookings by status
- Sort booking records
- Confirm booking requests
- Cancel booking requests
- Permanently delete booking records
- Display updated booking information

---

## 4. Tour Package Management

Tour Packages are the primary entity used for full CRUD operations.

The administrator can create different tour packages based on destinations, travel duration, and included services.

### Package Categories

| Category | Duration | Accommodation |
|---|---|---|
| Day Tours | 1 Day | Not included |
| Short Tours | 3 Days | Included |
| Extended Tours | 5 Days | Included |

### Tour Package Information

Each tour package contains:

- Package name
- Duration
- Destination
- Price
- Description
- Image path
- Daily itinerary
- Included services
- Accommodation details, where applicable

### Available Tour Packages

**Colombo City Explorer**

A one-day sightseeing tour covering cultural landmarks, historical attractions, and popular locations in Colombo.

**Kandy & Hill Country Escape**

A three-day journey through Kandy, Nuwara Eliya, and Ella, featuring cultural landmarks, tea plantations, and scenic hill-country attractions.

**Sri Lanka Highlights Tour**

A five-day journey through Sigiriya, Kandy, Nuwara Eliya, and Colombo, combining cultural heritage and natural attractions.

Administrators can create additional packages through the management dashboard.

---

## 5. Booking Management System

The booking system allows tourists to request tour packages according to their travel requirements.

### 5.1 Booking Information

Each booking stores:

- Selected tour package
- Customer name
- Email address
- Phone number
- Travel date
- Number of travellers
- Preferred vehicle
- Preferred guide language
- Number of guides requested
- Booking status
- Unique booking identifier

### 5.2 Vehicle Preferences

The available vehicle options are:

- Car
- Van
- Bus

### 5.3 Guide Language Preferences

The available guide languages are:

- English
- Hindi
- Mandarin Chinese
- German
- Russian

### 5.4 Booking Workflow

1. The tourist selects a tour package.
2. The tourist opens the booking form.
3. Personal details and travel preferences are entered.
4. The submitted information is validated.
5. The booking request is stored in MongoDB.
6. The initial booking status is set to Pending.
7. A unique booking reference is generated from the saved booking identifier.
8. The administrator reviews the booking request.
9. The administrator can confirm, cancel, or delete the booking.
10. The tourist can track the current booking status using the booking reference and email address.

### 5.5 Booking Statuses

| Status | Description |
|---|---|
| Pending | The request has been submitted and is awaiting administrator review |
| Confirmed | The administrator has confirmed the booking |
| Cancelled | The booking request has been cancelled |

### 5.6 Booking Deletion

Administrators can permanently remove booking records through the Booking Management page.

A confirmation prompt is displayed before deletion.

The deletion request is processed through a protected backend API, which removes the selected booking from MongoDB.

Once deleted, the booking is no longer available through Booking Tracking.

---

## 6. CRUD Operations

The application implements CRUD operations using React, Express.js, Mongoose, and MongoDB Atlas.

### 6.1 Tour Package CRUD

**Create**

Administrators can add new tour packages through a form containing package details, prices, destinations, itineraries, services, and accommodation information.

**Read**

The application retrieves tour packages from MongoDB and displays them on the tourist interface.

The Read functionality includes:

- Listing packages
- Viewing individual package details
- Searching by package name or destination
- Filtering by duration
- Sorting by price

**Update**

Administrators can edit existing package information.

Updated records are saved in MongoDB and reflected on the tourist pages.

**Delete**

Administrators can delete tour packages after confirmation.

Deletion is restricted when a package has related booking or review records, helping maintain data consistency.

### 6.2 Booking CRUD

**Create**

Tourists submit booking requests through the Booking Form.

New bookings are stored in MongoDB with Pending status.

**Read**

Administrators can retrieve and view booking records through the Booking Management page.

Booking information supports searching, filtering, and sorting.

Tourists can retrieve limited booking information using their booking reference and matching email address.

**Update**

Administrators can update the status of bookings to Confirmed or Cancelled.

The new status is saved in MongoDB and displayed through Booking Tracking.

**Delete**

Administrators can permanently delete booking records.

The application displays a confirmation prompt and sends an authenticated DELETE request to the backend.

Deleted bookings are removed from the database and administrator interface.

Booking detail editing is not provided; the Update functionality is focused on booking status management.

### 6.3 Reviews and Ratings

**Create**

Visitors can submit reviews containing their name, a numerical rating, and a comment.

**Read**

Reviews are retrieved from MongoDB and displayed under the related tour package.

The application calculates average ratings and displays the newest reviews first.

**Delete**

An authenticated backend DELETE endpoint is available for removing review records.

Review editing and a separate administrator review-management interface are not provided.

### 6.4 CRUD Summary

| Entity | Create | Read | Update | Delete |
|---|---|---|---|---|
| Tour Packages | Yes | Yes | Yes | Yes |
| Bookings | Yes | Yes | Status updates | Yes |
| Reviews | Yes | Yes | No | Protected API |
| Administrators | Account provisioning | Authentication | No management interface | No management interface |

---

## 7. Database Design

The application uses MongoDB Atlas as its database and Mongoose to define document structures, validation rules, and relationships.

### 7.1 Database Collections

The database contains four main collections.

#### Packages Collection

Stores tour package information.

| Field | Description |
|---|---|
| `_id` | Unique package identifier |
| `name` | Package name |
| `duration` | Tour duration |
| `destination` | Tour destinations |
| `price` | Package price |
| `description` | Package description |
| `image` | Image path |
| `itinerary` | Tour itinerary |
| `includedServices` | Included services |
| `accommodation` | Accommodation details |

#### Bookings Collection

Stores tourist booking requests.

| Field | Description |
|---|---|
| `_id` | Unique booking identifier |
| `packageId` | Reference to the selected package |
| `customerName` | Customer name |
| `email` | Email address |
| `phone` | Phone number |
| `travelDate` | Requested travel date |
| `travellers` | Number of travellers |
| `vehicleType` | Preferred vehicle |
| `guideLanguage` | Preferred guide language |
| `guideCount` | Requested number of guides |
| `status` | Booking status |

#### Reviews Collection

Stores package reviews and ratings.

| Field | Description |
|---|---|
| `_id` | Unique review identifier |
| `packageId` | Reference to the related package |
| `reviewerName` | Reviewer name |
| `rating` | Numerical rating |
| `comment` | Review comment |
| `createdAt` | Creation timestamp |
| `updatedAt` | Modification timestamp |

#### Admins Collection

Stores administrator authentication information.

| Field | Description |
|---|---|
| `_id` | Unique administrator identifier |
| `username` | Administrator username |
| `password` | Hashed administrator password |

### 7.2 Database Relationships

**Packages and Bookings**

A single tour package can have multiple booking requests.

The `packageId` field in Bookings references the `_id` of the related Package.

Relationship: **One-to-Many**

**Packages and Reviews**

A single tour package can have multiple reviews.

The `packageId` field in Reviews references the `_id` of the related Package.

Relationship: **One-to-Many**

**Administrators**

The Admins collection is independent and is used for authentication and authorization.

These relationships are implemented using Mongoose ObjectId references.

### 7.3 Entity Relationship Diagram

![Database ER Diagram](docs/Database_ER_Diagram.png)

---

## 8. REST API Endpoints

The backend uses Express.js REST APIs for communication with MongoDB.

### 8.1 Tour Package APIs

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/packages` | Retrieve packages |
| GET | `/api/packages/:id` | Retrieve package details |
| POST | `/api/packages` | Create a package |
| PUT | `/api/packages/:id` | Update a package |
| DELETE | `/api/packages/:id` | Delete a package |

Creating, updating, and deleting packages require administrator authentication.

### 8.2 Booking APIs

| Method | Endpoint | Operation |
|---|---|---|
| POST | `/api/bookings` | Submit a booking request |
| GET | `/api/bookings` | Retrieve bookings for administrators |
| PUT | `/api/bookings/:id/status` | Update booking status |
| DELETE | `/api/bookings/:id` | Delete a booking |
| POST | `/api/bookings/track` | Track a booking |

Booking management endpoints are protected by administrator authentication.

The public booking tracking endpoint requires a booking reference and matching email address.

### 8.3 Review APIs

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/packages/:id/reviews` | Retrieve package reviews |
| POST | `/api/packages/:id/reviews` | Submit a review |
| DELETE | `/api/reviews/:id` | Delete a review |

Review deletion is restricted to authenticated administrators.

---

## 9. Authentication and Authorization

The application implements JWT-based administrator authentication.

### Authentication Process

1. The administrator enters valid login credentials.
2. The backend retrieves the corresponding administrator record.
3. The submitted password is verified against the stored bcrypt hash.
4. A JSON Web Token is generated after successful authentication.
5. The frontend stores the token in session storage.
6. Protected requests include the token in the Authorization header.
7. The backend verifies the token before allowing protected operations.

Invalid or expired authentication tokens are rejected.

### Protected Operations

- Creating tour packages
- Updating tour packages
- Deleting tour packages
- Retrieving all customer bookings
- Confirming or cancelling bookings
- Deleting booking records
- Deleting reviews through the protected API

---

## 10. Validation and Error Handling

Frontend and backend validation are used to improve data consistency and prevent invalid submissions.

### Package Validation

- Required package name
- Valid duration
- Non-negative price
- Required package information
- Supported input values

### Booking Validation

- Required customer information
- Valid email format
- Valid travel date
- Valid number of travellers
- Supported vehicle type
- Supported guide language
- Valid number of guides

### Review Validation

- Required reviewer name
- Rating between 1 and 5
- Required review comment
- Valid input lengths

### Error Handling

The application handles:

- Invalid form values
- Missing records
- Database operation failures
- Incorrect administrator credentials
- Unauthorized requests
- Invalid booking tracking information
- Invalid deletion requests

Error and success messages provide feedback to users and administrators.

---

## 11. User Interface and Responsive Design

The application uses a consistent visual design across tourist and administrator pages.

### Colour Theme

| Colour | Hex Code | Purpose |
|---|---|---|
| Navy Blue | `#0A2342` | Primary theme |
| Gold | `#D4AF37` | Highlights and accents |
| White | `#FFFFFF` | Content backgrounds |
| Light Blue-Grey | `#E8EEF5` | Secondary sections and banners |

### User Interface Components

- Responsive navigation bar
- Active-page highlighting
- Automatic homepage slideshow
- Tour package cards
- Search, filter, and sorting controls
- Destination cards
- Package Details pages
- Booking Form
- Booking reference display and Copy button
- Booking Tracking page
- Reviews and star ratings
- Administrator Dashboard
- Booking Management table
- Confirmation dialogs
- Success and error messages
- Shared footer

Responsive CSS supports desktop, tablet, and mobile layouts.

---

## 12. Application Pages

### Tourist Interface

| Page | Description |
|---|---|
| Home | Landing page with featured destinations and packages |
| Packages | Package listing, search, filtering, and sorting |
| Package Details | Itinerary, included services, accommodation, and reviews |
| Booking Form | Booking request submission |
| Track Booking | Booking status tracking |
| Destinations | Information about Sri Lankan destinations |
| About Us | Platform information |
| Contact Us | Contact information |

### Administrator Interface

| Page | Description |
|---|---|
| Admin Login | Administrator authentication |
| Admin Dashboard | Package CRUD management |
| Manage Bookings | Booking search, filtering, sorting, status updates, and deletion |

---

## 13. Project Structure

```text
Explore-Sri-Lanka/
│
├── frontend/
│   ├── public/
│   │   └── images/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   ├── server.js
│   └── package.json
│
├── docs/
│   └── Database_ER_Diagram.png
│
├── .gitignore
└── README.md
```

### Frontend

Contains React components, pages, routing configuration, image assets, and CSS styles.

### Backend

Contains the Express server, REST APIs, authentication logic, and Mongoose models.

### Database

MongoDB Atlas stores tour packages, bookings, reviews, and administrator records.

### Documentation

The `docs` directory contains the database ER diagram and supporting documentation assets.

---

## 14. Installation and Setup

### 14.1 Prerequisites

The application requires:

- Node.js and npm
- Git
- MongoDB Atlas
- A code editor

### 14.2 Source Code

The application source code is maintained in a Git repository.

The repository includes separate frontend and backend directories, static image assets, and project documentation.

### 14.3 Backend Setup

Open a terminal in the backend directory and install the required dependencies:

```bash
cd backend
npm install
```

The backend requires environment configuration for the MongoDB connection, JWT signing, and server port.

| Environment Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `PORT` | Backend server port |

Environment variables are maintained in a local `.env` file and are excluded from version control.

The MongoDB Atlas connection must permit network access from the backend environment.

### 14.4 Start the Backend

Run:

```bash
node server.js
```

The backend runs on port `5000` under the standard local configuration.

### 14.5 Frontend Setup

Open a separate terminal in the frontend directory:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Vite serves the React application locally, typically on port `5173`.

### 14.6 Administrator Access

The administrator interface is accessible through the application's Admin Login page.

Administrator accounts are maintained in MongoDB.

Successful authentication provides access to protected package and booking management functions.

### 14.7 Production Build

Create a production build of the frontend:

```bash
npm run build
```

Vite generates optimized frontend files in the `dist` directory.

---

## 15. Testing and Verification

The application has been tested for its main features and database operations.

| Test Case | Result |
|---|---|
| Create tour package | Passed |
| Read package information | Passed |
| Search packages | Passed |
| Filter packages by duration | Passed |
| Sort packages by price | Passed |
| Update tour package | Passed |
| Delete tour package | Passed |
| Protect packages with related records | Passed |
| Submit booking request | Passed |
| Generate booking reference | Passed |
| Copy booking reference | Passed |
| Confirm booking | Passed |
| Cancel booking | Passed |
| Delete booking | Passed |
| Track booking status | Passed |
| Submit reviews and ratings | Passed |
| Display average rating | Passed |
| Validate invalid input | Passed |
| Reject unauthorized operations | Passed |
| Verify MongoDB relationships | Passed |
| Verify persistent storage | Passed |
| Test responsive layouts | Passed |
| Complete frontend production build | Passed |

---

## 16. Version Control

Git is used to track project changes.

GitHub provides repository hosting, source code history, and version management.

The repository includes frontend source files, backend source files, static assets, and documentation.

Private environment variables and installed dependencies are excluded from version control.

### Git Commands

Check repository status:

```bash
git status
```

Stage changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "Update application features"
```

Push commits to the main branch:

```bash
git push origin main
```

View recent commits:

```bash
git log --oneline -10
```

---

## 17. Conclusion

Explore Sri Lanka – Journey Beyond Limits integrates destination discovery, tour package management, booking requests, booking tracking, and reviews within a single tourism platform.

The application combines a React frontend with an Express.js and Node.js backend, using MongoDB Atlas for persistent data storage.

Full CRUD functionality is implemented for tour packages, while booking management provides creation, retrieval, status updates, and deletion of customer requests.

Additional functionality includes administrator authentication, validation, review management APIs, search and filtering controls, responsive design, and booking reference tracking.

The result is a full-stack tourism web application with separate tourist and administrator interfaces.