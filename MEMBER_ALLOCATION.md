# FinEdge Project - Member-Wise Module Allocation

## Overview
This document outlines the module allocation for the FinEdge Financial Management API project.

---

## Member 1: User APIs Module
**Key Deliverables:** User routes and controller

### Files Assigned:
- `src/routes/userRoutes.js` - Define all user-related API routes
- `src/controllers/userController.js` - Handle HTTP requests/responses for users
- `src/services/userService.js` - Business logic for user operations
- `src/models/userModel.js` - Data access layer for users (JSON file operations)

### Responsibilities:
- Implement CRUD operations for users
- Handle user data validation
- Manage user data in `src/data/users.json`
- Define API endpoints: GET, POST, PUT, DELETE for `/api/users`

### Expected Endpoints:
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

---

## Member 2: Transaction APIs Module
**Key Deliverables:** Transaction module implementation

### Files Assigned:
- `src/routes/transactionRoutes.js` - Define all transaction-related API routes
- `src/controllers/transactionController.js` - Handle HTTP requests/responses for transactions
- `src/services/transactionService.js` - Business logic for transaction operations
- `src/models/transactionModel.js` - Data access layer for transactions (JSON file operations)

### Responsibilities:
- Implement CRUD operations for transactions
- Handle transaction data validation
- Manage transaction data in `src/data/transactions.json`
- Define API endpoints: GET, POST, PUT, DELETE for `/api/transactions`
- Implement user-specific transaction queries

### Expected Endpoints:
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/user/:userId` - Get transactions by user ID

---

## Member 3: Middleware & Utils Module
**Key Deliverables:** Error handling, validation, and logging

### Files Assigned:
- `src/middleware/errorHandler.js` - Centralized error handling middleware
- `src/middleware/logger.js` - Request/response logging middleware
- `src/middleware/validator.js` - Input validation middleware

### Responsibilities:
- Implement global error handling for the application
- Create logging middleware for request/response tracking
- Build validation middleware for request validation
- Ensure consistent error response format
- Support different log levels and formats

### Key Features:
- **Error Handler:** Catch and format all application errors
- **Logger:** Log all incoming requests and outgoing responses with timing
- **Validator:** Validate request bodies, params, and query parameters

---

## Member 4: Analytics & Documentation Module
**Key Deliverables:** Summary logic and Postman collection

### Files Assigned:
- `src/utils/analytics.js` - Analytics and summary calculation functions
- `src/utils/aiHelper.js` - AI-related helper functions (optional)
- `FinEdge_API.postman_collection.json` - Postman API collection

### Responsibilities:
- Implement financial summary calculations
- Create transaction statistics and analytics
- Build spending insights and reports
- Create and maintain Postman collection for API testing
- Document API endpoints and usage

### Expected Features:
- User financial summary (total income, expenses, balance)
- Transaction statistics by category, date range, etc.
- Spending insights and patterns
- Budget analysis
- Complete Postman collection with all endpoints

---

## Integration Points

### App.js Integration:
All modules will be integrated in `src/app.js`:
- Middleware (Member 3) will be registered first
- Routes (Members 1 & 2) will be registered after middleware
- Error handler (Member 3) will be registered last

### Data Files:
- `src/data/users.json` - Managed by Member 1
- `src/data/transactions.json` - Managed by Member 2

---

## Notes:
- Each member should follow the TODO comments in their assigned files
- All modules should follow consistent error handling patterns (Member 3's errorHandler)
- Use Member 3's validator middleware for input validation
- Member 4 should update Postman collection as APIs are implemented
- Coordinate with other members for integration points

