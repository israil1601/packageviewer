import React, { useContext } from "react";
import { Tabs, Tab, ListGroup } from "react-bootstrap";
import AppContext from "./AppContext";
import { useParams, useHistory } from "react-router";
import "../styles/PackageDetails.css";

const PackageDetails = (props) => {
  const { packages } = useContext(AppContext);
  const history = useHistory();
  const { id } = useParams();
  const currentPackage = packages[id - 1];
  const depends = currentPackage.depends.map((elem) => packages[elem - 1]);
  const reverseDepends = packages.filter((pack) => pack.depends.includes(+id));

  const onRedirect = (id) => {
    history.push("/packages/" + id);
  };

  const dependancies = depends.length ? (
    depends.map((elem) => {
      return (
        <ListGroup.Item
          onClick={() => onRedirect(elem.id)}
          key={elem.id}
          className="package-details-list-item"
        >
          {elem.name}
        </ListGroup.Item>
      );
    })
  ) : (
    <p className="package-details-container">None</p>
  );

  const reverseDependancies = reverseDepends.length ? (
    reverseDepends.map((elem) => {
      return (
        <ListGroup.Item
          onClick={() => onRedirect(elem.id)}
          key={elem.id}
          className="package-details-list-item"
        >
          {elem.name}
        </ListGroup.Item>
      );
    })
  ) : (
    <p className="package-details-container">None</p>
  );

  return (
    <Tabs
      defaultActiveKey="details"
      id="uncontrolled-tab-example"
      className="package-details-tabs"
    >
      <Tab eventKey="details" title="Package Details">
        <div className="package-details-container">
          <h3>{currentPackage.name}</h3>
          <p>{currentPackage.description}</p>
        </div>
      </Tab>
      <Tab eventKey="dependancies" title="Dependancies">
        <ListGroup>{dependancies}</ListGroup>
      </Tab>

      <Tab eventKey="reverseDependancies" title="Reverse Dependancies">
        <ListGroup>{reverseDependancies}</ListGroup>
      </Tab>
    </Tabs>
  );
};

export default PackageDetails;