# API Versioning Guide

## Overview
The FinEdge API uses URL path versioning to manage API changes while maintaining backward compatibility.

## Version Structure

```
/api/v1/users          - Version 1 User APIs
/api/v1/transactions  - Version 1 Transaction APIs
```

## Current Version
- **v1** - Current stable version

## Backward Compatibility
Non-versioned routes are automatically redirected to v1:
- `/api/users` → `/api/v1/users`
- `/api/transactions` → `/api/v1/transactions`

## Adding a New Version

When you need to introduce breaking changes:

1. **Create new version folder:**
   ```bash
   mkdir -p src/routes/v2
   ```

2. **Copy and modify routes:**
   - Copy `src/routes/v1/*` to `src/routes/v2/`
   - Update routes as needed
   - Update controllers/services if needed

3. **Create v2 index:**
   ```javascript
   // src/routes/v2/index.js
   const express = require('express');
   const router = express.Router();
   const userRoutes = require('./userRoutes');
   const transactionRoutes = require('./transactionRoutes');
   
   router.use('/users', userRoutes);
   router.use('/transactions', transactionRoutes);
   
   module.exports = router;
   ```

4. **Update app.js:**
   ```javascript
   const v2Routes = require('./routes/v2');
   app.use("/api/v2", v2Routes);
   ```

5. **Update API info endpoint** to include v2 in availableVersions

## Versioning Best Practices

### When to Create a New Version
- Breaking changes to request/response formats
- Removing endpoints
- Changing authentication/authorization
- Major refactoring of business logic

### When NOT to Create a New Version
- Adding new endpoints (add to existing version)
- Adding optional fields to responses
- Bug fixes
- Performance improvements

## API Endpoints

### Version 1 (Current)

#### Users
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

#### Transactions
- `GET /api/v1/transactions` - Get all transactions
- `GET /api/v1/transactions/:id` - Get transaction by ID
- `POST /api/v1/transactions` - Create transaction
- `PUT /api/v1/transactions/:id` - Update transaction
- `DELETE /api/v1/transactions/:id` - Delete transaction
- `GET /api/v1/transactions/user/:userId` - Get transactions by user ID

## Version Detection

Clients can specify version in:
1. **URL Path** (recommended): `/api/v1/users`
2. **Accept Header** (future): `Accept: application/vnd.finedge.v1+json`

## Migration Strategy

When deprecating a version:
1. Announce deprecation with timeline
2. Keep version active for at least 6 months
3. Provide migration guide
4. Add deprecation warnings in responses
5. Remove version after deprecation period

## Example: Migrating from v1 to v2

```javascript
// v1 response
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John",
    "email": "john@example.com"
  }
}

// v2 response (breaking change)
{
  "success": true,
  "user": {
    "id": 1,
    "fullName": "John Doe",  // Changed from "name"
    "emailAddress": "john@example.com"  // Changed from "email"
  }
}
```

