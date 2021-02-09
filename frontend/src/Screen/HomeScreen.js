import React,{ useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Products from '../component/Products';
import axios from 'axios';

function HomeScreen() {
    const [products, setproducts] = useState([]);

  useEffect(() => {
      const fetchProducts = async () => {
        const {data} = await axios.get('/products');
        setproducts(data.products);
      }
          fetchProducts();
  }, [])    

  
    return (
        <div>
            <Container>
                <h1>LATEST PRODUCTS</h1>
                <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                    <Products product={product}></Products>
                    </Col>
                ))}
                </Row> 
            </Container>
        </div>
    )
}

export default HomeScreen
