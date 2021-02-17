import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userLogin } from '../action/userAction';
import Message from '../component/Message';
import Loader from '../component/Loader';
import FormContainer from '../component/FormContainer';

function LoginScreen(props) {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state.userLogin)
    const { userInfo, error, loading } = user

    //If Register or Login page has query ex:- shiping then redirect to shipping page if not then redirect to homepage
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history,userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password))

    }
    return (
        <FormContainer>
            <h1>Sign In</h1> 
            {loading && <Loader></Loader>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" placeholder='Enter Email' value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder='Enter Password' value={password} onChange={(e) => setpassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    { /* In Login page has query ex:-shipping then redirect shiping page after the registerd */}
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
