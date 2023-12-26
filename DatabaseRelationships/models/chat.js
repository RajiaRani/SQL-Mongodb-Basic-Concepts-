const mongoose = require("mongoose");
const {Schema} = mongoose;
main()
.then(() => console.log("connection successfull"))
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
};


const fromSchema = new Schema ({
    name:String,

});
const receiveSchema = new Schema ({
    receiveName:String,
    message:String,
    from:[
        {
            type: Schema.Types.ObjectId,
            ref: "From",
        }],
});

const From = mongoose.model("From", fromSchema);
const Receive = mongoose.model("Receive", receiveSchema);


// const addFrom = async() => {
//     let from1 = new From ({
//         name:"Reetu didi",

//     });

//     let receive1 = await Receive.insertMany([
//         { receiveName:"roma syal" ,message:"Hello, what are you doing??" },
//     ]);
   
// }


const addData3 = async() => {
    let from3 = await From.findOne({name:"Reetu didi"});
   let receive3 = new Receive({
    receiveName:"roma",
    message:"hello.. please pick my phone its urgent!!!!",
   });

   receive3.from = from3;
   await receive3.save();
}
addData3();


const addData2 = async() => {
   let from2 = await From.findOne({name:"Reetu didi"});
   let receive2 = new Receive ({
    receiveName:"chenchu reddy",
    message:"hello!! where is your wife i want to talk her...",
   });
   receive2.from = from2;
   let data = await receive2.save();
   console.log(data);
}
//addData2();



const addData = async() => {
    let from1 = new From ({
            name:"Reetu didi",
         });
      let res =  await from1.save();
      console.log(res);

    let receive1 = new Receive({
        receiveName :"rajia",
        message:"hello , how are you? what are you doing??",
    });
   
   receive1.from = from1;
 
  let receive = await receive1.save();
  console.log(receive);

  let from = await from1.save();
  console.log(from);
};
//addData();

const delRec = async() => {
    let data = await Receive.findByIdAndDelete("658b5949c81f16795030e3e9");
    console.log(data);
}
//delRec();