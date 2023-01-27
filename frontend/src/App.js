import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './pages/Cart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Login from './pages/Login';
import { Link } from 'react-router-dom';
import { removeUser } from './redux/cartReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressPage from './pages/ShippingAddressPage';
import Signup from './pages/Signup';
import PaymentMethodScreen from './pages/PaymentMethodScreen';
import Placeorder from './pages/Placeorder';
import OrderPage from './pages/OrderPage';
import Nav from 'react-bootstrap/Nav';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  let sum = 0;
  const products = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.cart.users);
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(removeUser());
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  w-100  justify-content-end ">
                  <Link to="/cart" className="nav-link">
                    <div className="icon">
                      <ShoppingCartOutlinedIcon />
                      <p className="iconspan">
                        {' '}
                        {products.forEach((item) => {
                          sum += item.quantity;
                        })}{' '}
                        {sum}
                      </p>
                    </div>
                  </Link>

                  {user[0] ? (
                    <NavDropdown
                      className="text-primary"
                      title={user[0].name}
                      id="basic-nav-dropdown"
                    >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link text-primary" to="/login">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductPage />}></Route>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<Placeorder />} />
              <Route path="/order/:id" element={<OrderPage />}></Route>
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/orderhistory"
                element={<OrderHistoryPage />}
              ></Route>
            </Routes>
          </Container>
        </main>

        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
