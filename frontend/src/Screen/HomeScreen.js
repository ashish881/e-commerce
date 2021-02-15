import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Products from '../component/Products';
import { useSelector, useDispatch } from 'react-redux'
import { productAction } from '../action/productAction';
import Loader from '../component/Loader';
import Message from '../component/Message';

function HomeScreen() {
    // const [products, setproducts] = useState([]);
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;


    useEffect(() => {
        dispatch(productAction())
    }, [dispatch])

    return (
        <div>
            <Container>
                <h1>LATEST PRODUCTS</h1>
                <Row>
                    {
                        loading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> :
                            products.map(product => (
                                <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                                    <Products product={product}></Products>
                                </Col>
                            ))
                    }


                </Row>
            </Container>
        </div>
    )
}

export default HomeScreen
