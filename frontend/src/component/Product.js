import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartReducer';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Card className="product">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            className="card-img-top product-image"
            alt={product.name}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>${product.price}</Card.Text>

          <Button
            onClick={() =>
              dispatch(
                addToCart({
                  ...product,
                  quantity: 1,
                })
              )
            }
          >
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
