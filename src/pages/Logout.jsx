import { useEffect } from 'react';
import useHttp from '../hooks/useHttp';
import { apiUserLogOut } from '../services/user';
import { ApiConfig } from '../config/api-config-class';
import headerCommon from '../config/common-headers';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const {
    response: userLoggedOutResponse,
    isLoading: isUserLoggingOut,
    apiFunc: userLogOutFunc,
} = useHttp();
  useEffect(() => {
    userLogOutFunc(apiUserLogOut, new ApiConfig({},{},headerCommon()), "PUT");
    localStorage.clear();
    navigate('/login');
  }, [userLogOutFunc]);
  return (
    <p>
      <i>Logging out ...</i>
    </p>
  );
};
export default Logout;