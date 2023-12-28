const express = require("express");
const app = express();

//sample middleware
// app.use((req,res,next) => {
//     // let {query} = req.query;
//     // console.log(query);
//     //res.send("middleware finished.");
//     console.log("Hii. I am middleware");
//     next();
// });

// app.use((req,res,next) => {
//     console.log("Hii.I am 2nd Middleware.");
//     next();
// });

// app.use((req,res,next) => {
//     console.log("hii i am 3rd middleware");
//     next();
// });

app.use((req,res,next) => {
    console.log(req);
    next();
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