import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = ({ size = 100 }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <Spinner animation='border' variant="success" style={{ width: size, height: size }} />
        </div>
    )
}

export default Loader
