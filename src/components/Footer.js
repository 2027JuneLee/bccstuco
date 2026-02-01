import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
// import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Removed missing dependency
// Checking package.json, react-icons is NOT listed. I will use text or standard chars for now.

const FooterWrapper = styled.footer`
  background-color: #1d3557; // Dark blue matches existing theme or target
  color: white;
  padding: 40px 0;
  font-family: "Gill Sans", sans-serif;
  margin-top: 50px;
`;

const FooterTitle = styled.h4`
  font-family: "Cinzel", serif;
  margin-bottom: 20px;
  color: #fff;
`;

const FooterLink = styled.a`
  color: #ddd;
  display: block;
  margin-bottom: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const ContactInfo = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #ddd;
`;

const CopyRight = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 30px;
  padding-top: 20px;
  text-align: center;
  font-size: 0.8rem;
  color: #aaa;
`;

const Footer = () => {
    const instagramIcon = require("../MainPage/instagram.png");
    const emailIcon = require("../MainPage/email.png");

    return (
        <FooterWrapper>
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <FooterTitle>BCC STUCO</FooterTitle>
                        <ContactInfo>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <img src={emailIcon} alt="Email" style={{ width: "24px", height: "24px", marginRight: "10px", filter: "brightness(0) invert(1)" }} />
                                <a href="mailto:stuco@usbccollegiate.org" style={{ color: "inherit", textDecoration: "none" }}>stuco@usbccollegiate.org</a>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <img src={instagramIcon} alt="Instagram" style={{ width: "24px", height: "24px", marginRight: "10px", filter: "brightness(0) invert(1)" }} />
                                <a href="https://www.instagram.com/bcc_stuco/" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>@bcc_stuco</a>
                            </div>
                        </ContactInfo>
                    </Col>
                    <Col md={2} className="mb-4">
                        <h5 style={{ fontFamily: 'Cinzel', marginBottom: '15px' }}>Sitemap</h5>
                        <FooterLink href="/">Home</FooterLink>
                        <FooterLink href="/about">About Us</FooterLink>
                        <FooterLink href="/academics">Academics</FooterLink>
                    </Col>
                    <Col md={2} className="mb-4">
                        <h5 style={{ fontFamily: 'Cinzel', marginBottom: '15px' }}>Connect</h5>
                        <FooterLink href="/news">News</FooterLink>
                        <FooterLink href="/events">Events</FooterLink>
                        <FooterLink href="/contact">Contact</FooterLink>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5 style={{ fontFamily: 'Cinzel', marginBottom: '15px' }}>Useful Links</h5>
                        <FooterLink href="https://www.usbccollegiate.org" target="_blank">USB Collegiate Official</FooterLink>
                    </Col>
                </Row>
                <CopyRight>
                    &copy; Copyright {new Date().getFullYear()} by BC Collegiate. All Rights Reserved.
                </CopyRight>
            </Container>
        </FooterWrapper>
    );
}

export default Footer;
