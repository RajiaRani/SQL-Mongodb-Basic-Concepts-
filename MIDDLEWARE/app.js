const express = require("express");
const app = express();

//sample middleware
app.use((req,res) => {
    console.log("Hii. I am middleware");
    res.send("middleware finished.")
});


//home page
app.get("/", (req,res) => {
    res.send("Hi I am Root");
});

//random midlleware
app.use("/random", (req,res) => {
    res.send("this is a random page!!");
 });


app.listen(8080, () => {
    console.log("server listening to post 8080");
});