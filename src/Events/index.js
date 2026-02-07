import React, { useEffect, useState, useCallback } from "react";
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
  const [filter, setFilter] = useState("upcoming"); // "upcoming" or "previous"

  // Event Form State
  const [newEvent, setNewEvent] = useState({ title: "", date: "", body: "", image_url: "", is_upcoming: true });
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchEvents = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];
    const isUpcomingFilter = filter === "upcoming";

    let query = supabase.from('events').select('*');

    if (isUpcomingFilter) {
      // Upcoming: manually checked AND date is today or later
      query = query.eq('is_upcoming', true).gte('date', today);
    } else {
      // Previous: manually unchecked OR date has passed
      query = query.or(`is_upcoming.eq.false,date.lt.${today}`);
    }

    const { data, error } = await query.order('date', { ascending: isUpcomingFilter });

    if (error) {
      console.error('Error fetching events:', error);
      // If error is because column is missing, notify user but maybe show all
      if (error.message.includes("column \"is_upcoming\" does not exist")) {
        alert("Database update required! Please run the updated schema.sql in Supabase to enable event sorting.");
      }
    } else {
      setEvents(data);
    }
  }, [filter]);

  useEffect(() => {
    fetchEvents();
    // Check for admin cookie
    const adminCookie = getCookie("adminAuthenticated");
    if (adminCookie === "true") {
      setIsAdmin(true);
    }
  }, [fetchEvents]);

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

  const handleEdit = (event) => {
    setNewEvent({
      title: event.title,
      date: event.date,
      body: event.body,
      image_url: event.image_url,
      is_upcoming: event.is_upcoming
    });
    setIsEditing(true);
    setEditingEventId(event.id);
    setShowAddModal(true);
  };

  const handleSaveEvent = async () => {
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

    if (isEditing) {
      const { error } = await supabase
        .from('events')
        .update({ ...newEvent, image_url: imageUrl })
        .eq('id', editingEventId);

      if (error) {
        alert("Error updating event: " + error.message);
      } else {
        handleModalClose();
        fetchEvents();
      }
    } else {
      const { error } = await supabase
        .from('events')
        .insert([{ ...newEvent, image_url: imageUrl }]);

      if (error) {
        alert("Error adding event: " + error.message);
      } else {
        handleModalClose();
        fetchEvents();
      }
    }
    setUploading(false);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setIsEditing(false);
    setEditingEventId(null);
    setNewEvent({ title: "", date: "", body: "", image_url: "", is_upcoming: true });
    setSelectedFile(null);
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
          <Title>{filter === "upcoming" ? "Upcoming Events" : "Previous Events"}</Title>

          <div className="text-center mb-5" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h5 className="mb-3 text-muted">Filter Events</h5>
            <Button
              variant={filter === "upcoming" ? "primary" : "outline-primary"}
              className="me-3 px-4 py-2"
              style={{ borderRadius: '30px', fontWeight: 'bold' }}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === "previous" ? "primary" : "outline-primary"}
              className="px-4 py-2"
              style={{ borderRadius: '30px', fontWeight: 'bold' }}
              onClick={() => setFilter("previous")}
            >
              Previous
            </Button>
          </div>

          <Row>
            {events.length === 0 ? (
              <p className="text-center">No {filter} events found.</p>
            ) : (
              events.map(event => (
                <Col key={event.id} md={4}>
                  <EventCard event={event} />
                  {isAdmin && (
                    <div className="mt-2 d-flex gap-2">
                      <Button variant="danger" size="sm" className="w-50" onClick={() => handleDelete(event.id)}>
                        Delete
                      </Button>
                      <Button variant="warning" size="sm" className="w-50" onClick={() => handleEdit(event)}>
                        Edit
                      </Button>
                    </div>
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

      {/* Add/Edit Event Modal */}
      <Modal show={showAddModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Event" : "Add New Event"}</Modal.Title>
        </Modal.Header>
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
            <Form.Check
              type="checkbox"
              label="Upcoming Event"
              checked={newEvent.is_upcoming}
              onChange={(e) => setNewEvent({ ...newEvent, is_upcoming: e.target.checked })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image (Leave blank to keep current)</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={newEvent.body} onChange={(e) => setNewEvent({ ...newEvent, body: e.target.value })} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose} disabled={uploading}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveEvent} disabled={uploading}>
            {uploading ? "Uploading..." : (isEditing ? "Update Event" : "Save Event")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Events;
