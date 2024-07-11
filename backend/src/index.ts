import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();
import morgan from "morgan";
import path from "path";

import db from "./utils/database";
import indexRoutes from "./routes/index.routes";

const app = express();
const port = process.env.PORT || 3000;

//connect to mongoDB
db.connect();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('../uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.send("Hello World");
});

//routes
indexRoutes(app);


app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
