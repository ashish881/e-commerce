import React from 'react'
import { Alert } from 'react-bootstrap';

function Message({ variant, children }) {
    return (
        //show the error message
        <div>
            <Alert variant={variant}>{children}</Alert>
        </div>

    )
}

Message.defaultProps = {
    variant: 'info'  // blue color
}
export default Message
