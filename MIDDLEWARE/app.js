const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

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

const checkPass = (req,res,next) => {
    let {pass} = req.query;
    if( pass == "india123"){
        next();
    }
    throw new ExpressError(401,"Please enter the valid password!!");
};

app.get("/pass",checkPass,(req,res) => {
    res.send("correct password");
});

//using token as a middleware
const checkToken = (req, res, next) => {
  let {token} = req.query;
  if( token == "itsme"){
    next();
  };
  res.send("Opps!! Please enter the correct information");
};

app.get("/info", checkToken,(req,res) => {
    res.send("Here you information");
});

//token access for protection
 app.use("/api", (req,res,next) => {
    let { token }  = req.query;
    if( token == "giveaccess"){
        next();
    };
    res.send("Acess Denied");
 });

 app.get("/api", (req,res)=> {
     res.send(data);
 });


app.get("/err", (req,res) => {
    abcd==abcd;
});
// app.use((err, req, res, next) => {
//     console.log("--------- ERROR -----------------");
//     //next(err);
//     res.send(err);
// });
app.use((err,req,res,next) => {

    let {status=500, message="my default message"} = err;//set the default status and message
    res.status(status).send(message);
});


// app.use((req, res, next) => {
//     //console.log(req);
//     // console.log(req.method); // yaha se hum request ka method pata karte hai
//     // console.log(req.method, req.path, req.hostname, req.hash, req.protocol, req.href, req.pathname);
//     // req.time = Date.now();
//     req.time = new Date(Date.now()).toString(); //correct present time show karne ke liye
//     console.log(req.method, req.path, req.time);
//     next();
// });


//middleware for particular case
app.use("/random", (req,res,next) => {
   console.log("i am only for Random route");
   next();
});


//home page
app.get("/", (req, res) => {
    res.send("Hi I am Root");
});

app.get("/admin", (req,res) => {
 throw new ExpressError (404, " Access to admin is forbidden");
});

//random midlleware
app.use("/random", (req, res) => {
    res.send("this is a random page!!");
});


//404 page ke liye
app.use((req,res) => {
    res.send(404);
    res.send(" Opps!! Page Not Found!!");
});

app.listen(8080, () => {
    console.log("server listening to post 8080");
});