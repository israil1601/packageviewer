import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import AppContext from './AppContext';
import { useParams, useHistory } from 'react-router';

const PackageDetails = (props) => {
    const {packages} = useContext(AppContext);
    const history = useHistory();
    const {id} = useParams();
    const currentPackage = packages[id - 1];
    const depends = currentPackage.depends.map(elem => packages[elem - 1]);
    const reverseDepends = packages.filter(pack => pack.depends.includes(id)).join(", ");

    const onRedirect = (id) => {
        history.push("/packages/" + id);
    }
    return (<Card>
        <Card.Header>Package Details</Card.Header>
        <Card.Body>
    <Card.Title>{currentPackage.name}</Card.Title>
          <Card.Text>
            {currentPackage.description}
            ({depends.map(elem => (
                <span onClick={() => onRedirect(elem.id)} key={elem.id}>
                    {elem.name}
                </span>
            ))})
          </Card.Text>
        </Card.Body>
      </Card>)
}

export default PackageDetails