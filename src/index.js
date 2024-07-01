import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';
import errorMiddleware from "./middlewares/errorMiddlewares.js";
import taskRoutes from "./modules/tasks/taskRoutes.js";
import authRoutes from "./modules/auth/authRoutes.js"
import helmet from "helmet";
import swaggerDocs from "../swagger.js";
import swaggerUi from "swagger-ui-express";

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