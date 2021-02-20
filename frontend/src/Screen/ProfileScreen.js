import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { userProfileDetails } from '../action/userAction';
import Message from '../component/Message';
import Loader from '../component/Loader';


function ProfileScreen(props) {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [message, setmessage] = useState('');

    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile)
    const { user, error, loading } = userProfile
    console.log(user)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        //If user is not login and going to path /profile then redirect to login page
        if (!userInfo) {
            props.history.push('/login')
        } else {
            // if user is not there then dispatch userProfile
            if (!user) {
                dispatch(userProfileDetails())
            } else {
                // if there then set name and email
                setname(user.name)
                setemail(user.email)
            }
        }
    }, [props.history, userInfo, dispatch, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setmessage("Password do not Match");
        }
        //Dispatch update profile
    }
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
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
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen
