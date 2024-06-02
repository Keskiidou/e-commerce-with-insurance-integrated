import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function BasicCard({ name, description, price, photo, purchaseId, claimStatus, contract }) { // Add contract prop
  const getStatusColor = (status) => {
    switch (status) {
      case 'Repayed':
        return 'text-success'; 
      case 'Rejected':
        return 'text-danger'; 
      case 'Sent To Repair':
        return 'text-warning'; 
      default:
        return ''; 
    }
  };

  const isClaimable = (status) => {
    return !['Repayed', 'Rejected', 'Sent To Repair'].includes(status);
  };

  return (
    <Card style={{ width: '18rem', margin: '0 10px 20px 0' }}>
      <Card.Img variant="top" src={photo} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Description: {description}</ListGroup.Item>
        <ListGroup.Item>Price: {price}</ListGroup.Item>
        <ListGroup.Item>Status: <span className={getStatusColor(claimStatus)}>{claimStatus}</span></ListGroup.Item>
      </ListGroup>
      <Card.Body>

        {contract !== null && isClaimable(claimStatus) && (

          <Link to={`/claim?purchaseId=${purchaseId}`} className="card-link">Make a Claim</Link>
         )} 
      </Card.Body>
    </Card>
  );
}

export default BasicCard;
