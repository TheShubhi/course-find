import React from "react";

import Navbar from "react-bootstrap/esm/Navbar";
import Nav from "react-bootstrap/esm/Nav";
import Button from "react-bootstrap/esm/Button";

export default function TopBar() {
  return (
    <div>
      <Navbar variant="dark" style={{ backgroundColor: "#392F5A" }}>
        <Navbar.Brand>CourseFind</Navbar.Brand>

        <Nav className="m-auto">
          <Nav.Link>Home</Nav.Link>

          <Nav.Link>Course Find</Nav.Link>
        </Nav>
        <Button variant="outline-light"> Github </Button>
      </Navbar>
    </div>
  );
}
