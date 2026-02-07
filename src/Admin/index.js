import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Row, Col, Form, Button, Card, Table, Badge, Alert } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
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

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [questions, setQuestions] = useState([]);
    const [answerInputs, setAnswerInputs] = useState({});

    useEffect(() => {
        const adminCookie = getCookie("adminAuthenticated");
        if (adminCookie === "true") {
            setIsAuthenticated(true);
            fetchQuestions();
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === "bccstuco2025") {
            setIsAuthenticated(true);
            setCookie("adminAuthenticated", "true", 7);
            fetchQuestions();
        } else {
            alert("Incorrect password");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        eraseCookie("adminAuthenticated");
        setQuestions([]);
    };

    const fetchQuestions = async () => {
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .order('is_answered', { ascending: true }) // Pending first
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching questions:', error);
        else setQuestions(data);
    };

    const handleAnswerChange = (id, text) => {
        setAnswerInputs(prev => ({ ...prev, [id]: text }));
    };

    const handleSubmitAnswer = async (id) => {
        const answerText = answerInputs[id];
        if (!answerText) return;

        const { error } = await supabase
            .from('questions')
            .update({ answer: answerText, is_answered: true })
            .eq('id', id);

        if (error) {
            alert("Error submitting answer: " + error.message);
        } else {
            setAnswerInputs(prev => ({ ...prev, [id]: "" }));
            fetchQuestions();
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            const { error } = await supabase
                .from('questions')
                .delete()
                .eq('id', id);

            if (error) alert("Error deleting: " + error.message);
            else fetchQuestions();
        }
    };

    return (
        <>
            <NavBar />
            <PageWrapper>
                <Container>
                    <Title>Admin Dashboard</Title>

                    {!isAuthenticated ? (
                        <Row className="justify-content-center">
                            <Col md={6}>
                                <Card className="p-4 shadow-sm">
                                    <h4 className="text-center mb-3">Admin Login</h4>
                                    <Form onSubmit={handleLogin}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoFocus
                                            />
                                        </Form.Group>
                                        <div className="d-grid">
                                            <Button variant="primary" type="submit">Login</Button>
                                        </div>
                                    </Form>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4>Welcome, Admin</h4>
                                <div className="d-flex gap-2">
                                    <Button variant="outline-primary" href="/events">Manage Events</Button>
                                    <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                                </div>
                            </div>

                            <Card className="mb-4 shadow-sm border-0">
                                <Card.Header className="bg-white">
                                    <h5 className="mb-0 text-primary" style={{ fontFamily: "Cinzel" }}>Q&A Management</h5>
                                </Card.Header>
                                <Card.Body>
                                    {questions.length === 0 ? (
                                        <Alert variant="info">No questions found.</Alert>
                                    ) : (
                                        <div className="table-responsive">
                                            <Table striped hover>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: '20%' }}>Author/Date</th>
                                                        <th style={{ width: '35%' }}>Question</th>
                                                        <th style={{ width: '35%' }}>Answer</th>
                                                        <th style={{ width: '10%' }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {questions.map(q => (
                                                        <tr key={q.id}>
                                                            <td>
                                                                <div className="fw-bold">{q.author_name}</div>
                                                                <small className="text-muted">{new Date(q.created_at).toLocaleDateString()}</small>
                                                                <div className="mt-1">
                                                                    {q.is_answered ? <Badge bg="success">Answered</Badge> : <Badge bg="warning" text="dark">Pending</Badge>}
                                                                </div>
                                                            </td>
                                                            <td>{q.question}</td>
                                                            <td>
                                                                {q.is_answered ? (
                                                                    <div className="text-success">{q.answer}</div>
                                                                ) : (
                                                                    <div className="d-flex flex-column gap-2">
                                                                        <Form.Control
                                                                            as="textarea"
                                                                            rows={2}
                                                                            placeholder="Type answer..."
                                                                            value={answerInputs[q.id] || ""}
                                                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                                        />
                                                                        <Button size="sm" variant="primary" onClick={() => handleSubmitAnswer(q.id)}>Submit</Button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <Button size="sm" variant="danger" onClick={() => handleDelete(q.id)}>Delete</Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </>
                    )}
                </Container>
            </PageWrapper>
            <Footer />
        </>
    );
};

export default Admin;
