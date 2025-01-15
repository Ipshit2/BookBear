import "dotenv/config";
import cors from 'cors'
import express from "express";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 3000;

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
};
app.use(cors(corsOptions))
app.use(cookieParser())

import routes from "./routes/userRoutes.js";
app.use("/user",routes);

app.listen(PORT, () => console.log(`Server is running on PORT  ${PORT}`))