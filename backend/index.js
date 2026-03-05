const express =  require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db.js");
const authRouter = require("./routes/auth.routes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user.routes.js");
const { default: listingRouter } = require("./routes/listing.routes.js");
dotenv.config();

let app = express();
const port  = process.env.PORT || 6000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);


app.listen(port, () => {
    connectDb();
    console.log("Server Started");
})
