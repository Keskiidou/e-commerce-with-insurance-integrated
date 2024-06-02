import { useState } from "react";
import axios from "axios" 

const AddContractForm =  () => {

const [price, setPrice] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")


    const addContract = async () => {
        try{

           
            const data = { "price" : price , "name" : name , "description" : description   }
            console.log("data is ",data)

            const response = await axios.post("http://localhost:7000/contract/createContract", {data});


            console.log("response is ",response.data)

            

        }catch(err){

            console.log("err adding new contract ",err)
        }


    }



return(
        <>
        
        
        You are in add contract page
        <br/>
        <label >name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <br/>
        <label >price</label>
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}   />


        <br/>
        <label >description</label>
        <input type="text"  value={description} onChange={(e) => setDescription(e.target.value)} />

        


        
        
        



        <button onClick={addContract}  > Submit </button>
        
        </>



)



}



export default AddContractForm;