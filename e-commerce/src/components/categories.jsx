import React from 'react';
import { Link } from 'react-router-dom';
import hld from '../img/hosold.jpg';
import comp from '../img/comp.jpg';
import ph from '../img/xdd.webp';
const Categories = () => {
  return (
    <>
      <div className="container my-3 py-3">
        <hr />
        <h2 className="text-center py-4">Our Categories</h2>
        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <Link to="/household-appliances" className="btn btn-outline-primary d-block">
              <div className="card h-100">
                <img className="card-img-top img-fluid" src={hld} alt="" style={{ height: '180px', width: 'auto' }} />
                <div className="card-body">
                  <h5 className="card-title text-center">Household appliances</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <Link to="/phones" className="btn btn-outline-primary d-block">
              <div className="card h-100">
                <img className="card-img-top img-fluid" src={comp} alt="" style={{ height: '180px', width: 'auto' }} />
                <div className="card-body">
                  <h5 className="card-title text-center">Computers</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <Link to="/computers" className="btn btn-outline-primary d-block">
              <div className="card h-100">
                <img className="card-img-top img-fluid" src={ph} alt="" style={{ height: '180px', width: 'auto' }} />
                <div className="card-body">
                  <h5 className="card-title text-center">Phones</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories;
