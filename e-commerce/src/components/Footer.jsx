

import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

 function Footer() {
  return (
    <MDBFooter bgColor="cyan" className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
         
          
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='#4169E1' icon='gem' className='me-3' />
                Warden
                </h6>
              <p>
               hello sir this a short intro xddd
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Computers
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Phones
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Household Items
                </a>
              </p>
              <p>
               
              </p>
            </MDBCol>

           

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                    lac1 , polytech
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                  polytech@pi.tn
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 216 99 999 99
              </p>
              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

     
    </MDBFooter>
  );
}

export default Footer;


