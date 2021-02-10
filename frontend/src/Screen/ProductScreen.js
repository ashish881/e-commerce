import React,{ useEffect, useState } from 'react';
// import product from '../products';
import { Link } from 'react-router-dom';
import { ListGroup, Row, Col, Image, Card, Button, Container } from 'react-bootstrap'
import Rating from '../component/Rating';
import axios from 'axios';

function ProductScreen(props) {
    const id = props.match.params.id;
    const [product, setproduct] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
          const {data} = await axios.get(`/products/${id}`);
          setproduct(data);
        }
            fetchProducts();
    }, [id])    
  
    return (
        <div>
            <Container>
                <Link to='/' className="btn btn-light my-2">Go Back</Link>
                <Row>
                    <Col sm={12} md={6} lg={4} xl={6}>
                        <Image src={product.image} alt={product.name} fluid></Image>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>{product.name}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={product.numReviews}></Rating>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: $ {product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Description: {product.description}
                        </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={3}>
                    <Card>
                    <ListGroup variant='flush'>
                <ListGroup.Item>
                <Row>
                <Col>Price:</Col>
                <Col>
                <strong>${product.price} </strong>
                </Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                <Col>Status:</Col>
                <Col>
                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'} </strong>
                </Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
               <Button className='btn btn-block' disabled={product.countInStock === 0}>Add To Cart </Button>
                </ListGroup.Item>
                    </ListGroup>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProductScreen
