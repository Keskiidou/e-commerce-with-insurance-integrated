import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Footer, Navbar } from '../components';

const UpdateProfile = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('id');
 
  const [values, setValues] = useState({
    name: '',
    email: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:7000/profile/${userId}`)
        .then(response => {
          const { name, email } = response.data;
          setValues({ name, email });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedValues = {
      newName: values.name,
      newEmail: values.email,
      newPassword: newPassword,
    };

    try {
      await axios.put(`http://localhost:7000/updateprofile/${userId}`, updatedValues);
      setSuccessMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <Navbar />
      <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <form onSubmit={handleUpdateProfile}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBInput
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBInput
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleInputChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>New Password</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="6">
                        <MDBInput
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {successMessage && (
                          <div style={{ color: 'green', marginTop: '10px' }}>
                            {successMessage}
                          </div>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                  </MDBCardBody>
                  {/* <MDBBtn type="submit">Update Profile</MDBBtn> */}
                  {/* <button  className="btn btn-outline-dark m-2" type='submit'>Update Profile</button> */}
                  <MDBRow className="text-center">
                      <MDBCol>
                        <button className="btn btn-outline-dark m-2" type="submit">Update Profile</button>
                      </MDBCol>
                    </MDBRow>

                </form>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </>
  );
};

export default UpdateProfile;
