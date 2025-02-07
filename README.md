# Next.js Blogging Platform with Authentication

## Overview

This is a **Next.js**-based web application that allows users to sign up, verify their email, reset their password, and create blog posts in real time. The authentication system is built using **Nodemailer** for email verification and password recovery. Once logged in, users can create, edit, delete, and retrieve their own posts. Additionally, a **feed section** displays all user posts.

## Features

- **User Authentication**
  - Email verification using **Nodemailer** (Real-time)
  - Forgot password functionality
- **Post Management**
  - Create, edit, delete, and retrieve posts
  - User-specific post retrieval
  - Feed section to browse all posts
- **Scalability**
  - Future AI integration to generate post content in the "Create Post" section

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API Routes, MongoDB (Mongoose)
- **Email Services:** Nodemailer
- **Authentication:** JWT, Cookies

## Installation

```sh
# Clone the repository
git clone https://github.com/krishsinghhura/BlogSpot
cd BlogSpot

# Install dependencies
npm install

# Setup environment variables (.env file)
MONGO_URI=your_mongodb_connection
DB_NAME=your_database_name
TOKEN_SECRET=your_jwt_secret
DOMAIN=your_domain
USER=your_email@example.com
PASS=your_email_password

# Start the development server
npm run dev
```

## Usage

1. **Sign Up:** Register with your email.
2. **Email Verification:** Click the link sent via email to verify your account.
3. **Login:** Access your account after verification.
4. **Create Posts:** Add blog content with titles and descriptions.
5. **Manage Posts:** Edit or delete your own posts.
6. **Forgot Password:** Reset password using the email recovery feature.
7. **Future AI Integration:** Auto-suggest content during post creation.

## Future Enhancements

- AI-powered content suggestions for blog posts
- User profiles with avatar uploads
- Commenting system for posts

## License

This project is licensed under the MIT License.
