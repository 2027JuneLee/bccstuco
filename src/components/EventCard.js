import React from "react";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  border: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  }
`;

const CardImage = styled(Card.Img)`
  height: 200px;
  object-fit: cover;
`;

const EventDate = styled.div`
  color: #023e8a;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    return (
        <StyledCard>
            {event.image_url && <CardImage variant="top" src={event.image_url} />}
            <Card.Body>
                <EventDate>{new Date(event.date).toLocaleDateString()}</EventDate>
                <Card.Title style={{ fontFamily: "Cinzel, serif" }}>{event.title}</Card.Title>
                <Card.Text>
                    {event.body.substring(0, 100)}...
                </Card.Text>
                <Button variant="outline-primary" onClick={() => navigate(`/events/${event.id}`)}>
                    Read More
                </Button>
            </Card.Body>
        </StyledCard >
    );
};

export default EventCard;
