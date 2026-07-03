import express from 'express';
import cors from 'cors';
import connectDatabase from './src/config/databse.js';
import dotenv from "dotenv";
import route from './src/routes/auth.routes.js';
import authRoute from './src/routes/auth.routes.js'
import videoRoute from './src/routes/video.route.js'

const app = express();

dotenv.config();

connectDatabase();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/", videoRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});