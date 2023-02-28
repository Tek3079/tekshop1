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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressPage from './pages/ShippingAddressPage';
import Signup from './pages/Signup';
import PaymentMethodScreen from './pages/PaymentMethodScreen';
import Placeorder from './pages/Placeorder';
import OrderPage from './pages/OrderPage';
import Nav from 'react-bootstrap/Nav';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import Button from 'react-bootstrap/Button';
import { getError } from './util';
import axios from 'axios';
import SearchBox from './component/SearchBox';
import { useEffect, useState } from 'react';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './component/ProtectedRoute';
import AdminRoute from './component/AdminRoute';
import DashboardScreen from './pages/DashboardScreen';
import ProductsListPage from './pages/ProductsListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';

function App() {
  let sum = 0;
  const products = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.cart.users);
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(removeUser());
    window.location.href = '/login';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        console.log(data);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="info" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                className="m-2"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand className="m-2">
                  <h3 className="logo">T'shop</h3>
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end ">
                  <Link to="/cart" className="nav-link">
                    <div className="icon">
                      <ShoppingCartOutlinedIcon
                        style={{ color: 'black' }}
                        fontSize="large"
                      />
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
                    <NavDropdown title={user[0].name} id="basic-nav-dropdown">
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
                  {user[0] && user[0].isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/order">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/user">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item style={{ color: 'black' }}>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{
                    pathname: '/search',
                    search: `?category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
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
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/search" element={<SearchPage />} />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductsListPage />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditPage />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/order"
                element={
                  <AdminRoute>
                    <OrderListPage />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user"
                element={
                  <AdminRoute>
                    <UserListPage />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditPage />
                  </AdminRoute>
                }
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
