const mongoose =require("mongoose")

const ordersSchema = new mongoose.Schema({ 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items:[
        {
            partId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "spareParts"
            },
            quantity:{
                type:Number,
                required: true,
            },
            price:{
                type:Number,
                required: true,
            },
        }
    ],
    total:{
                type:Number,
                required: true,
            },
    shippingCost: {
                type:Number,
                required: true,
            },
    totalPrice: {
                type:Number,
                required: true,
            },
    phoneNumber: {
                type:String,
                required: true,
                trim: true 
            },
    address: {
        city:{
                type:String,
                required: true,
                trim: true 
            },
        area:{
                type:String,
                required: true,
                trim: true 
            },
        buildingNumber:{
                type:Number,
                required: true,
            },
        floor:{
                type:Number,
                required: true,
            },
        apartmentNumber:{
                type:Number,
                required: true,
            },
        additionalDetails:{
                type:String,
                trim: true 
            },
    },
    paymentMethod:{
                type:String,
                required: true,
                trim: true 
            },
    paymentStatus:{
                type:String,
                required: true,
                trim: true 
            },
    orderStatus:{
                type:String,
                required: true,
                trim: true 
            },
    createdAt:{
                type:Date,
                required: true,
            },
    updatedAt:{
                type:Date,
                required: true,
            },
});

const ordersModel = mongoose.model("orders",ordersSchema)

module.exports={ordersModel}