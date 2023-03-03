import React, { useEffect, useReducer } from 'react';

import axios from 'axios';
import logger from 'use-reducer-logger';
import { Row, Col } from 'react-bootstrap';
import Product from '../component/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1000 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1000, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>

      <Col className="d-flex justify-content-center align-self-center bg-warning sale-div">
        <h1 className="text-danger  sale">SALE!</h1>
      </Col>
      <div className="text-center mt-5">
        <h1 className="display-6">Categories</h1>
        <Col className="d-flex justify-content-around">
          <div className="d-flex col-4 justify-content-center">
            <div className="  cat-span border border-primary align-items-center">
              <Link
                to={{
                  pathname: '/search',
                  search: '?category=Shirts',
                }}
              >
                {' '}
                <div className="cat bg-danger display-6">SHIRT</div>
              </Link>
              <img
                className="cat-img"
                src="https://res.cloudinary.com/dcpydr10o/image/upload/v1677778369/wnywbd8tv0di5za59qqf.jpg"
                alt="s"
              ></img>
            </div>
          </div>
          <div className="d-flex col-4 justify-content-center">
            <div className=" cat-span border border-danger align-items-center">
              <Link
                to={{
                  pathname: '/search',
                  search: '?category=Pants',
                }}
              >
                {' '}
                <div className="cat bg-warning display-6">PANT</div>
              </Link>
              <img
                className="cat-img"
                src=" https://res.cloudinary.com/dcpydr10o/image/upload/v1677779461/tbseep42ul8s7dbx5bbt.jpg"
                alt="s"
              ></img>
            </div>
          </div>
          <div className="d-flex col-4 justify-content-center">
            <div className="  cat-span border border-warning align-items-center">
              <Link
                to={{
                  pathname: '/search',
                  search: '?category=Hat',
                }}
              >
                {' '}
                <div className="cat display-6 bg-info">HAT</div>
              </Link>
              <img
                className="cat-img"
                src=" https://res.cloudinary.com/dcpydr10o/image/upload/v1677526067/vhifyjwujqfglt7wnnyo.jpg"
                alt="s"
              ></img>
            </div>
          </div>
        </Col>
      </div>
      <div className="products text-center mt-5">
        <h1 className="display-6">Featured Products</h1>

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            <Carousel responsive={responsive}>
              {products.map((product) => (
                <div>
                  <Product product={product} />
                </div>
              ))}
            </Carousel>
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomePage;
