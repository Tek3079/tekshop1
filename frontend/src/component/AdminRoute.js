import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const user = useSelector((state) => state.cart.users);

  return user[0] && user[0].isAdmin ? children : <Navigate to="/signin" />;
}
