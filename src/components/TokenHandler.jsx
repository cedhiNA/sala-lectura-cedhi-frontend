import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../utils/axios';

export default function TokenHandler() {
  const navigate = useNavigate();
  const { loginFromToken } = useAuth();
  const REDIRECT_URL = import.meta.env.VITE_BASE_REDIRECT_URL;
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      window.location.href = REDIRECT_URL;
      return;
    }

    localStorage.setItem("serviceToken", token);

    axios.post('/api/auth/token-login', { token })
      .then((res) => {
        if (res.data.success) {
          loginFromToken({
            token,
            ...res.data.user
          });

          navigate('/dashboard', { replace: true });
        } else {
          window.location.href = REDIRECT_URL;
        }
      })
      .catch(() => {
        window.location.href = REDIRECT_URL;
      });


  }, []);

  return null;
}
