import app from "./app.js";
import dotev from "dotenv";
import connectDB from "./db/index.js";

dotev.config({
    path: "./.env"
});

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.error("MongoDB connection error", err);
        process.exit(1);
    })




