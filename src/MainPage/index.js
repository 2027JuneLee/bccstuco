import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import "../styles/index.css"; // Ensure global styles are loaded

// Styled Components for Custom UI
const HeroSection = styled.div`
  background: linear-gradient(135deg, #023e8a 0%, #0077b6 50%, #0096c7 100%);
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 20%);
    pointer-events: none;
  }
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-top: 56px; // Offset for fixed navbar
`;

const HeroTitle = styled.h1`
  font-family: "Cinzel", serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;

const HeroSubtitle = styled.p`
  font-family: "Gill Sans", sans-serif;
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
`;

const StyledButton = styled(Button)`
  font-family: "Gill Sans", sans-serif;
  text-transform: uppercase;
  padding: 12px 30px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 0;
  background-color: #023e8a;
  border: none;
  &:hover {
    background-color: #0077b6;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;



const Section = styled.div`
  padding: 80px 0;
  background-color: ${(props) => (props.bg === "light" ? "#f8f9fa" : "white")};
`;

const SectionTitle = styled.h2`
  font-family: "Cinzel", serif;
  text-align: center;
  margin-bottom: 50px;
  color: #023e8a;
  font-weight: 700;
`;

const InfoCard = styled(Card)`
  border: none;
  border-radius: 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
  height: 100%;
  &:hover {
    transform: translateY(-5px);
  }
  .card-title {
    font-family: "Cinzel", serif;
    color: #1d3557;
  }
  .card-text {
    font-family: "Gill Sans", sans-serif;
    color: #555;
  }
`;



function MainPage() {


  return (
    <>

      <NavBar />

      <HeroSection>
        <Container>
          <HeroTitle>Welcome to BCC STUCO 2026~2027!</HeroTitle>
          <HeroSubtitle>BCC's Very Own Student Council!</HeroSubtitle>
          <ButtonContainer>
            <StyledButton size="lg" href="/about">Learn More</StyledButton>
          </ButtonContainer>
        </Container>
      </HeroSection>



      <Section>
        <Container>
          <SectionTitle>About STUCO 2026~2027</SectionTitle>
          <Row>
            <Col md={6} className="d-flex align-items-center justify-content-center">
              <img src="/Wally.png" alt="BCC Logo" className="img-fluid mb-4" style={{ maxWidth: "300px", width: "100%", height: "auto" }} />
            </Col>
            <Col md={6}>
              <h3 style={{ fontFamily: "Cinzel", color: "#1d3557" }}>Our Mission</h3>
              <p style={{ fontFamily: "Gill Sans", fontSize: "1.1rem", lineHeight: "1.8" }}>
                Welcome to BCC's Student Council website!
                BCC's very own Student Council (STUCO) is working hard to represent BCC students, organize fun events, and promote BCC's core values and spirit! This website aims to showcase STUCO's activities and events, and act as a platform for students and BCC clubs to connect and cooperate with STUCO members!
              </p>
              <StyledButton href="/about">About STUCO</StyledButton>
            </Col>
          </Row>
        </Container>
      </Section>

      <Section bg="light">
        <Container>
          <SectionTitle>Student Life</SectionTitle>
          <Row>
            <Col md={4} className="mb-4">
              <InfoCard>
                <Card.Body className="text-center p-4">
                  <Card.Title>About</Card.Title>
                  <Card.Text>
                    Learn about STUCO's mission, who we are, and why we made this website.
                  </Card.Text>
                  <Button variant="outline-primary" href="/about">Learn More</Button>
                </Card.Body>
              </InfoCard>
            </Col>
            <Col md={4} className="mb-4">
              <InfoCard>
                <Card.Body className="text-center p-4">
                  <Card.Title>Events</Card.Title>
                  <Card.Text>
                    See what events and activities STUCO is planning and what it did over the years.
                  </Card.Text>
                  <Button variant="outline-primary" href="/events">Upcoming Events</Button>
                </Card.Body>
              </InfoCard>
            </Col>
            <Col md={4} className="mb-4">
              <InfoCard>
                <Card.Body className="text-center p-4">
                  <Card.Title>Q&A Forum</Card.Title>
                  <Card.Text>
                    Want to ask something to STUCO? Use to forum and share your suggestions and questions!
                  </Card.Text>
                  <Button variant="outline-primary" href="/forum">Visit Forum</Button>
                </Card.Body>
              </InfoCard>
            </Col>
          </Row>
        </Container>
      </Section>

      <Footer />
    </>
  );
}

export default MainPage;
