
//--------- One to Many -----------
const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
    .then(() => console.log("connection successfull"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
};

const orderSchema = new Schema({
    item: String,
    price: Number,
});

//store a reference to the child document inside the parent document
const customerSchema = new Schema({
    custname: String,
    email: String,
    order: [{
        type: Schema.Types.ObjectId,
        ref: "Order", // reference jisko reffer karna hai uska naam like dege
    }],

});

//--------------- post middleware--------------
customerSchema.post("findOneAndDelete", async (customer) => {
    if (customer && customer.order && customer.order.length) {
        let result = await Order.deleteMany({ _id: { $in: customer.order } });
        console.log(result);
    }
});



const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

//--------------- deletion handling------------
const delCustomer = async () => {
    let delData = await Customer.findByIdAndDelete("658ccee47486c3c1f96ddac8");
    console.log(delData);
}
delCustomer();


const addCustomer = async () => {
    let customer1 = new Customer({
        custname: "rajia rani",
        email: "rajia1234@gmail.com",
    });

    let order1 = await Order.findOne({ item: "lipstick" });
    let order2 = await Order.findOne({ item: "dress" });
    let order3 = await Order.findOne({ item: "shoe" });

    customer1.order.push(order1);
    customer1.order.push(order2);
    customer1.order.push(order3);

    let res = await customer1.save();
    console.log(res);
    //let result = await Customer.find({});
    //console.log(result);
}
//addCustomer();

//-------------- Populate -------------
const findCustomer = async () => {
    let result = await Customer.find({}).populate("order");
    //console.log(result);
    console.log(result[0]);
};
//findCustomer();




const addOrder = async () => {
    let order1 = new Order({
        item: "Mac lipstick", price: 1200,
    });
    let res = await Order.insertMany([
        { item: "lipstick", price: 230 },
        { item: "dress", price: 2200 },
        { item: "jean", price: 700 },
        { item: "shoe", price: 2230 },
        { item: "eye-liner", price: 200 },]
    );
    console.log(res);
};
//addOrder();
