import { useState } from "react";
import axios from "axios";

const AddInsuranceForm = () => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [contract, setContract] = useState("");

  const addInsurance = async () => {
    try {
      const data = {
        price: price,
        name: name,
        description: description,
        start_date: new Date(start_date).toISOString(), // Convert date to ISOString
        end_date: new Date(end_date).toISOString(), // Convert date to ISOString
        contract: contract,
      };

      console.log("data is ", data);

      const response = await axios.post(
        "http://localhost:7000/insurance/createInsurance",
        data
      );

      console.log("response is ", response.data);
    } catch (err) {
      console.log("err adding new insurance ", err);
    }
  };

  return (
    <>
      You are in add insurance page
      <br />
      <label>name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <label>price</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <label>description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label>start_date</label>
      <input
        type="text"
        value={start_date}
        onChange={(e) => setStart_date(e.target.value)}
      />
      <br />
      <label>end_date</label>
      <input
        type="text"
        value={end_date}
        onChange={(e) => setEnd_date(e.target.value)}
      />
      <br />
      <label>contract</label>
      <input
        type="text"
        value={contract}
        onChange={(e) => setContract(e.target.value)}
      />

      <button onClick={addInsurance}>Submit</button>
    </>
  );
};

export default AddInsuranceForm;
