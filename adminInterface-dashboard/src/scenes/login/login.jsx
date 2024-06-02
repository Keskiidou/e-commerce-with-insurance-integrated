import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import LineMdLogin from '../../components/logo'
import MaterialSymbolsLightKeyOutline from '../../components/key'
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLoginSuccess = (adminId) => {
    localStorage.setItem('adminId', adminId);
    navigate(`/dashboard?id=${adminId}`);
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/login-admin', { email, password })

      .then(result => {
        console.log('Result from server:', result.data);
        const { adminId  } = result.data;
        if (adminId ) {
          handleLoginSuccess(adminId );
        }
      })
      .catch(err => console.error('Error during login:', err.response.data));
  };


  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="p-4" style={{ backgroundColor: '#141b2d' }}>
              <CCardBody>
                <CForm onSubmit={handleFormSubmit}>
                  <h1>Login</h1>
                  <p className="text-body-secondary">Sign In to your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <LineMdLogin />
                    </CInputGroupText>
                    <CFormInput
                      type='text'
                      placeholder="Email"
                      autoComplete="username"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <MaterialSymbolsLightKeyOutline />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CButton type="submit" color="primary" className="w-100">
                    Login
                  </CButton>
                </CForm>

              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
