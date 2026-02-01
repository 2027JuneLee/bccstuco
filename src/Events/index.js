import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import { supabase } from "../supabaseClient";

const PageWrapper = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Gill Sans", sans-serif;
`;

const Title = styled.h1`
  font-family: "Cinzel", serif;
  color: #023e8a;
  text-align: center;
  margin-bottom: 40px;
`;

const AdminControls = styled.div`
  text-align: right;
  margin-bottom: 20px;
`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({ title: "", date: "", body: "", image_url: "" });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) console.error('Error fetching events:', error);
    else setEvents(data);
  };

  const handleLogin = () => {
    if (password === "bccstuco2025") {
      setIsAdmin(true);
      setShowLogin(false);
    } else {
      alert("Incorrect password");
    }
  };

  const handleAddEvent = async () => {
    const { error } = await supabase
      .from('events')
      .insert([newEvent]);

    if (error) {
      alert("Error adding event: " + error.message);
    } else {
      setShowAddModal(false);
      setNewEvent({ title: "", date: "", body: "", image_url: "" });
      fetchEvents();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) alert("Error deleting: " + error.message);
      else fetchEvents();
    }
  };

  return (
    <>
      <NavBar />
      <PageWrapper>
        <Container>
          <Title>Upcoming Events</Title>

          <AdminControls>
            {!isAdmin ? (
              <Button variant="link" onClick={() => setShowLogin(true)} style={{ fontSize: '0.8rem', color: '#ccc' }}>Admin Login</Button>
            ) : (
              <>
                <span className="me-3 text-success">Admin Mode Active</span>
                <Button variant="primary" onClick={() => setShowAddModal(true)}>+ Add Event</Button>
              </>
            )}
          </AdminControls>

          <Row>
            {events.length === 0 ? (
              <p className="text-center">No upcoming events found.</p>
            ) : (
              events.map(event => (
                <Col key={event.id} md={4}>
                  <EventCard event={event} />
                  {isAdmin && (
                    <Button variant="danger" size="sm" className="mt-2 w-100" onClick={() => handleDelete(event.id)}>
                      Delete Event
                    </Button>
                  )}
                </Col>
              ))
            )}
          </Row>
        </Container>
      </PageWrapper>
      <Footer />

      {/* Admin Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton><Modal.Title>Admin Login</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogin}>Login</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Event Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add New Event</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL (Optional)</Form.Label>
            <Form.Control type="text" value={newEvent.image_url} onChange={(e) => setNewEvent({ ...newEvent, image_url: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={newEvent.body} onChange={(e) => setNewEvent({ ...newEvent, body: e.target.value })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddEvent}>Save Event</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Events;
