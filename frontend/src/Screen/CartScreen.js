import React, { useEffect } from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartAction, removeCartAction } from '../action/cartAction';
import Message from '../component/Message';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Form, Card } from 'react-bootstrap';

function CartScreen(props) {
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const id = props.match.params.id;

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (id) {
            dispatch(cartAction(id, qty));
        }
    }, [id, dispatch, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeCartAction(id));
    }

    const checkoutHandler = () => {
         props.history.push('/login?redirect=shipping');
    }
    return (
        <Container>
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? <Message>Your Cart is Empty<Link to='/'>Go Back</Link></Message> :
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={2}>
                                            {/* in the onchange just call the cartAction in parameter pass the id and qty to update on the state */}
                                            <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(cartAction(item.product, Number(e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                { /* when we are changing the qty we're calling cart Action again which goes through action send the state down through the reducer */}
                                <h2>
                                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                    Proceed To Checkout
                            </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default CartScreen
