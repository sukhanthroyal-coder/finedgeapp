
---

# FinEdge API

A RESTful Financial Management API providing **User Management, Transaction Tracking, Analytics, Insights, and Versioned APIs** with centralized error handling.

---

## Features

* User CRUD Operations
* Transaction CRUD Operations
* User-specific Transactions
* Financial Summary & Analytics
* AI-powered Spending Insights
* Category Breakdown & Statistics
* API Versioning (v1)
* Centralized Error Handling
* Validation & Logging Middleware

---

# Base URL

```
/api/v1
```

Non-versioned routes automatically redirect to `v1`.

---

#  API Modules

## Users

**Base Route:** `/api/v1/users`

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/users`     | Get all users  |
| GET    | `/users/:id` | Get user by ID |
| POST   | `/users`     | Create user    |
| PUT    | `/users/:id` | Update user    |
| DELETE | `/users/:id` | Delete user    |

---

## Transactions

**Base Route:** `/api/v1/transactions`

| Method | Endpoint                     | Description              |
| ------ | ---------------------------- | ------------------------ |
| GET    | `/transactions`              | Get all transactions     |
| GET    | `/transactions/:id`          | Get transaction by ID    |
| POST   | `/transactions`              | Create transaction       |
| PUT    | `/transactions/:id`          | Update transaction       |
| DELETE | `/transactions/:id`          | Delete transaction       |
| GET    | `/transactions/user/:userId` | Get transactions by user |

---

# Analytics APIs

## 1. User Financial Summary

**GET** `/api/v1/analytics/user/:userId/summary`

**Query Params:**

* `startDate` (YYYY-MM-DD)
* `endDate` (YYYY-MM-DD)

**Returns:**

* Total income, expenses, balance
* Transaction counts
* Category breakdown
* Monthly breakdown
* Top spending category

---

## 2. User Spending Insights

**GET** `/api/v1/analytics/user/:userId/insights`

Returns:

* Financial summary
* AI-powered insights (`success`, `warning`, `info`)
* Spending recommendations
* Top categories with percentages

---

## 3. Category Breakdown

**GET** `/api/v1/analytics/user/:userId/categories`

Returns:

* Total expense
* Category-wise totals
* Percentage distribution
* Average transaction amount

---

## 4. Transaction Statistics

**GET** `/api/v1/analytics/stats`

**Filters:**

* `userId`
* `startDate`
* `endDate`
* `category`
* `type` (`income`, `expense`)

Returns:

* Total transactions
* Income & expense totals
* Category & type breakdown
* Date range analysis

---

# API Versioning

### Current Version

```
v1 (stable)
```

### Versioning Strategy

* URL-based versioning (`/api/v1/...`)
* New versions only for breaking changes
* Backward compatibility maintained
* Minimum 6-month deprecation window

---

#  Error Handling System

Centralized error handling using:

### AppError Class

Custom operational error class:

```js
throw new AppError('User not found', 404);
```

### Async Handler

Wraps async controllers — no try/catch needed.

### Global Error Middleware

* Operational errors → Proper status & message
* Programming errors → Generic 500 in production
* Stack trace shown only in development

### Error Response Format

```json
{
  "success": false,
  "status": "fail",
  "error": {
    "message": "User not found"
  }
}
```

---

# Project Structure

```
src/
│
├── routes/
│   ├── v1/
│   │   ├── userRoutes.js
│   │   └── transactionRoutes.js
│
├── controllers/
├── services/
├── models/
├── middleware/
│   ├── errorHandler.js
│   ├── logger.js
│   └── validator.js
│
├── utils/
│   ├── analytics.js
│   └── aiHelper.js
│
└── data/
    ├── users.json
    └── transactions.json
```

---

# Analytics Features

* Income vs Expense Analysis
* Savings Rate Calculation
* Category-wise Spending %
* Monthly Trends
* Transaction Frequency Analysis
* Top Spending Category Detection

---

# Usage Examples

### Get Monthly Summary

```
GET /api/v1/analytics/user/1/summary?startDate=2024-11-01&endDate=2024-11-30
```

### Get Insights

```
GET /api/v1/analytics/user/1/insights?startDate=2024-01-01&endDate=2024-12-31
```

### Get Food Expense Stats

```
GET /api/v1/analytics/stats?category=food&type=expense
```

---

#  Status Codes

| Code | Meaning      |
| ---- | ------------ |
| 200  | Success      |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |
| 500  | Server Error |

---

# Development Guidelines

* Use `AppError` for expected errors
* Wrap controllers with `asyncHandler`
* Do not use try/catch in controllers
* Keep business logic in services
* Maintain consistent response format
* Use ISO 8601 date format (YYYY-MM-DD)

---

# Module Allocation

| Member | Module                    |
| ------ | ------------------------- |
| 1      | Users API                 |
| 2      | Transactions API          |
| 3      | Middleware & Utils        |
| 4      | Analytics & Documentation |

---

#  Postman Collection

`FinEdge_API.postman_collection.json`
Includes all endpoints with example requests.

---

#  Notes

* Amounts are numbers (not strings)
* Percentages returned as strings (2 decimals)
* Empty results return empty arrays/objects
* Category names are case-sensitive

---


