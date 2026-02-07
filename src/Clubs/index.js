import React from "react";
import styled from "styled-components";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const PageWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 80px;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: "Gill Sans", sans-serif;
`;

const ClubsTitle = styled.h1`
  font-family: "Cinzel", serif;
  color: #023e8a;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledCard = styled(Card)`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
  }

  .card-img-top {
    height: 200px;
    object-fit: cover;
  }

  .card-title {
    font-family: "Cinzel", serif;
    color: #023e8a;
    font-weight: 700;
  }
`;

const MinigameButton = styled(Button)`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
              url("https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&q=80");
  background-size: cover;
  background-position: center;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, filter 0.2s;
  
  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
    color: white;
  }
`;

const SponsorSection = styled.div`
  background: linear-gradient(135deg, #023e8a 0%, #0077b6 100%);
  color: white;
  padding: 60px 0;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(2, 62, 138, 0.3);
`;

const SponsorTitle = styled.h2`
  font-family: "Cinzel", serif;
  margin-bottom: 20px;
`;

function Clubs() {
    const clubItems = [
        {
            name: "Gardening Club",
            description: "Dedicated to sustainability and environmental awareness within our community.",
            activities: "Recycling drives, garden maintenance, and advocacy campaigns.",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
            hasMinigame: true
        },
        {
            name: "Table Tennis Club",
            description: "Perfecting your serve and smash! Join us for recreational and competitive table tennis matches.",
            activities: "Weekly practice sessions, school tournaments, and strategic skill building.",
            image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "MUN/Debate Club",
            description: "Engaging in parliamentary debate and simulating United Nations conferences to solve global challenges.",
            activities: "Public speaking workshops, mock UN sessions, and inter-school competitions.",
            image: "https://images.unsplash.com/photo-1540910419892-f0c742a45301?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "History Club",
            description: "Diving deep into the chronicles of the past to gain perspectives on our modern world.",
            activities: "Historical site visits, documentary screenings, and collaborative research projects.",
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "AMC Club",
            description: "Mastering complex mathematical concepts and preparing for the American Mathematics Competitions.",
            activities: "Advanced problem-solving sessions, logic puzzles, and competition training.",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Future Engineers Club",
            description: "Exploring the intersections of technology, physics, and design to build innovative prototypes.",
            activities: "CAD design workshops, 3D printing projects, and engineering challenges.",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
        }
    ];

    return (
        <>
            <NavBar />
            <PageWrapper>
                <Container>
                    <ClubsTitle>BCC Clubs & Activities</ClubsTitle>
                    <Subtitle>
                        Student Council is proud to highlight and support our student-led clubs! Ask STUCO to help fundraise, promote events, and increase visibility of their efforts!
                    </Subtitle>

                    <SponsorSection>
                        <Container>
                            <SponsorTitle>Sponsor a Club</SponsorTitle>
                            <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                                Are you a local business or individual looking to support student initiatives?
                                BCC STUCO offers sponsorship opportunities for all recognized school clubs.
                            </p>
                            <Button
                                variant="light"
                                size="lg"
                                style={{ borderRadius: '30px', color: '#023e8a', fontWeight: 'bold', padding: '12px 40px' }}
                            >
                                Contact STUCO for Sponsorship
                            </Button>
                        </Container>
                    </SponsorSection>
                    <Row>
                        {clubItems.map((club, index) => (
                            <Col key={index} md={6} lg={4} className="mb-4">
                                <StyledCard>
                                    <Card.Img variant="top" src={club.image} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{club.name}</Card.Title>
                                        <Card.Text style={{ color: '#555', fontSize: '0.95rem' }}>
                                            {club.description}
                                        </Card.Text>
                                        <div className="mt-2 mb-3">
                                            <strong>Activities:</strong>
                                            <p style={{ fontSize: '0.85rem', color: '#777' }}>{club.activities}</p>
                                        </div>
                                        <div className="mt-auto d-flex gap-2">
                                            <Button
                                                variant="outline-primary"
                                                style={{ borderRadius: '25px', borderColor: '#023e8a', color: '#023e8a', flex: 1 }}
                                            >
                                                Learn More
                                            </Button>
                                            {club.hasMinigame && (
                                                <MinigameButton href="/secret_garden">
                                                    Minigame
                                                </MinigameButton>
                                            )}
                                        </div>
                                    </Card.Body>
                                </StyledCard>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </PageWrapper>
            <Footer />
        </>
    );
}

export default Clubs;
