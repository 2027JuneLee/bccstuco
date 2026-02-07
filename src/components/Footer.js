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
  margin-top: 0; // Removed margin to eliminate white gap
`;

const FooterTitle = styled.h4`
  font-family: "Cinzel", serif;
  margin-bottom: 10px;
  color: #fff;
  text-align: center;
`;

const FooterSubtitle = styled.p`
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
    opacity: 0.8;
`;

const SocialContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 20px;
`;

const Footer = () => {
    const instagramIcon = require("../MainPage/instagram.png");
    const emailIcon = require("../MainPage/email.png");

    return (
        <FooterWrapper>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} className="text-center">
                        <FooterTitle>BCC STUCO</FooterTitle>
                        <FooterSubtitle>STUCO 2025~2026</FooterSubtitle>

                        <SocialContainer>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img src={emailIcon} alt="Email" style={{ width: "24px", height: "24px", marginRight: "8px", filter: "brightness(0) invert(1)" }} />
                                <a href="mailto:stuco@usbccollegiate.org" style={{ color: "white", textDecoration: "none" }}>Email</a>
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img src={instagramIcon} alt="Instagram" style={{ width: "24px", height: "24px", marginRight: "8px", filter: "brightness(0) invert(1)" }} />
                                <a href="https://www.instagram.com/bcc_stuco/" target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "none" }}>Instagram</a>
                            </div>
                        </SocialContainer>
                    </Col>
                </Row>
            </Container>
        </FooterWrapper>
    );
}

export default Footer;
