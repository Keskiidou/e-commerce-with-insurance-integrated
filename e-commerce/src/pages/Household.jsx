import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import img from "../img/r6.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import your Navbar component

const Computers = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("Computers");
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:7000/product/allproducts"
      );
      console.log("data ", response.data);
      if (componentMounted) {
        setData(await response.data);
        setFilter(await response.data.filter((item) => item.category === "Household"));
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
    setActiveButton(cat);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className={
              activeButton === "All"
                ? "btn btn-outline-dark btn-sm m-2 active"
                : "btn btn-outline-dark btn-sm m-2"
            }
            onClick={() => {
              setFilter(data);
              setActiveButton("All");
            }}
          >
            All
          </button>
          <button
            className={
              activeButton === "Computers"
                ? "btn btn-outline-dark btn-sm m-2 active"
                : "btn btn-outline-dark btn-sm m-2"
            }
            onClick={() => filterProduct("Computers")}
          >
            Computers
          </button>
          <button
            className={
              activeButton === "Phones"
                ? "btn btn-outline-dark btn-sm m-2 active"
                : "btn btn-outline-dark btn-sm m-2"
            }
            onClick={() => filterProduct("Phones")}
          >
            Phones
          </button>
          <button
            className={
              activeButton === "Household"
                ? "btn btn-outline-dark btn-sm m-2 active"
                : "btn btn-outline-dark btn-sm m-2"
            }
            onClick={() => filterProduct("Household")}
          >
            Household
          </button>
        </div>

        {filter.map((product) => {
         
          return (
            <div
              id={product._id}
              key={product._id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product._id}>
                <img
                  className="card-img-top p-3"
                  src={product.img}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.name.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product._id}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Navbar /> {/* Add your Navbar component here */}
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
          <h2 className="text-center" style={{ fontSize: "3.6rem", color: "#4169E1", fontFamily: 'Abril Fatface' }}>
              Products
            </h2>            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Computers;
