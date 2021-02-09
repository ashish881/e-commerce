import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from '../component/Rating';
import { Link } from 'react-router-dom';

function Products(props) {
    const { product } = props;
    return (
        <div>
            <Card className='my-3'>
            <Link to={`/product/${product.id}`}>
                <Card.Img variant="top" src={product.image} alt={product.name}/>
                </Link>
                <Card.Body>
                <Link to={`/product/${product.id}`}>
                    <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Card.Text>
                        <Rating value={product.rating} text={product.numReviews}></Rating>
                   </Card.Text>
                    <Card.Text as='h3'>
                        ${product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Products
