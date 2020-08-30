import React, { useContext } from 'react';
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import AppContext from './AppContext';


const Navigation = () => {
  const {setFilteredPackages, packages} = useContext(AppContext);
  const input = React.createRef<any>()
  const onSearch = () => {
    const searchValue = input.current.value;
    const filteredPackages = packages.filter(elem => elem.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredPackages(filteredPackages);
  }
  return (
    <div>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand >Package Viewer</Navbar.Brand>
    <Nav className="mr-auto">
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={input}/>
      <Button variant="outline-info" onClick={onSearch}>Search</Button>
    </Form>
  </Navbar>
    </div>
);
}

export default Navigation;