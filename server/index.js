import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import postRoute from "./routes/postRoute.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOOSE_URI =
  "mongodb+srv://Poorvi03:Poorvi03@cluster0.4h1o5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  

mongoose
  .connect(MONGOOSE_URI)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`running and connected to DB => http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));

app.use("/uploads", express.static("uploads"));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoute);
