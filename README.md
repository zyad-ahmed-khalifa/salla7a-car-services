# Salla7a 🚗🔧

Salla7a is a full-stack **MEAN Stack** web application that connects car owners with spare parts and emergency roadside assistance.

## ✨ Features

### 👤 Customer
- Register and login
- Manage vehicles
- Browse and search spare parts
- Filter parts based on car compatibility
- Add products to cart and place orders
- Create emergency requests
- Track emergency request status

### 🔧 Technician
- View available emergency requests
- Accept emergency requests
- View current emergency job
- Update request status
- Complete emergency services

### 🛠️ Admin
- Manage users
- Manage technicians
- Manage products
- Manage orders
- Manage emergency requests
- Assign emergency requests to technicians

## 🧰 Tech Stack

### Frontend
- Angular
- TypeScript
- tailwind / UI components

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Tools
- Git & GitHub
- Postman
- VS Code

## 🏗️ Architecture

The backend follows an MVC-based structure with a service layer:

```text
Routes
  ↓
Controller
  ↓
Service
  ↓
Model
  ↓
MongoDB
```

## 📁 Project Structure

```text
salla7a/
├── backend
│   ├── config
│   │   └── bd.config.js
│   ├── controller
│   │   ├── cars.controller.js
│   │   ├── emergency.controller.js
│   │   ├── orders.controller.js
│   │   ├── spareParts.controller.js
│   │   └── userController.js
│   ├── middlewares
│   │   ├── SpareParts.middlewares.js
│   │   ├── authMiddleware.js
│   │   ├── logged.middleware.js
│   │   └── role.js
│   ├── models
│   │   ├── cars.models.js
│   │   ├── emergencyRequest.model.js
│   │   ├── orders.models.js
│   │   ├── spareParts.models.js
│   │   └── user.models.js
│   ├── routes
│   │   ├── cars.route.js
│   │   ├── emergencyRequest.route.js
│   │   ├── orders.route.js
│   │   ├── spareParts.route.js
│   │   └── userroutes.js
│   ├── services
│   │   ├── cars.services.js
│   │   ├── emergency.service.js
│   │   ├── orders.services.js
│   │   └── spareParts.services.js
│   ├── README.md
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
├── frontend
│   ├── .angular
│   ├── public
│   │   └── favicon.ico
│   ├── src
│   │   ├── app
│   │   │   ├── component
│   │   │   │   ├── admin
│   │   │   │   │   ├── admin-dashboard.component.html
│   │   │   │   │   └── admin-dashboard.component.ts
│   │   │   │   ├── auth
│   │   │   │   │   ├── auth.component.html
│   │   │   │   │   └── auth.component.ts
│   │   │   │   ├── cart
│   │   │   │   │   ├── cart.component.html
│   │   │   │   │   └── cart.component.ts
│   │   │   │   ├── emergency
│   │   │   │   │   ├── available-emergencies.component.html
│   │   │   │   │   ├── available-emergencies.component.ts
│   │   │   │   │   ├── current-emergency.component.html
│   │   │   │   │   ├── current-emergency.component.ts
│   │   │   │   │   ├── emergency-history.component.html
│   │   │   │   │   ├── emergency-history.component.ts
│   │   │   │   │   ├── emergency-management.component.html
│   │   │   │   │   ├── emergency-management.component.ts
│   │   │   │   │   ├── emergency-request.component.html
│   │   │   │   │   ├── emergency-request.component.ts
│   │   │   │   │   ├── my-emergencies.component.html
│   │   │   │   │   └── my-emergencies.component.ts
│   │   │   │   ├── landing
│   │   │   │   │   ├── landing.component.html
│   │   │   │   │   └── landing.component.ts
│   │   │   │   ├── orders
│   │   │   │   │   ├── checkout.component.html
│   │   │   │   │   ├── checkout.component.ts
│   │   │   │   │   ├── orders-management.component.html
│   │   │   │   │   ├── orders-management.component.ts
│   │   │   │   │   ├── orders.component.html
│   │   │   │   │   └── orders.component.ts
│   │   │   │   ├── shared
│   │   │   │   │   └── components
│   │   │   │   │       ├── admin-layout.component.html
│   │   │   │   │       ├── admin-layout.component.ts
│   │   │   │   │       ├── customer-layout.component.html
│   │   │   │   │       ├── customer-layout.component.ts
│   │   │   │   │       ├── tech-layout.component.html
│   │   │   │   │       ├── tech-layout.component.ts
│   │   │   │   │       └── ui.components.ts
│   │   │   │   ├── spare-parts
│   │   │   │   │   ├── product-detail.component.html
│   │   │   │   │   ├── product-detail.component.ts
│   │   │   │   │   ├── products-management.component.html
│   │   │   │   │   ├── products-management.component.ts
│   │   │   │   │   ├── products.component.html
│   │   │   │   │   └── products.component.ts
│   │   │   │   ├── technicians
│   │   │   │   │   ├── tech-dashboard.component.html
│   │   │   │   │   ├── tech-dashboard.component.ts
│   │   │   │   │   ├── tech-profile.component.html
│   │   │   │   │   ├── tech-profile.component.ts
│   │   │   │   │   ├── technician-management.component.html
│   │   │   │   │   └── technician-management.component.ts
│   │   │   │   ├── users
│   │   │   │   │   ├── profile.component.html
│   │   │   │   │   ├── profile.component.ts
│   │   │   │   │   ├── user-management.component.html
│   │   │   │   │   └── user-management.component.ts
│   │   │   │   └── vehicles
│   │   │   │       ├── vehicles.component.html
│   │   │   │       └── vehicles.component.ts
│   │   │   ├── model
│   │   │   │   ├── cart.model.ts
│   │   │   │   ├── emergency.model.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── mock-data.ts
│   │   │   │   ├── order.model.ts
│   │   │   │   ├── role.model.ts
│   │   │   │   ├── select-option.model.ts
│   │   │   │   ├── spare-part.model.ts
│   │   │   │   ├── technician.model.ts
│   │   │   │   ├── user.model.ts
│   │   │   │   └── vehicle.model.ts
│   │   │   ├── service
│   │   │   │   ├── guards
│   │   │   │   │   └── role.guard.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── emergency.service.ts
│   │   │   │   ├── http.service.ts
│   │   │   │   ├── order.service.ts
│   │   │   │   ├── session.service.ts
│   │   │   │   ├── spare-part.service.ts
│   │   │   │   ├── technician.service.ts
│   │   │   │   ├── user.service.ts
│   │   │   │   └── vehicle.service.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.css
│   │   │   ├── app.html
│   │   │   ├── app.routes.ts
│   │   │   ├── app.spec.ts
│   │   │   └── app.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── .editorconfig
│   ├── .gitignore
│   ├── .postcssrc.json
│   ├── .prettierrc
│   ├── README.md
│   ├── RESTRUCTURED_STRUCTURE.md
│   ├── angular.json
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
└── README.md
```
```

## 🚨 Emergency Request Flow

```text
Customer
   ↓
Create Emergency Request
   ↓
Request becomes available to technicians
   ↓
Technician accepts request
   ↓
Request becomes In Progress
   ↓
Technician handles the problem
   ↓
Request becomes Completed
```

An emergency request can contain:

- Vehicle information
- Problem type
- Description
- Location
- Priority
- Request status
- Technician information
- Request timestamps

## 🔐 Authentication & Authorization

Salla7a uses **JWT** for authentication.

The system supports three roles:

| Role | Main Responsibilities |
|------|------------------------|
| Customer | Buy parts and request emergency services |
| Technician | Handle emergency requests |
| Admin | Manage the platform |

Protected endpoints require a JWT token using the `Authorization` header:

```http
Authorization: Bearer <token>
```

## 📡 Main API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Emergency Requests

```http
POST /emergency/create
GET  /emergency/get/my
GET  /emergency/get/:id
PUT  /emergency/edit/:id
DELETE /emergency/delete/:id
```

### Technician

```http
GET /technician/emergencies
PUT /technician/emergency/:id/accept
PUT /technician/emergency/:id/status
GET /technician/job
```

> Endpoint names may change depending on the final backend implementation.

## ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
cd salla7a
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Run the backend:

```bash
npm run start
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

Then open:

```text
http://localhost:4200
```

## 🧪 API Testing

The backend APIs can be tested using **Postman**.

For protected routes:

1. Login and get the JWT token.
2. Open the protected request.
3. Add the token as a Bearer Token.
4. Send the request.

## 🚀 Future Improvements

- Google Maps integration
- Real-time technician tracking
- Real-time notifications
- Online payments
- Customer reviews and ratings
- Technician location tracking
- Admin analytics dashboard

## 🎓 Project

Salla7a is an educational graduation project built using the **MEAN Stack**:

**MongoDB + Express.js + Angular + Node.js**

## 📄 License

This project is created for educational purposes.
