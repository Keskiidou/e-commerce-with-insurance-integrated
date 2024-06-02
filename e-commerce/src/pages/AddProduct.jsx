import { useState } from "react";
import axios from "axios" 

const AddProductForm =  () => {

const [price, setPrice] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [category, setCategory] = useState("")
const [imgID,setImgID] =useState("")

const addProduct = async () => {
    try {
        const data = {
            price: price,
            name: name,
            description: description,
            category: category,
            imgID: imgID
        };

        console.log("data is ", data);

        const response = await axios.post("http://localhost:7000/product/createProduct", data);

        console.log("response is ", response.data);
    } catch (err) {
        console.log("err adding new product ", err);
    }
};




return(
        <>
        
        
        You are in add product page
        <br/>
        <label >name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <br/>
        <label >price</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}   />


        <br/>
        <label >description</label>
        <input type="text"  value={description} onChange={(e) => setDescription(e.target.value)} />

        <br/>
        <label >category</label>
        <input type="text"  value={category} onChange={(e) => setCategory(e.target.value)} />

        <br/>
        <label >image ID</label>
        <input type="text" value={imgID} onChange={(e) => setImgID(e.target.value)}   />


        
        
        



        <button onClick={addProduct}  > Submit </button>
        
        </>



)



}



export default AddProductForm;