// import { json, redirect } from 'react-router-dom';
import { json, redirect } from 'react-router-dom';
import Login from '../components/login/Login';
import { useState } from 'react';
import { API } from '../config/api/api.config';
import axios from 'axios';
import { handleAxiosError, responseHandler } from '../utils/responseHandler';

const FORM_TYPE = {
  LOGIN: 'login',
  VERIFY_EMAIL: 'verify-email',
  SIGNUP: "signup"
};

const LoginPage = (props) => {
  const [authPage, setAuthPage] = useState('login');
  return <Login setAuthPage={setAuthPage} authPage={authPage} formType={FORM_TYPE} />;
};
export default LoginPage;

export async function action({ request }) {
  const data = await request.json();
  const mode = data?.mode;
  const authData = {
    username: data?.username,
    password: data?.password,
  };
  if (mode !== FORM_TYPE.LOGIN && mode !== FORM_TYPE.VERIFY_EMAIL) {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }
  try {
    const response = await axios.post(API.endpoint + '/user/' + mode, authData, {
      headers: {
        'Content-Type': 'application/json',
      },
      validateStatus: () => true,
    });

    const loggedInUser = responseHandler(response);
    if (loggedInUser.redirect) return redirect(loggedInUser.redirect);
    if (!loggedInUser.success) return {};
    const { token, id, full_name, user_type } = loggedInUser.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user_id', id);
    localStorage.setItem('user_name', full_name);
    localStorage.setItem('user_type', user_type);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 30 * 24);
    localStorage.setItem('expiration', expiration.toISOString());

    return redirect('/');
  } catch (err) {
    return handleAxiosError(err);
  }
}
