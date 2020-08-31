import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import "../styles/PackageCard.css";

const PackageCard = (props) => {
    const history = useHistory();

    const onRedirect = (id) => {
      const url = "/packages/" + id;
      history.push(url);
    }
    return (
        <Card className="package-card-container ">
  <Card.Header>Package</Card.Header>
  <Card.Body>
    <Card.Title className="package-title">{props.package.name}</Card.Title>
    <Card.Text className="description">
      {props.package.description}
    </Card.Text>
    <Button variant="primary" onClick={() => onRedirect(props.package.id)}>View Details</Button>
  </Card.Body>
</Card>
    )
}

export default PackageCard;