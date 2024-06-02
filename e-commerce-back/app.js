require('dotenv').config({path : './.env'}); 
const cors = require('cors');
const express = require('express');
const registerRoutes = require('./routes/Authroutes');
const mongoose = require('mongoose');

const Product = require('./models/product');
const Contract = require ("./models/contract");
const contracts = require ("./routes/contract");
const Insurance = require ("./models/insurance");
const insurances= require ("./routes/insurance");


const messages =require("./routes/Messageroutes")
  

const products = require("./routes/product")

const Purchase = require("./models/purchase");
const purchases = require("./routes/purchase");

const claim=require("./models/claim");
const claims=require("./routes/claim");

// const repair =require("./models/repairs");
const repairs =require("./routes/repair");
mongoose.connect(process.env.DATABASE)
 


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
app.use('/', registerRoutes);
 

app.listen(PORT ,(error) => {
    if(!error){
        console.log(`The apps is running on port ${PORT} `)
    }
    else{
        console.log("error occured", error)
    }
})


const db = mongoose.connection

db.on("error", (error) => {

console.error("MongoDB connection Error ",error)

})


db.once("open", async ()=>{

    try{

        const productCollectionExists = await Product.exists()
        const contractCollectionExists = await Contract.exists()
        const insuranceCollectionExists = await Insurance.exists()
        const purchaseCollectionExists = await Purchase.exists()



        if( !productCollectionExists  && !contractCollectionExists && !insuranceCollectionExists && !purchaseCollectionExists){
                await  Product.createIndexes();  
                await  Contract.createIndexes();  
                await  Insurance.createIndexes();
                await  Purchase.createIndexes();  


                console.log("index created for products collection and contracts and insurances and purchases ")
            }else{
                console.log("products collection already exists and Contracts and insurances and purchases ")
            }
    
    
        }catch(error){

            console.log("Error creating Product Collection ",error)
        }
   

    })
    app.use("/product", products)
    app.use('/contract',contracts)
    app.use('/insurance',insurances)

    app.use('/',messages)

    app.use('/purchase',purchases)
    app.use('/claim',claims)

    app.use('/repair',repairs)
 
    

    

 