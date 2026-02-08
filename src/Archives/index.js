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

const ArchiveTitle = styled.h1`
  font-family: "Cinzel", serif;
  color: #023e8a;
  text-align: center;
  margin-bottom: 50px;
  font-weight: 700;
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

const Badge = styled.span`
  background-color: #00b4d8;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
  display: inline-block;
`;

function Archives() {
    const archiveItems = [
        {
            title: "Valentine's Day 2026",
            description: "A short and sweet mini-game!",
            link: "/secret_valentines",
            type: "Event/Game",
            image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "STUCO Website Protoype",
            description: "This was the old STUCO website, intended to act as a prototype before we made a new one.",
            link: "https://bcc-stuco.web.app/",
            type: "Website",
            image: "/1stucoproto.png"
        },
        {
            title: "Rickroll",
            description: "This is a Rickroll.",
            link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            type: "Easter Egg",
            image: "/rickroll.jpeg"
        },
        {
            title: "Secret Garden",
            description: "Grow a garden!",
            link: "/secret_garden",
            type: "Minigame",
            image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Secret Pong",
            description: "Pong but slightly more evil.",
            link: "/secret_pong",
            type: "Minigame",
            image: "https://images.unsplash.com/photo-1624936188350-883a61a44116?auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Secret Pie",
            description: "Design and throw pies & get ready for Pie Day!",
            link: "/secret_pie",
            type: "Event/Minigame",
            image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=400&q=80"
        },
    ];

    return (
        <>
            <NavBar />
            <PageWrapper>
                <Container>
                    <ArchiveTitle>BCC STUCO Archives</ArchiveTitle>
                    <Row>
                        {archiveItems.map((item, index) => (
                            <Col key={index} md={6} lg={4} className="mb-4">
                                <StyledCard>
                                    <Card.Img variant="top" src={item.image} />
                                    <Card.Body className="d-flex flex-column">
                                        <div>
                                            <Badge>{item.type}</Badge>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text style={{ marginBottom: '20px' }}>{item.description}</Card.Text>
                                        </div>
                                        <Button
                                            variant="primary"
                                            href={item.link}
                                            className="mt-auto w-100"
                                            style={{ borderRadius: '25px', backgroundColor: '#023e8a', border: 'none' }}
                                        >
                                            View Archive
                                        </Button>
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

export default Archives;
