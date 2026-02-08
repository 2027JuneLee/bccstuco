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
              url(${props => props.bgImage || "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&q=80"});
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

const DisabledButton = styled(Button)`
  border-radius: 25px;
  background-color: #e9ecef !important;
  border-color: #dee2e6 !important;
  color: #adb5bd !important;
  flex: 1;
  cursor: not-allowed;
  pointer-events: none;
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
            description: "Gardening Club tends to the school garden and manages the aquarium!",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
            hasMinigame: true,
            minigameUrl: "/secret_garden",
            minigameBg: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "Table Tennis Club",
            description: "Weekly ping pong matches!",
            image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=800&q=80",
            hasMinigame: true,
            minigameUrl: "/secret_pong",
            minigameBg: "https://images.unsplash.com/photo-1624936188350-883a61a44116?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "AMC Club",
            description: "AMC Club helps students prepare for AMC and other math-related competitions and organizes Math-related school events.",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
            hasMinigame: true,
            minigameUrl: "/secret_pie",
            minigameBg: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=400&q=80"
        },
        {
            name: "MUN/Debate Club",
            description: "Engaging in parliamentary debate and simulating United Nations conferences to solve global challenges.",
            image: "https://images.unsplash.com/photo-1536181783029-1097aaf179de?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "History & Culture Club",
            description: "History & Culture Club is creating a blog that discusses the history of diseases and their effects on societies.",
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
        },
        {
            name: "Future Engineers Club",
            description: "Future Engineers Club dives deep into engineering and mechanics to design and build vehicles.",
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
                            <SponsorTitle>Club Sponsorship</SponsorTitle>
                            <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                                Do you want STUCO to sponor your club on our website? Do you want STUCO to support and advertise
                                <br></br>your events on social media? BCC STUCO offers shout-outs and support for all school clubs!
                            </p>
                            <Button
                                as="a"
                                href="mailto:2027junelee@usbccollegiate.org"
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

                                        <div className="mt-auto d-flex gap-2">
                                            <DisabledButton variant="outline-primary">
                                                Learn More
                                            </DisabledButton>
                                            {club.hasMinigame && (
                                                <MinigameButton
                                                    href={club.minigameUrl}
                                                    bgImage={club.minigameBg}
                                                >
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
