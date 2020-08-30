import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import AppContext from './AppContext';

const PackageCard = (props) => {
    const {packages} = useContext(AppContext)
    const history = useHistory();

    const description = props.package.description.length > 65 ? props.package.description.slice(0, 65) + "..." : props.package.description;
    const onRedirect = (id) => {
      const url = "/packages/" + id;
      history.push(url);
    }
    const depends = props.package.depends.map(elem => packages[elem - 1]);
    return (
        <Card style={{
          width: "300px"
        }}>
  <Card.Header>Package</Card.Header>
  <Card.Body>
    <Card.Title>{props.package.name}</Card.Title>
    <Card.Text>
      {description}
    </Card.Text>
    <Button variant="primary" onClick={() => onRedirect(props.package.id)}>View Details</Button>
  </Card.Body>
</Card>
    )
}

export default PackageCard;