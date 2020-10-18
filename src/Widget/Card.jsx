import React from 'react';
import './Card.css';

function Card(props) {

    const children = props.children
    return (
        <div className="card ui-card">
            {children}
      </div>
      
    )
}
export default Card;