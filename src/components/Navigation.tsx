import React, { useContext } from "react";
import { Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";
import AppContext from "./AppContext";
import { Redirect, useHistory } from "react-router";

const Navigation = () => {
  const { setFilteredPackages, packages, setPackages } = useContext(AppContext);
  const history = useHistory();
  
  const input = React.createRef<any>();
  const onSearch = () => {
    const searchValue = input.current.value;
    const filteredPackages = packages.filter((elem) =>
      elem.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPackages(filteredPackages);
  };

  const reset = () => {
    setPackages([]);
    setFilteredPackages([]);
    return <Redirect to="/" />;
  };

  const showPackages = () => {
    history.push("/packages");
  };

  const packagesNav = packages.length ? (
    <Nav.Link onClick={showPackages}>View Packages</Nav.Link>
  ) : null;


  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand>Package Viewer</Navbar.Brand>
      <Nav.Link onClick={reset}>New file</Nav.Link>
      {packagesNav}
      <Nav className="mr-auto"></Nav>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          ref={input}
        />
        <Button variant="outline-info" onClick={onSearch}>
          Search
        </Button>
      </Form>
    </Navbar>
  );
};

export default Navigation;
