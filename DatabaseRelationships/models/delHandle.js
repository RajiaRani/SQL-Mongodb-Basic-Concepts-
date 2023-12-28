//-------------- Delection Handling --------
const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
    .then(() => console.log("connection successfull"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
};

const userSchema = new Schema({
    name: String,
    email: String,
    gender: String,
    age: Number,
});


const postSchema = new Schema({
    caption: String,
    likes: Number,
    share: Number,
    mention: [
        {
            type: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "Instauser",
    },
});
// userSchema.pre("findOneAndDelete", async() => {
//     console.log("Pre Middleware");
// });


//  userSchema.post("findOneAndDelete", async(delUser)=> {
//     console.log(delUser);
//  })


 postSchema.post("findOneAndDelete", async (user) => {
   if (user.post) {
         let result = await Instauser.deleteMany({
             _id:{ $in:user.post},
           });
         console.log(result);
     }

  });


// postSchema.post("findOneAndDelete", async (post) => {
//     try {
//         if (post && post.user) {
//             let result = await Instauser.deleteMany({
//                 _id: { $in: [post.user] },
//             });
//             console.log(result);
//         }
//     } catch (error) {
//         console.error("Error deleting related documents:", error);
//     }
// });


const Instauser = mongoose.model("Instauser", userSchema);
const Instapost = mongoose.model("Instapost", postSchema);



//---------------------------- deletion ----------------------------
const delData = async () => {
    let delUser = await Instapost.findByIdAndDelete("658cd209f2862294cdf301bc");
    console.log(delUser);
};
delData();


const addData4 = async () => {
    let user1 = await Instauser.findOne({ name: "i_am_chenchureddy" });
    let post4 = new Instapost(
        {
            caption: "God is everything..",
            likes: 1045,
            share: 108,
            mention: ["@radhikasharma"],
        }
    );

    post4.user = user1;
    await post4.save();
};
addData4();


const addData3 = async () => {
    let user1 = await Instauser.findOne({ name: "Riya Rajput" });
    let post3 = new Instapost(
        {
            caption: "Good Day ...",
            likes: 145,
            share: 8,
            mention: ["@radhikasharma", "@pardeepsingh", "@anitachoudhary", "@rahulsharma"],
        }
    );

    post3.user = user1;
    await post3.save();
};
//addData3();


const addData2 = async () => {
    let user2 = await Instauser.findOne({ name: "Riya Rajput" });
    let post2 = new Instapost({
        caption: "hello..Good Morning everyone :) ",
        likes: 10,
        share: 0,
        mention: ["@radhikasharma", "@pardeepsingh", "@anitachoudhary", "@rahulsharma"],
    });

    post2.user = user2;
    let post = await post2.save();
    console.log(post);
};
//addData2();

const addUser = async () => {
    let user2 = new Instauser({
        name: "i_am_chenchureddy",
        email: "chenchureddy@gmail.com",
        gender: "male",
        age: 26,
    });
    let res = await user2.save();
    console.log(res);
};
//addUser();

const addData = async () => {
    let user1 = new Instauser({
        name: "Riya Rajput",
        email: "riya123@gmail.com",
        gender: "female",
        age: 23,
    });
    let res = await user1.save();
    console.log(res);
};
//addData();


const addPost = async () => {
    let post = new Instapost({
        caption: "lets, start new journey :) ",
        likes: 102,
        share: 2,
        mention: ["@rohitsharma", "@helloworld", "@javascriptconcepts", "@rajiasyal", "@romasyal", "@i_amchenchureddy"],
    });
    await post.save();
};

//addPost();