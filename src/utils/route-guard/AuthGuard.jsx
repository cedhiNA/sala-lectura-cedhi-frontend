import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';

export default function AuthGuard({ children }) {
  const { isLoggedIn, isInitialized, user } = useAuth();
  const REDIRECT_URL = import.meta.env.VITE_BASE_REDIRECT_URL;
  if (!isInitialized) {
    return null;
  }

  if (!isLoggedIn) {
    window.location.href = REDIRECT_URL;
    return null;
  }

  return children;
}

AuthGuard.propTypes = { children: PropTypes.any };
