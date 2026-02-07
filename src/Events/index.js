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
  margin-top: auto;
`;

// Cookie Helper Functions
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const eraseCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Form State
  const [newEvent, setNewEvent] = useState({ title: "", date: "", body: "", image_url: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchEvents();
    // Check for admin cookie
    const adminCookie = getCookie("adminAuthenticated");
    if (adminCookie === "true") {
      setIsAdmin(true);
    }
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) console.error('Error fetching events:', error);
    else setEvents(data);
  };

  /* Removed handleLogin, password, and showLogin state as login is now handled in /admin */

  const handleLogout = () => {
    setIsAdmin(false);
    eraseCookie("adminAuthenticated");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddEvent = async () => {
    setUploading(true);
    let imageUrl = newEvent.image_url;

    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(filePath, selectedFile);

      if (uploadError) {
        alert("Error uploading image: " + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    const { error } = await supabase
      .from('events')
      .insert([{ ...newEvent, image_url: imageUrl }]);

    if (error) {
      alert("Error adding event: " + error.message);
    } else {
      setShowAddModal(false);
      setNewEvent({ title: "", date: "", body: "", image_url: "" });
      setSelectedFile(null);
      fetchEvents();
    }
    setUploading(false);
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
        <Container style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Title>Upcoming Events</Title>

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

          <AdminControls>
            {isAdmin && (
              <>
                <span className="me-3 text-success">Admin Mode Active</span>
                <Button variant="primary" onClick={() => setShowAddModal(true)} className="me-2">+ Add Event</Button>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </AdminControls>
        </Container>
      </PageWrapper>
      <Footer />

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
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={newEvent.body} onChange={(e) => setNewEvent({ ...newEvent, body: e.target.value })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)} disabled={uploading}>Cancel</Button>
          <Button variant="primary" onClick={handleAddEvent} disabled={uploading}>
            {uploading ? "Uploading..." : "Save Event"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Events;
