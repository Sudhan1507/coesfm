import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoutes = () => {
  const authData = sessionStorage.getItem('userdata');
  let isAuthenticated = false;

  if (authData) {
    try {
      const parsedAuthData = JSON.parse(authData); // Parse the JSON string
      const token = parsedAuthData.token; // Access the token from the parsed data

      if (token) {
        const { exp } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        isAuthenticated = exp > currentTime;
      } else {
        console.error('No token found in userdata.');
      }
    } catch (e) {
      console.error('Failed to decode JWT token:', e);
    }
  }

  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoutes;
