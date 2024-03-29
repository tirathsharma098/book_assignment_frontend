import { toast } from 'react-toastify';
import React from 'react';
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMagnifyingGlass } from '@coreui/icons';
import { useRouteError } from 'react-router-dom';

const SystemError = () => {
  toast.error('Something went wrong', {
    position: toast.POSITION.TOP_RIGHT,
  });
  const error = useRouteError();

  let message = 'Oops!!! System Crashed.';
  if (error?.data?.message) message = error.data.message;
  if (typeof error?.error?.data == 'string' || error?.error?.data instanceof String)
    message = error?.error?.data;
  if (typeof error?.error?.message == 'string' || error?.error?.message instanceof String)
    message = error?.error?.message;
  // Just for development mode
  if (typeof error?.error?.stack == 'string' || error?.error?.stack instanceof String)
    message = error?.error?.stack;
  console.log('>>>>>> ERROR OCCURRED : ', error);

  const status = error?.status;
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">{status ? status : '500'}</h1>
              <h4 className="pt-3">{message}</h4>
              <p className="text-medium-emphasis float-start">
                Try to reload after clearing browser cache
              </p>
            </span>
            <CInputGroup className="input-prepend">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="What are you looking for?" />
              <CButton color="info">Search</CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default SystemError;
