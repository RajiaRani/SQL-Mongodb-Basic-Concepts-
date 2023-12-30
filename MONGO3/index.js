const express = require("express");
const app = express();

const path = require("path");
app.set("views", path.join(__dirname,"/views"));
app.set("view engine", "ejs");

const Chat = require("./models/chat.js"); // require the chat file

const methodOverride = require("method-override");
app.use(methodOverride("_method"));


const mongoose = require("mongoose");
main()
.then(() => {
    console.log("connection successfull");
}) .catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

//link the style
app.use(express.static(path.join(__dirname,"public")));

//link the post
app.use(express.urlencoded({extended : true}));

// let chat1 = new Chat({
//     from: "rajia",
//     to: "roma",
//     message: "What are you doing?",
//     created_at: new Date()
// })
//  chat1.save()
//  .then((res) => {
//     console.log(res);
//  }) .catch((err) => {
//     console.log(err);
// });

// Index Route 
app.get("/chats", async(req,res) => {
 let chats = await Chat.find();
 //console.log(chats);
 //res.send("working");
 res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res) =>{
    res.render("new.ejs");
});
//post request
 app.post("/chats", (req,res) => {
    let {from, to, message} = req.body;
    let newChat = new Chat ({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    });
    newChat.save()
    .then((res) => {
        console.log("chat was saved.");
    }) .catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");
 });


app.get("/chats/:id/edit", async(req,res) =>{
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});


//update route
app.put("/chats/:id", async(req,res) => {
    let  { id } = req.params;
    let {message: newmsg}  = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, 
        { message: newmsg},
        {runValidator: true, new: true}
        );
    //console.log(updatedChat);
    res.redirect("/chats");

});


//destroy route
app.delete("/chats/:id", async(req,res) =>{
    let  {id} = req.params;
    let deletedChat =  await Chat.findByIdAndDelete (id);
    console.log(deletedChat);
    res.redirect("/chats");
});


//home page
app.get("/", (req,res) => {
    res.send("working root");
});


app.listen(8080,() =>{
    console.log("I am listening");
});