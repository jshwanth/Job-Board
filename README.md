# Job Board - A MERN Stack Application

This is a full-stack job board application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It allows users to browse job listings, and for administrators, it provides a dashboard to manage jobs, users, and applications.

<img width="1176" height="915" alt="image" src="https://github.com/user-attachments/assets/407e9808-5fbd-4177-9902-b9eb8b45a1ab" />

## 🚀 Live Demo

You can check out the live version of the application here: [Link](https://job-board-codsoft.onrender.com/)

## ✨ Features

* **User Authentication:** Secure JWT-based authentication for user and admin login/registration.
* **Job Listings:** Publicly accessible page displaying all available jobs with search and filter capabilities.
* **Job Details:** A detailed view for each job posting.
* **Admin Dashboard:** A protected route for administrators to perform CRUD (Create, Read, Update, Delete) operations on:
    * Jobs
    * User accounts
* **Statistical Analysis:** The admin dashboard displays key stats like the number of users and total jobs.
* **Responsive Design:** The user interface is built to be fully responsive and mobile-friendly.

## 🛠️ Tech Stack

* **Frontend:**
    * [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
    * [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps.
    * [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for styling.
* **Backend:**
    * [Node.js](https://nodejs.org/) - A JavaScript runtime environment.
    * [Express.js](https://expressjs.com/) - A web application framework for Node.js.
    * [MongoDB](https://www.mongodb.com/) - A NoSQL database for storing application data.
    * [Mongoose](https://mongoosejs.com/) - An ODM (Object Data Modeling) library for MongoDB and Node.js.
* **Authentication:**
    * [JSON Web Tokens (JWT)](https://jwt.io/) - For securing routes and authenticating users.

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:

* [Node.js](https://nodejs.org/en/download/) (which includes npm)
* [Git](https://git-scm.com/)
* [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/jshwanth/Job-Board.git](https://github.com/jshwanth/Job-Board.git)
    cd Job-Board
    ```

2.  **Install Server Dependencies:**
    Navigate to the `api` directory and install the necessary packages.
    ```sh
    cd api
    npm install
    ```

3.  **Install Client Dependencies:**
    Navigate to the `client` directory from the root folder and install its packages.
    ```sh
    cd ../client
    npm install
    ```

4.  **Set up Environment Variables:**
    In the `api` directory, create a `.env` file and add the following variables.
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    Replace `your_mongodb_connection_string` with your actual MongoDB connection string and choose a secure secret for `your_jwt_secret_key`.

5.  **Run the Application:**
    You will need two terminals to run both the client and server concurrently.

    * **In the first terminal (from the `api` directory), start the backend server:**
        ```sh
        # from /api
        npm start
        ```

    * **In the second terminal (from the `client` directory), start the React development server:**
        ```sh
        # from /client
        npm run dev
        ```

The application should now be running, with the client available at `http://localhost:5173` and the server at `http://localhost:8000`.
