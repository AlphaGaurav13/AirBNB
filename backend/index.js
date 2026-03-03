const express =  require("express");
let app = express();
const port  = 8000;

app.get("/", (req, res) => {
    res.send("hello from sever");
});


app.listen(port, () => {
    console.log("Server Started");
})
