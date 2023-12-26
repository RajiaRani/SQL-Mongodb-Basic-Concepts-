
//----------- one to few relationship ----------
const mongoose = require("mongoose");
const {Schema} = mongoose;
main()
.then(() => console.log("connection successfull"))
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
};


//store child document inside the parent document.
const userSchema = new Schema ({
    username:String,
    email:String,
    addresses:[
        {
            _id:false, //agar humko address _id nhi chahiye
        location:String,
        city:String,
    }
    ],
});

const User = mongoose.model("User", userSchema);

const addUser = async() => {
    let user1 = new User ({
        username :"reetu syal",
        email: "reetu123@gmail.com",
        addresses:[
            {location:"HHo.89,janak nagar, basti sheikh", city:"jalandhar"},
        ]
    });

    user1.addresses.push({location:"102,Liden Awenu",city:"United States"});
    user1.addresses.push({location:"104,Liden Awenue ",city:"United States"});

    let res = await user1.save();
    console.log(res);

};

addUser();