require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddlewares.js");
const taskRoutes = require("./modules/tasks/taskRoutes.js");
const authRoutes = require("./modules/auth/authRoutes.js");
const helmet = require("helmet");
const swaggerDocs = require("./swagger.js");
const swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || 3000;

// ----------------------------------------

// MIDDLEWARE
const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50kb" }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

// use routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorMiddleware);

// listen port
app.listen(port, () => console.log(`Server started on port ${port}`));
