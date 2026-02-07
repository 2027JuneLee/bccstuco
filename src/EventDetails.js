import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { supabase } from "./supabaseClient";

const PageWrapper = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Gill Sans", sans-serif;
`;

const DetailImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 30px;
`;

const EventTitle = styled.h1`
  font-family: "Cinzel", serif;
  color: #023e8a;
  margin-bottom: 10px;
`;

const EventMeta = styled.div`
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 20px;
`;

const EventBody = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  white-space: pre-wrap; // Preserves line breaks
  margin-bottom: 60px;
`;

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEventDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchEventDetails = async () => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching event:", error);
            // navigate('/events'); // Redirect if not found
        } else {
            setEvent(data);
        }
        setLoading(false);
    };

    if (loading) return <PageWrapper><Container>Loading...</Container></PageWrapper>;
    if (!event) return <PageWrapper><Container>Event not found.</Container></PageWrapper>;

    return (
        <>
            <NavBar />
            <PageWrapper>
                <Container>
                    <Button variant="outline-secondary" className="mb-4" style={{ marginTop: '30px' }} onClick={() => navigate('/events')}>
                        &larr; Back to Events
                    </Button>

                    {event.image_url && <DetailImage src={event.image_url} alt={event.title} />}

                    <EventTitle>{event.title}</EventTitle>
                    <EventMeta>{new Date(event.date).toLocaleDateString()}</EventMeta>

                    <EventBody>
                        {event.body}
                    </EventBody>
                </Container>
            </PageWrapper>
            <Footer />
        </>
    );
};

export default EventDetails;
