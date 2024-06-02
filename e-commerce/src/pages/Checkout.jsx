import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const location = useLocation();
  const Navigate = useNavigate();
  const id = String(localStorage.getItem("product_id"));
  const [insuranceValue, setInsuranceValue] = useState(0);
  const [creditCardNumber, setCreditCardNumber] = useState("");

  const purchaseData = {
    product: localStorage.getItem("product_id"),
    contract: localStorage.getItem("contract_id"),
    client: localStorage.getItem("userId"),
    vol: JSON.parse(localStorage.getItem("theftProtection")),
    end_date: localStorage.getItem("end_date"),
    creditCard: creditCardNumber,

    
  };
  console.log(purchaseData)

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const iv = searchParams.get("iv");
  //   if (iv) {
  //     setInsuranceValue(parseFloat(iv));
  //   }
  // }, [location]);

  // const EmptyCart = () => {
  //   return (
  //     <div className="container">
  //       <div className="row">
  //         <div className="col-md-12 py-5 bg-light text-center">
  //           <h4 className="p-3 display-5">No item in Cart</h4>
  //           <Link to="/" className="btn btn-outline-dark mx-4">
  //             <i className="fa fa-arrow-left"></i> Continue Shopping
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });
console.log(id)
const PurchaseButton = async (e) => {
  e.preventDefault(); 
  try {
   
    const response = await axios.post(
      "http://localhost:7000/purchase/createPurchase",purchaseData );

    console.log("response is ", response.data);

    try { 
 
      await axios.patch("http://localhost:7000/product/updateStock",{id});
    } catch (error) {
      console.log("Error updating stock: ", error);
      
    }

    Navigate("/confirm");
  } catch (error) {
    console.log("Error adding new purchase: ", error);
  }
};

    

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
                      Products ({totalItems})<span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Insurance
                      <span>${insuranceValue}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${Math.round(subtotal + shipping + insuranceValue)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                
                <div className="card-body">
                  <form className="needs-validation" noValidate>
                 
                    <h4 className="mb-3">Payment</h4>
                    <div className="row gy-3">
                      <div className="col-md-6">
                        <label htmlFor="cc-name" className="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-name"
                          placeholder=""
                          required
                        />
                        <small className="text-muted">
                          Full name as displayed on card
                        </small>
                        <div className="invalid-feedback">
                          Name on card is required
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="cc-number" className="form-label">
                          Credit card number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-number"
                         
                          value={creditCardNumber}
                          onChange={(e) => setCreditCardNumber(e.target.value)}
                        />

                        <div className="invalid-feedback">
                          Credit card number is required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="cc-expiration" className="form-label">
                          Expiration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-expiration"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Expiration date required
                        </div>
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="cc-cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cc-cvv"
                          placeholder=""
                          required
                        />
                        <div className="invalid-feedback">
                          Security code required
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <button
                    className="w-100 btn btn-primary"
                    onClick={(e) => PurchaseButton(e)} 
                  >
                    Confirm the Purchase
                  </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        { <ShowCheckout /> }
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
