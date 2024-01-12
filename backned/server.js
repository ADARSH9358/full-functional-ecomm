import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
// import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
// here we have use type:"module"

//configure env
dotenv.config();

//databse config
// connectDB();
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_url);
  console.log('database connected')
}


//rest object
const app = express();

//middelwares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
      // bycane is only a color
  );
});
