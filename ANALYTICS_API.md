# Analytics API Documentation

## Overview
The Analytics API provides comprehensive financial insights, summaries, and statistics for users and transactions.

## Endpoints

### 1. Get User Financial Summary
**GET** `/api/v1/analytics/user/:userId/summary`

Get a comprehensive financial summary for a specific user.

**Query Parameters:**
- `startDate` (optional) - Start date filter (ISO format: YYYY-MM-DD)
- `endDate` (optional) - End date filter (ISO format: YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    },
    "summary": {
      "totalIncome": 5000.00,
      "totalExpense": 3500.00,
      "balance": 1500.00,
      "transactionCount": 45,
      "incomeCount": 5,
      "expenseCount": 40
    },
    "categoryBreakdown": {
      "food": { "count": 15, "total": 1200.00 },
      "transport": { "count": 10, "total": 500.00 },
      "entertainment": { "count": 8, "total": 800.00 }
    },
    "monthlyBreakdown": {
      "2024-01": { "income": 2000, "expense": 1200, "count": 15 },
      "2024-02": { "income": 2000, "expense": 1500, "count": 18 }
    },
    "topSpendingCategory": {
      "category": "food",
      "amount": 1200.00,
      "count": 15
    }
  }
}
```

---

### 2. Get User Spending Insights
**GET** `/api/v1/analytics/user/:userId/insights`

Get AI-powered spending insights and recommendations for a user.

**Query Parameters:**
- `startDate` (optional) - Start date filter
- `endDate` (optional) - End date filter

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    },
    "summary": {
      "totalIncome": 5000.00,
      "totalExpense": 3500.00,
      "balance": 1500.00,
      "transactionCount": 45
    },
    "insights": [
      {
        "type": "success",
        "message": "Great! You have a positive balance of $1500.00."
      },
      {
        "type": "info",
        "message": "Your top spending category is 'food' with $1200.00 (34.3% of total expenses)."
      }
    ],
    "recommendations": [
      "Review and reduce expenses in non-essential categories"
    ],
    "topCategories": [
      {
        "category": "food",
        "amount": 1200.00,
        "count": 15,
        "percentage": "34.3"
      }
    ]
  }
}
```

**Insight Types:**
- `success` - Positive financial behavior
- `warning` - Areas of concern
- `info` - Informational insights

---

### 3. Get Category Breakdown
**GET** `/api/v1/analytics/user/:userId/categories`

Get detailed category-wise spending breakdown.

**Query Parameters:**
- `startDate` (optional) - Start date filter
- `endDate` (optional) - End date filter

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-12-31"
    },
    "totalExpense": 3500.00,
    "categories": [
      {
        "category": "food",
        "totalAmount": 1200.00,
        "transactionCount": 15,
        "percentage": "34.29",
        "averageAmount": "80.00"
      },
      {
        "category": "transport",
        "totalAmount": 500.00,
        "transactionCount": 10,
        "percentage": "14.29",
        "averageAmount": "50.00"
      }
    ],
    "categoryCount": 5
  }
}
```

---

### 4. Get Transaction Statistics
**GET** `/api/v1/analytics/stats`

Get comprehensive transaction statistics with flexible filtering.

**Query Parameters:**
- `userId` (optional) - Filter by user ID
- `startDate` (optional) - Start date filter
- `endDate` (optional) - End date filter
- `category` (optional) - Filter by category
- `type` (optional) - Filter by type (`income` or `expense`)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTransactions": 100,
    "totalAmount": 10000.00,
    "totalIncome": 6000.00,
    "totalExpense": 4000.00,
    "averageTransactionAmount": 100.00,
    "byCategory": {
      "food": {
        "count": 30,
        "total": 2000.00,
        "income": 0,
        "expense": 2000.00
      },
      "salary": {
        "count": 5,
        "total": 5000.00,
        "income": 5000.00,
        "expense": 0
      }
    },
    "byType": {
      "income": {
        "count": 20,
        "total": 6000.00
      },
      "expense": {
        "count": 80,
        "total": 4000.00
      }
    },
    "dateRange": {
      "earliest": "2024-01-01T00:00:00.000Z",
      "latest": "2024-12-31T23:59:59.999Z"
    }
  }
}
```

---

## Features

### Financial Summary
- Total income, expenses, and balance
- Transaction counts by type
- Category-wise breakdown
- Monthly trends
- Top spending category identification

### Spending Insights
- Balance analysis (positive/negative)
- Spending trend analysis
- Savings rate calculation
- Transaction frequency insights
- Personalized recommendations

### Category Analysis
- Category-wise spending totals
- Percentage of total expenses
- Average transaction amounts
- Transaction counts per category

### Statistics
- Comprehensive transaction statistics
- Flexible filtering options
- Date range analysis
- Type and category breakdowns

---

## Usage Examples

### Get summary for last month
```
GET /api/v1/analytics/user/1/summary?startDate=2024-11-01&endDate=2024-11-30
```

### Get insights for current year
```
GET /api/v1/analytics/user/1/insights?startDate=2024-01-01&endDate=2024-12-31
```

### Get statistics for food category
```
GET /api/v1/analytics/stats?category=food&type=expense
```

### Get user-specific statistics
```
GET /api/v1/analytics/stats?userId=1&startDate=2024-01-01
```

---

## Error Handling

All endpoints use the standard error handling:
- `404` - User not found
- `400` - Invalid parameters
- `500` - Server error

Error responses follow the standard format:
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

## Notes

- All date filters use ISO 8601 format (YYYY-MM-DD)
- Amounts are returned as numbers (not strings)
- Percentages are returned as strings with 2 decimal places
- Category names are case-sensitive
- Empty results return empty arrays/objects, not null

