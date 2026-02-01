import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styled from "styled-components";
import Logo from "../Wally.png"; // Assuming Wally.png is at src/

const StyledNavbar = styled(Navbar)`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  font-family: "Gill Sans", sans-serif;
`;

const StyledBrand = styled(Navbar.Brand)`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #023e8a !important;
  font-family: "Cinzel", serif;
  font-size: 1.2rem;
`;

const BrandLogo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const StyledNavLink = styled(Nav.Link)`
  color: #333 !important;
  font-weight: 500;
  margin: 0 5px;
  text-transform: uppercase;
  font-size: 0.85rem;
  &:hover {
    color: #023e8a !important;
  }
`;


function NavBar() {
  return (
    <StyledNavbar bg="white" expand="lg" fixed="top">
      <Container>
        <StyledBrand href="/">
          <BrandLogo src={Logo} alt="BCC Logo" />
          BCC STUCO
        </StyledBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <StyledNavLink href="/">Home</StyledNavLink>
            <StyledNavLink href="/events">Events</StyledNavLink>
            <StyledNavLink href="/forum">Forum/Q&A</StyledNavLink>
            <StyledNavLink href="/about">About</StyledNavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
}

export default NavBar;
