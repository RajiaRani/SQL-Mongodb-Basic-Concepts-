//-------------- Delection Handling --------
const mongoose = require("mongoose");
const {Schema} = mongoose;
main()
.then(() => console.log("connection successfull"))
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
};

const  userSchema = new Schema({
     name:String,
     email:String,
     gender:String,
     age:Number,
});


const postSchema = new Schema({
    caption:String,
    likes:Number,
    share:Number,
    mention:[
        {
            type:String,
        }
    ],
    user:{
     type: Schema.Types.ObjectId,
     ref:"Instauser",
    },
});

const Instauser = mongoose.model("Instauser", userSchema);
const Instapost = mongoose.model("Instapost",postSchema);