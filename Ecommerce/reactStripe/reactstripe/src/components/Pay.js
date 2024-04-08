import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useState ,useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom"
const key = "pk_test_51LNzJuSJWb2mlCnXQgq3EbGRv6QiFjj9osDXIlns28EYk8zAQ2t1upv05Fknd7wrybMYsC2XraAEoUBb1gU2ehfd00CSn3sOI4";
// const key  =   "pk_test_51LRAA5SFcpYMlOr03k7Sb2VES89gzEOYJHMPHL8ZE3Ns4kQ1hRlN03N3p2SVJIFyJHI0K558q9W9agwuSRvhz8tI00PrK1PUL5";
const Pay = ()=>{
    const path = "https://png.pngtree.com/png-clipart/20200720/original/pngtree-mountain-equipment-shopping-logo-design-png-image_4316658.jpg";
    const history = useNavigate();
    const [stripeToken,setStripeToken] = useState(null);
    const onToken = (token) => {
        setStripeToken(token);
        console.log(token);
    }
  
    useEffect( ()=> {
        const makeRequest =async () => {
            try{
              const res = await axios.post("http://localhost:5000/api/checkout/payment",{
                  source:stripeToken.id,
                  amount:2000,
              });
              console.log(res.data);
              history("/success")
            } catch(err){
                console.log("error")
                console.log(err);
            }
            
           
        //   const data ={
        //     source:stripeToken.id,
        //     amount:2000,
        //   }
        //   const url = "http://localhost:5000/api/checkout/payment";
        //    fetch(url, {
        //     method: 'POST', // or 'PUT'
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        //   })
        //   .then((response) => response.json())
        //   .then((data) => console.log(data))
        //   .catch((err) => console.error(err));
        }
       stripeToken && makeRequest();
    },[stripeToken,history]);
    return (
        <div style={{
            height:"100vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
        }}>
            {stripeToken ? (<span>Processing Please Wait....</span>) : (
            <StripeCheckout 
                name="Deal Shopping" image={path} billingAddress shippingAddress
                description='Your total is 99' amount={1000} token={onToken} stripeKey={key}
                >
                <button style={{
                  border:"none",
                  width:120,
                  borderRadius:5,
                  padding:"20px",
                  backgroundColor:"black",
                  color:"white",
                  fontWeight:100,
                  cursor:"pointer"
                }}>
                    Pay Now
                </button>
            </StripeCheckout>)}
        </div>
    )
}
export default Pay;