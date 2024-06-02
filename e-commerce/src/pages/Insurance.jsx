import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Insurance = () => {
  const state = useSelector((state) => state.handleCart);
  const [end_date, setEndDate] = useState("");
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");
  const [loading, setLoading] = useState(false);
  const [insuranceValue, setInsuranceValue] = useState(0);
  const [theftProtection, setTheftProtection] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
 
  useEffect(() => {
    let componentMounted = true;

    const getContracts = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          "http://localhost:7000/contract/allcontracts"
        );
        if (componentMounted) {
          setContracts(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch contracts: ", error);
      }
    };

    getContracts();

    return () => {
      componentMounted = false;
    };
  }, []);

  useEffect(() => {
    calculateInsuranceValue();
  }, [selectedContract, end_date, theftProtection]);

  const calculateInsuranceValue = () => {
    const start = new Date().toISOString().split("T")[0];
    const end = end_date || start;
    const startDate = new Date(start);
    const endDate = new Date(end);

    const currentDatePlus15Days = new Date();
    currentDatePlus15Days.setDate(currentDatePlus15Days.getDate() + 15);

    if (endDate <= currentDatePlus15Days) {
      endDate.setDate(currentDatePlus15Days.getDate() + 1);
      setEndDate(endDate.toISOString().split("T")[0]);
    }

    const diffTime = Math.abs(endDate - (currentDatePlus15Days));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let insurance = 0;
    if (selectedContract) {
      insurance = diffDays * parseFloat(selectedContract.price);
      if (theftProtection) {
        insurance += 50;
      }
      setInsuranceValue(insurance);
    }
  };

  useEffect(() => {
    const isFormValid =
      selectedContract &&
      end_date &&
      insuranceValue &&
      firstName &&
      email;
    setFormValid(isFormValid);
  }, [selectedContract, end_date, insuranceValue, firstName,email]);

    localStorage.setItem('contract_id',selectedContract._id)
  const handleChange = (event) => {
    setSelectedContract(event.target.value);
  };

  const handleTheftProtectionChange = (event) => {
    setTheftProtection(event.target.checked);
  };

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowInsurance = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 15);
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];

    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})
                      <span>{Math.round(subtotal)} DT</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>{shipping} DT</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                      Insurance
                      <span>{Math.round(insuranceValue)} DT</span>
                     
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>
                          {Math.round(subtotal + shipping + insuranceValue)} DT
                        </strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" noValidate>
                    <div className="row g-3">
                      <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Contract{" "}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedContract}
                            label="Contract"
                            onChange={handleChange}
                            required
                          >
                            {contracts.map((contract, index) => (
                              <MenuItem
                                key={index}
                                value={contract}
                              >
                                {contract.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {selectedContract && (
                            <MenuItem
                              disabled
                              style={{
                                fontStyle: "italic",
                                fontWeight: 900,
                                color: "#000",
                              }}
                            >
                              Selected Contract Value: {selectedContract.price} DT/jour
                            </MenuItem>
                          )}
                        </FormControl>
                      </Box>
                      <hr className="my-4" />

                      <div className="col-12 my-1">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="theftProtection"
                            checked={theftProtection}
                            onChange={handleTheftProtectionChange}

                          />
                          <label
                            className="form-check-label"
                            htmlFor="theftProtection"
                          >
                            Theft Protection ( 50 DT)
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-6 my-1">
                      <label htmlFor="firstName" className="form-label">
                          First name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder=""
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                       
                      </div>
                      <div className="col-12 my-1">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="start_date" className="form-label">
                          Start Date
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="start_date"
                          placeholder={formattedCurrentDate}
                          value={formattedCurrentDate}
                          readOnly
                          required
                        />
                        <div className="invalid-feedback">
                          Start Date is required.
                        </div>
                        <small className="text-muted">
                          Start Date starts after 15 days of purchase
                        </small>
                      </div>

                      <div className="col-12 my-1">
                        <label htmlFor="end_date" className="form-label">
                          End Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                          placeholder="Enter End Date"
                          min={formattedCurrentDate}
                          value={end_date}
                          onChange={(e) => setEndDate(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          End Date is required.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label
                          htmlFor="insurance_value"
                          className="form-label"
                        >
                          Insurance Value
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="insurance_value"
                          placeholder="Insurance Value"
                          value={insuranceValue}
                          readOnly
                          required
                        />
                        <div className="invalid-feedback">
                          Insurance Value is required.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <Link
                          to={`/checkout?iv=${insuranceValue}`}
                          className={`w-100 btn btn-primary ${
                            formValid ? "" : "disabled"
                          }`}
                          disabled={!formValid}
                        >
                          Continue to Checkout
                        </Link>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      
    );
  };
  localStorage.setItem('theftProtection',theftProtection)
  localStorage.setItem('end_date',end_date)


  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Insurance</h1>
        <hr />
        {state.length ? <ShowInsurance /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Insurance;

