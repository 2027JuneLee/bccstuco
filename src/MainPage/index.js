import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/index.css"; // Ensure global styles are loaded

// Styled Components for Custom UI
const HeroSection = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("https://observer.case.edu/wp-content/uploads/2025/10/EmptyCongress.jpg");
  background-size: cover;
  background-position: center;
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
          <HeroTitle>Welcome to BCC STUCO 2025~2026!</HeroTitle>
          <HeroSubtitle>Empowering Students, Building Community</HeroSubtitle>
          <StyledButton size="lg" href="/about">Learn More</StyledButton>
        </Container>
      </HeroSection>

      <Section>
        <Container>
          <SectionTitle>About BCC</SectionTitle>
          <Row>
            <Col md={6}>
              <img src="https://static.wixstatic.com/media/7d4bbb_9d5d5564883d47d1a25db4057e93758b~mv2.jpg/v1/fill/w_600,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Image-empty-state.jpg" alt="About BCC" className="img-fluid mb-4" />
            </Col>
            <Col md={6}>
              <h3 style={{ fontFamily: "Cinzel", color: "#1d3557" }}>Our Mission</h3>
              <p style={{ fontFamily: "Gill Sans", fontSize: "1.1rem", lineHeight: "1.8" }}>
                BC Collegiate Upper is dedicated to fostering an environment where students can thrive academically, socially, and creatively.
                Our Student Council works tirelessly to represent the student body, organize engaging events, and promote a spirit of inclusivity and excellence.
              </p>
              <StyledButton href="/about">Read Our Story</StyledButton>
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
                  <Card.Title>Academics</Card.Title>
                  <Card.Text>
                    Discover our rigorous academic programs, AP courses, and college counseling services designed to prepare students for top-tier universities.
                  </Card.Text>
                  <Button variant="outline-primary" href="/academics">View Academics</Button>
                </Card.Body>
              </InfoCard>
            </Col>
            <Col md={4} className="mb-4">
              <InfoCard>
                <Card.Body className="text-center p-4">
                  <Card.Title>Events</Card.Title>
                  <Card.Text>
                    Stay updated with our latest school events, spirit weeks, assemblies, and community service opportunities.
                  </Card.Text>
                  <Button variant="outline-primary" href="/events">Upcoming Events</Button>
                </Card.Body>
              </InfoCard>
            </Col>
            <Col md={4} className="mb-4">
              <InfoCard>
                <Card.Body className="text-center p-4">
                  <Card.Title>Admissions</Card.Title>
                  <Card.Text>
                    Join our vibrant community! Learn about our admission process, requirements, and how to become a part of the BCC family.
                  </Card.Text>
                  <Button variant="outline-primary" href="/admissions">Apply Now</Button>
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
