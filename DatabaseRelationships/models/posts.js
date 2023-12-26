//----------- One to Many --------------
const mongoose = require("mongoose");
const {Schema} = mongoose;
main()
.then(() => console.log("connection successfull"))
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
};

const userSchema = new Schema({
    username : String,
    email: String,
    gender:String,
    age:Number,
});

//store a reference to the parent document inside child document
const postSchema = new Schema({
   content:String,
   likes:Number,
   share:Number,
   mention:[
    {type:String}
   ],
   user:[
    {
     type: Schema.Types.ObjectId,
     ref:"User",
    }
   ],
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addUser = async() => {
    let user1 = new User (
        {
            username:"rohit sharma",
            email:"rohit12@gmail.com",
            gender:"male",
            age:21,
        });

  let post1 = new Post ({
     content:"Hello , everyone :) ",
     like:290,
     share:12,
     mention:["@rajiasyal", "@chenchureddy", "@laddisyal", "@rohitjalandharia"],
  });

  //save the information indside the user
  post1.user = user1;

   let res1 = await user1.save();
   console.log(res1);

   let res2 = await post1.save();
   console.log(res2);
};

addUser();