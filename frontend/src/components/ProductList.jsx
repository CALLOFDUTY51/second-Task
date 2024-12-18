import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/cartSlice';
import "../Styles/ProductList.css"
const ProductList = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.myslice.cart);
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "10",
      image: "https://shorturl.at/nhYKB",
      description: "Description for product 1",
      quantity: 1
    },
    {
      id: 2,
      name: "Product 2",
      price: "20",
      image: "https://shorturl.at/oGWDB",
      description: "Description for product 2",
      quantity: 1
    },
    {
      id: 3,
      name: "Product 3",
      price: "30",
      image: "https://shorturl.at/oEdOi",
      description: "Description for product 3",
      quantity: 1
    },
    {
      id: 4,
      name: "Product 4",
      price: "40",
      image: "https://shorturl.at/tlb3R",
      description: "Description for product 4",
      quantity: 1
    },
    {
      id: 5,
      name: "Product 5",
      price: "50",
      image: "https://shorturl.at/y37xE",
      description: "Description for product 5",
      quantity: 1
    },
    {
      id: 6,
      name: "Product 6",
      price: "50",
      image: "https://rb.gy/vza0jl",
      description: "Description for product 6",
      quantity: 1
    }
  ];


  const addToCart = (product) => {
    const exists = cart.some((item) => item.id === product.id);
    console.log(cart)

    if (exists) {
      alert("Product is already in the cart!");
    } else {
      dispatch(addCart(product));
      alert("Product added to the cart!");
    }
  };
 

  const ans = products.map((product) => {
    return (
      <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
        <Card style={{ textAlign: "center", width: "18rem" }}>
          <Card.Img className="mx-auto" variant="top" style={{ width: "200px", height: "200px" }} src={product.image} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <button className="button-custom"
              
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <Row
      className="d-flex justify-content-around align-items-center w-100"
      style={{
        backgroundImage: "url('https://shorturl.at/sNpaJ')",
        paddingLeft: "150px"
      }}
    >
      <h2 className="mt-4">Products</h2>
      {ans}
    </Row>
  );
};

export default ProductList;
