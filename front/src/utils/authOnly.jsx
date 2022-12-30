import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../global/auth';

export default function authOnly(element) {
  const logged = useAuth((state) => state.loggedIn);

  if (!logged) {
    return (
      <Route path={element?.props.path} element={<Navigate to="/login" />} />
    );
  }

  return element;
}
