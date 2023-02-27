import {
  removeItem,
  resetCart,
  decrementQuantity,
  incrementQuantity,
} from '../redux/cartReducer';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { Helmet } from 'react-helmet-async';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const handlePayment = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Container className="d-flex flex-column Larger shadow mt-3">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <Col className="d-flex justify-content-center mb-4">
        <h3 className="display-4"> Items In Cart</h3>
      </Col>
      <Col>
        {products.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center">
            Cart is empty. <Link to="/">Go Shopping</Link>
          </div>
        ) : (
          <div>
            {' '}
            {products?.map((item) => (
              <div className="d-flex  border-bottom" key={item._id}>
                <Col md={6}>
                  <Link to={`/product/${item.slug}`}>
                    {' '}
                    <img className="cartimage" src={item.image} alt="" />
                    {item.name}
                  </Link>
                </Col>

                <Col className="d-flex justify-content-center align-items-center  ">
                  <Col sm={4} className="d-flex ">
                    <Button
                      className=" text-black rounded-circle btn-sm btn-outline-success"
                      onClick={() => dispatch(incrementQuantity(item._id))}
                      disabled={item.quantity === item.countInStock}
                      variant="outline-success"
                    >
                      <AddIcon />
                    </Button>
                    <p className="m-2">{item.quantity}</p>
                    <Button
                      className="text-black rounded-circle btn-sm"
                      onClick={() => dispatch(decrementQuantity(item._id))}
                      disabled={item.quantity === 1}
                      variant="outline-danger"
                    >
                      <RemoveIcon />
                    </Button>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center ">
                    <p className="m-2 d-flex">
                      ${item.price}x{item.quantity}
                    </p>
                  </Col>
                </Col>
                <Col className="d-flex justify-content-center align-items-center ">
                  <DeleteForeverOutlinedIcon
                    className="delete m-2"
                    onClick={() => dispatch(removeItem(item._id))}
                  />
                </Col>
              </div>
            ))}
            <Col className="mb-3">
              {' '}
              <div className="d-flex justify-content-end">
                <span className="m-2">SUBTOTAL</span>
                <span className="m-2">${totalPrice()}</span>
              </div>
              <div className="d-flex justify-content-end">
                <Button onClick={handlePayment}>PROCEED TO CHECKOUT</Button>
              </div>
              <div className="d-flex justify-content-end">
                <span
                  className="text-danger reset-cart"
                  onClick={() => dispatch(resetCart())}
                >
                  Reset Cart
                </span>{' '}
              </div>
            </Col>
          </div>
        )}
      </Col>
    </Container>
  );
};

export default Cart;
