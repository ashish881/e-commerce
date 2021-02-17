import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userRegister } from '../action/userAction';
import Message from '../component/Message';
import Loader from '../component/Loader';
import FormContainer from '../component/FormContainer';

function RegisterScreen(props) {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [message, setmessage] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.userRegister)
    const { userInfo, error, loading } = user
 
    //If Register or Login page has query ex:- shiping then redirect to shipping page if not then redirect to homepage
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';


    useEffect(() => {
            //If user is exist then redirect the given path
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setmessage("Password Doesn/'t Match");
        }
        dispatch(userRegister(name, email, password))

    }
    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader></Loader>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder='Enter Name' value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="text" placeholder='Enter Email' value={email} onChange={(e) => setemail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder='Enter Password' value={password} onChange={(e) => setpassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="text" placeholder='Enter Confirm Password' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    { /* In Login or Register page has query ex:-shipping then redirect shiping page after the registerd or login */}
                    Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
