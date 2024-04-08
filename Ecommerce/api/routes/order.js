const { verifyToken,verifyTokenAndAuthorization ,verifyTokenAndAdmin} = require("./verifyToken");
const cryptoJS =  require("jsonwebtoken");
const Order = require("../models/Order");
const express  = require('express');
const router = express.Router();


// CREATE
router.post("/",async (req,res)=>{
    const newOrder  = new Order(req.body)
    try{
          const savedOrder = await newOrder.save();
          res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
})

// UPDATE
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(updatedOrder);

    }catch(err){
        res.status(400).json(err);
    }
})

// DELETE
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");

    }catch(err){
        res.status(400).json(err);
    }
})

// GET user Order
router.get("/find/:userId",verifyTokenAndAuthorization,async (req,res)=>{
    try{
       const Orders =  await Order.find({userId:req.params.userId});
       res.status(200).json(Orders);

    }catch(err){
        res.status(404).json(err);
    }
})

// GET ALL OrderS
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
       try{
            Orders = await Order.find();
       res.status(200).json(Orders);
    }catch(err){
        res.status(500).json(err);
    }
})

// GET Monthly income
router.get("/income",verifyTokenAndAdmin,async (req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const prevMonth = new Date(lastMonth.setMonth(lastMonth.getMonth()-1));

    try{
        const income = await Order.aggregate([
          { $match : { createdAt: { $gte: prevMonth } } },
          { $project:   { 
                           month: { $month: "$createdAt" },
                           sales :"$amount"
                        }
          },
          {
            $group:{
                _id: "$month",
                total:{$sum:"$sales"}
            }
          }
        ])
        res.status(200).json(income);
    }catch(err){
      res.status(401).json(err);
    }
})

module.exports = router;
