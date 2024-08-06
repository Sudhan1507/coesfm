import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Use named import

const PrivateRoutes = () => {
  const auth = sessionStorage.getItem('userdata');
  let isAuthenticated = false;

  if (auth) {
    try {
      const { exp } = jwtDecode(auth); // Use jwtDecode instead of jwt_decode
      const currentTime = Date.now() / 1000; // current time in seconds
      isAuthenticated = exp > currentTime;
    } catch (e) {
      console.error('Failed to decode JWT token:', e);
    }
  }

  return (
    isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  );
}

export default PrivateRoutes;
