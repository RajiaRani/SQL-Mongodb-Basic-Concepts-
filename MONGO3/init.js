const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(() => {
    console.log("connection successfull");
}) .catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}


let allchats = [
    {
    from: "rajia",
    to: "roma",
    message: "Hello, I am rajia here",
    created_at: new Date()
   },
   {
    from: "roma",
    to: "laddi",
    message: "Hello, where are you",
    created_at: new Date()
   },
   {
    from: "chenchu",
    to: "rajia",
    message: "Hello, rajia how are you!",
    created_at: new Date()
   },
   {
    from: "reetu",
    to: "pradeep",
    message: "How are you.",
    created_at: new Date()
   },
   {
    from: "laddi",
    to: "rajia",
    message: "dont msg me.",
    created_at: new Date()
   },
]
//fill the chat
Chat.insertMany(allchats);




