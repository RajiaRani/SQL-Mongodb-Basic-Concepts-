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

const addData2 = async() => {
    let user2 =  await Instauser.findOne({name:"Riya Rajput" });
     let post2 = new Instapost ({
        caption:"hello..Good Morning everyone :) ",
        likes:10,
        share:0,
      mention:["@radhikasharma", "@pardeepsingh", "@anitachoudhary", "@rahulsharma"],
     });

    post2.user = user2;
     await user2.save();
};
addData2();


const addData = async() => {
    let user1 = new Instauser ({
        name:"Riya Rajput",
        email:"riya123@gmail.com",
        gender:"female",
        age:23,
    });
    // let post = new Instapost ({
    //     caption:"lets, start new journey :) ",
    //     likes:102,
    //     share:2,
    //     mention:["@rohitsharma", "@helloworld", "@javascriptconcepts", "@rajiasyal", "@romasyal", "@i_amchenchureddy"],
    // });

    // post.user = user1;
    let res = await user1.save();
    console.log(res);
};
//addData();


const addPost = async() => {
    let post = new Instapost({
        caption:"lets, start new journey :) ",
        likes:102,
       share:2,
      mention:["@rohitsharma", "@helloworld", "@javascriptconcepts", "@rajiasyal", "@romasyal", "@i_amchenchureddy"],
    });
    await post.save();
};

//addPost();