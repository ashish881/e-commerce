import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Row, Col, Image, Card, Button, Container, Form } from 'react-bootstrap'
import Rating from '../component/Rating';
import { useSelector, useDispatch } from 'react-redux';
import { productDetailsAction } from '../action/productAction';
import Loader from '../component/Loader';
import Message from '../component/Message';


function ProductScreen(props) {
    const [qty, setQty] = useState(1);

    const id = props.match.params.id;
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails;

    useEffect(() => {
        dispatch(productDetailsAction(id))
    }, [id, dispatch]);

    const AddToCartHandler = () => {
        props.history.push(`/cart/${id}?qty=${qty}`);
    }

    return (
        <div>
            <Container>
                <Link to='/' className="btn btn-light my-2">Go Back</Link>
                {
                    loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
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
                                        {
                                            product.countInStock > 0 &&
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            {[...Array(product.countInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                        }
                                        <ListGroup.Item>
                                            <Button className='btn btn-block' disabled={product.countInStock === 0} onClick={AddToCartHandler}>Add To Cart </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                }

            </Container>
        </div>
    )
}

export default ProductScreen
