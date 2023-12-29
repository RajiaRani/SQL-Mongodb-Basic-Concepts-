const express = require("express");
const app = express();

//---------------- Express Default Error-Handler -------------


app.get("/error", (req,res) => {
    abcd = abcd;
});
app.use((err, req, res, next) => {
    //console.log(err);
    console.log("--------ERROR--------");
    next(err);
});

app.use((err,req,res,next) => {
    console.log("------ Error 2 -------");
    next(err);
});


const checkToken = (req,res,next) => {
    let {token} = req.query;
    if(token == "giveaccess"){
        next();
    };

    throw new Error ("Acess Denied");
};

app.get("/api", checkToken,(req,res) => {
  res.send("data");
});

app.listen(8080, () => {
 console.log("i am lsitening on port 8080");
});