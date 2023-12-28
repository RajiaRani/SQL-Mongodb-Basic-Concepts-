const express = require("express");
const app = express();


app.get("/", (req,res) => {
    res.send();
});
app.listen(8080, () => {
    console.log("server listening to post 8080");
});