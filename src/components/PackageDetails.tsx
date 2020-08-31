import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import AppContext from "./AppContext";
import { useParams, useHistory } from "react-router";
import "../styles/PackageDetails.css";

const PackageDetails = (props) => {
  const { packages } = useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  const currentPackage = packages[id - 1];
  const depends = currentPackage.depends.map((elem) => packages[elem - 1]);
  const reverseDepends = packages
    .filter((pack) => pack.depends.includes(+id));

  const onRedirect = (id) => {
    history.push("/packages/" + id);
  };

  const onBack = () => history.push("/packages")
  return (
    <div className="card-details-container">
      <Card className="package-details-card">
        <Card.Header>Package Details</Card.Header>
        <Card.Body>
          <Card.Title>{currentPackage.name}</Card.Title>
          <Card.Text>
            {currentPackage.description}
            <span className="package-details-depends">
              Dependancies:{" "}
              {depends.length
                ? depends.map((elem) => (
                    <Button variant="outline-primary" onClick={() => onRedirect(elem.id)} key={elem.id}>
                      {elem.name}
                    </Button>
                    
                  ))
                : "None"}
            </span>
            <span className="package-details-depends">
                Reverse dependancies: {reverseDepends.length ? reverseDepends.map((elem) => (
                    <span><Button variant="outline-primary" onClick={() => onRedirect(elem.id)} key={elem.id}>
                      {elem.name}
                    </Button>{" "}
                    </span>
                  )) : "None"}
            </span>
          </Card.Text>
          <Button variant="primary" onClick={onBack}>Back to packages</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PackageDetails;
