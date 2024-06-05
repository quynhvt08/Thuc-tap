import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiCall from '../../configAxios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    delete apiCall.defaults.headers.common['Authorization'];
    navigate('/login');
  }, [navigate]);

  return null; 
};

export default Logout;
