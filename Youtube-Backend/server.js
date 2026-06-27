import express from 'express';
import cors from 'cors';
import connectDatabase from './src/config/databse.js';
import dotenv from "dotenv";
import route from './src/routes/auth.routes.js';

const app = express();

dotenv.config();

connectDatabase();

app.use(express.json());
app.use(cors());

app.use("/auth", route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Started");
});