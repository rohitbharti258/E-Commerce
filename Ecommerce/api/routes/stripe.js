const express  = require('express');
const router = express.Router();
const stripe = require("stripe")("sk_test_51LNzJuSJWb2mlCnX7gm0YQ6Lvlu2Qlj2LQWIh7XaEaen6MHwVQMrAminKHrB8eFQwoKXWWcKp84SiNBI8ZQVTuQt00usqp6njh")
// ("sk_test_51LRAA5SFcpYMlOr089rnVvdu6JLoWBgOXynOBCIS3dkYcKYE02svFeR3sahZeHC7cPKLWKP0FFugRoQ1p4en0b4400hSuiFvql")
const dotenv = require("dotenv");
dotenv.config()
// const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/payment",async (req,res)=>{
  console.log(req.body);
    stripe.charges.create({
        currency:"usd",
        source:req.body.tokenId,
        // source:"tok_visa",
        amount:req.body.amount,
        // payment_method_types: ['card']
    },(stripeErr,stripeResponse)=>{
        
        if(stripeErr){
          console.log("hey")
            res.status(401).json(stripeErr);
        } else {
            res.status(200).json(stripeResponse);
        }
    });

    // const customer = await stripe.customers.create({
    //   description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
    // });
    // console.log(customer)
})

module.exports = router;