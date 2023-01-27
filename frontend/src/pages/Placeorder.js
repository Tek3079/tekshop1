import React, { useEffect, useReducer } from 'react';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../component/CheckoutSteps';
import LoadingBox from '../component/LoadingBox';
import { toast } from 'react-toastify';
import { getError } from '../util';
import Axios from 'axios';
import { resetCart } from '../redux/cartReducer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

const Placeorder = () => {
  const navigate = useNavigate();
  const reduxdispatch = useDispatch();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const shippingAddress = useSelector((state) => state.cart.shipingaddress);
  const paymentMethod = useSelector((state) => state.cart.paymentMethod);
  const cartItems = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.cart.users);

  useEffect(() => {
    if (!paymentMethod) {
      navigate('/payment');
    }
  }, [paymentMethod, navigate]);
  const itemTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };
  const taxPrice = () => {
    let total = itemTotal() * 0.09;

    return total.toFixed(2);
  };
  const totalPrice = () => {
    let total = parseInt(itemTotal()) + parseInt(taxPrice());
    console.log(total);

    return total.toFixed(2);
  };
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: itemTotal(),
          taxPrice: taxPrice(),
          totalPrice: totalPrice(),
        },
        {
          headers: {
            authorization: `Bearer ${user[0].token}`,
          },
        }
      );
      reduxdispatch(resetCart());
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {shippingAddress.fullName} <br />
                <strong>Address: </strong> {shippingAddress.address},
                {shippingAddress.city}, {shippingAddress.postalCode},
                {shippingAddress.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemTotal()}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${taxPrice()}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${totalPrice()}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Placeorder;
