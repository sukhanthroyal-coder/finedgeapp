// ============================================
// FinEdge Application Entry Point
// ============================================
// This file wires together all modules from different team members
// ============================================

const express = require("express");
const cors = require("cors");

// Middleware (Member 3)
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

// API Version Routes
const v1Routes = require('./routes/v1');

const app = express();

// Core middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "FinEdge API is running",
    timestamp: new Date().toISOString()
  });
});

// API Versioning
// Mount versioned routes
app.use("/api/v1", v1Routes);

// Backward compatibility: Mount v1 routes at non-versioned paths
// This allows old clients to continue working
app.use("/api/users", require('./routes/v1/userRoutes'));
app.use("/api/transactions", require('./routes/v1/transactionRoutes'));

// API Info endpoint
app.get("/api", (req, res) => {
  res.json({
    name: "FinEdge API",
    version: "1.0.0",
    availableVersions: ["v1"],
    currentVersion: "v1",
    endpoints: {
      v1: {
        users: "/api/v1/users",
        transactions: "/api/v1/transactions",
        analytics: "/api/v1/analytics"
      }
    },
    documentation: "/api/v1/docs"
  });
});

// Default route
app.get("/", (req, res) => {
  res.json({ 
    message: "FinEdge API Server",
    version: "1.0.0",
    api: "/api",
    health: "/health",
    endpoints: {
      v1: {
        users: "/api/v1/users",
        transactions: "/api/v1/transactions"
      }
    }
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

module.exports = app;
