const express = require("express");
const cors = require("cors");

const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const v1Routes = require('./routes/v1');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "FinEdge API is running",
    timestamp: new Date().toISOString()
  });
});


app.use("/api/v1", v1Routes);

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


app.use(errorHandler);

module.exports = app;
