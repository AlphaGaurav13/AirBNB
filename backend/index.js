const express =  require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db.js");
const authRouter = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");
dotenv.config();

let app = express();
const port  = process.env.PORT || 6000


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);



app.listen(port, () => {
    connectDb();
    console.log("Server Started");
})
