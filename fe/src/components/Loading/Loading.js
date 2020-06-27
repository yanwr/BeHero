import React from 'react';
import { Spinner } from 'react-bootstrap';
import './css.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Loading(props) {
    
    return(
        <div className="container-loading">
            <Spinner animation="border" variant="danger"/>
        </div>
    );
};
