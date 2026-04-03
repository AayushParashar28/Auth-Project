# Auth-Project

A backend authentication service I built to learn and practice Node.js, Express, and MongoDB. It handles user registration, login, OTP verification, JWT-based route protection and password reset flow.

## Live API
https://auth-project-y12c.onrender.com/api-docs

## Why I built this
I wanted to understand how authentication actually works under the hood — not just use a library. So I built the whole thing from scratch including OTP flow, JWT, password hashing, route protection and forgot password functionality.

## Stack
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT for authentication
- Nodemailer for sending OTPs
- Bcrypt for password hashing
- Joi for input validation
- Swagger for API docs
- Deployed on Render

## What it does
- Register a new user and send OTP to their email
- Verify OTP to activate account
- Login with email + password, get OTP on email
- Verify login OTP and receive JWT token
- Protected routes that only work with valid JWT
- Rate limiting on login and signup to block brute force
- Input validation with proper error messages
- Forgot password flow with OTP verification
- Reset password with old password check

## Project Structure
```
src/
├── config/
│   ├── database.config.js
│   ├── emailServices.js
│   └── swagger.js
├── Controller/
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── validationMiddleware.js
│   └── errorhandler.js
├── Model/
│   ├── indexModel.js
│   └── userModel.js
├── Route/
│   └── userRoute.js
├── utils/
│   ├── passwordhelper.js
│   ├── validation.js
│   └── rateLimiter.js
└── server.js
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /signup | Register new user | No |
| POST | /checkotp | Verify signup OTP | No |
| POST | /login | Login | No |
| POST | /verifylogin | Verify login OTP + JWT | No |
| POST | /forgotpassword | Send OTP for password reset | No |
| POST | /verifyresetotp | Verify password reset OTP | No |
| POST | /resetpassword | Reset password | No |
| GET | /user | Get all users | Yes |
| PUT | /updatedetail | Update mobile | Yes |
| DELETE | /deletebyemail | Delete user | Yes |

## Running locally
```bash
git clone https://github.com/AayushParashar28/Auth-Project.git
cd Auth-Project/src
npm install
```

Create a `.env` file inside src:
```
JWT_SECRET=your_secret_key
GMAIL=your_gmail
GMAIL_PASSWORD=your_app_password
MONGO_URI=your_mongodb_uri
```
```bash
npm run dev
```

Swagger UI will be available at `http://localhost:4000/api-docs`

## Things I learned
- How JWT authentication works
- OTP generation and expiry logic
- Protecting routes with custom middleware
- Input validation using Joi
- Forgot password and secure password reset flow
- Preventing reuse of old passwords
- Deploying Node.js apps on Render with cloud MongoDB