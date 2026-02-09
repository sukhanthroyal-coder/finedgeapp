# Error Handling System

## Overview
This project uses a centralized error handling system with a custom `AppError` class and Express error middleware.

## Components

### 1. AppError Class (`src/utils/AppError.js`)
Custom error class that extends the native `Error` class with:
- `statusCode`: HTTP status code
- `status`: 'fail' for 4xx errors, 'error' for 5xx errors
- `isOperational`: Flag to distinguish operational errors from programming errors

**Usage:**
```javascript
throw new AppError('User not found', 404);
throw new AppError('Invalid input data', 400);
```

### 2. AsyncHandler Wrapper (`src/utils/asyncHandler.js`)
Wraps async route handlers to automatically catch errors and pass them to Express error middleware.

**Usage:**
```javascript
const asyncHandler = require('../utils/asyncHandler');

const getUser = asyncHandler(async (req, res) => {
  // No need for try-catch!
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.status(200).json({ success: true, data: user });
});
```

### 3. Error Handler Middleware (`src/middleware/errorHandler.js`)
Centralized error handling middleware that:
- Handles operational errors (AppError instances) with appropriate status codes
- Handles programming errors (unexpected errors) with generic 500 response
- Logs errors appropriately based on severity
- Includes stack traces in development mode only

**Features:**
- Operational errors: Returns error message to client
- Programming errors: Returns generic message in production, detailed in development
- Proper logging: Different log levels for client vs server errors

## Error Flow

1. **Controller throws AppError:**
   ```javascript
   throw new AppError('User not found', 404);
   ```

2. **AsyncHandler catches error:**
   - Wraps async functions
   - Automatically calls `next(error)` on rejection

3. **Error Handler processes:**
   - Checks if error is operational (AppError)
   - Sets appropriate status code
   - Formats response
   - Logs error details

## Best Practices

### ✅ DO:
- Use `AppError` for all expected errors (404, 400, 401, etc.)
- Wrap async controllers with `asyncHandler`
- Let errors bubble up from services/models
- Use descriptive error messages

### ❌ DON'T:
- Use try-catch in controllers (asyncHandler handles it)
- Return error responses directly from controllers
- Throw generic Error objects (use AppError)
- Catch errors in services unless you need to transform them

## Example Controller Pattern

**Before (with try-catch):**
```javascript
const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
```

**After (with AppError and asyncHandler):**
```javascript
const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.status(200).json({ success: true, data: user });
});
```

## Common Error Status Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error (programming errors)

## Error Response Format

**Operational Error:**
```json
{
  "success": false,
  "status": "fail",
  "error": {
    "message": "User not found"
  }
}
```

**Development Mode (includes stack):**
```json
{
  "success": false,
  "status": "error",
  "error": {
    "message": "Something went wrong!",
    "stack": "..."
  }
}
```

