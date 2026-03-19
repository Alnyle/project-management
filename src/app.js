import express from "express";
import cors from "cors";
import dotev from "dotenv";

dotev.config({
    path: "./.env"
});


const app = express(); 
// limit: maximum request body size, default is 100kb, here we set it to 16kb 
app.use(express.json({ limit: "16kb" }));

// allow to parse data sended in url encoded format, 
// extended: true allows to parse nested objects,
//  default is false, here we set it to true, limit is the same as above
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// allow to serve static files from the public folder
app.use(express.static("public"))

// cors configuration
// origin: process.env.CORS_ORIGIN || "*",
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

import healthCheckRouter from "./routes/healthCheck.routes.js";
app.use("/api/v1/healthCheck", healthCheckRouter);
export default app;