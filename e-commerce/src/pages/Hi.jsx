import axios from "axios"




const Hi = () => {


    const sayHi = async () => {
      

   
        const response = await axios.get("http://localhost:7000/");

        console.log("the response is ",response)

    }


return (
    <>
    say Hi to back
        <br/>

        <button  onClick={sayHi} >Hi</button>

    </>


)

}


export default Hi