import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <Col>
      <Form className="d-flex " onSubmit={submitHandler}>
        <InputGroup>
          <FormControl
            type="text"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search products..."
            aria-label="Search Products"
            aria-describedby="button-search"
          ></FormControl>
          <Button variant="outline-warning" type="submit" id="button-search">
            <i className="fa fa-search"></i>
          </Button>
        </InputGroup>
      </Form>
    </Col>
  );
}
