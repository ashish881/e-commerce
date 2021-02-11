import React from 'react'
import { Spinner } from 'react-bootstrap';

function Loader() {
    return (
        //show the spinner loader
        <div>
            <Spinner animation="border" role="status" style={{ width: '100px', height: '100px', margin: 'auto' }}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader
