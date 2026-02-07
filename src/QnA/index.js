import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Row, Col, Form, Button, Card, Badge } from "react-bootstrap";
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

const QuestionCard = styled(Card)`
  margin-bottom: 20px;
  border: none;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const QuestionHeader = styled(Card.Header)`
  background-color: #f8f9fa;
  font-weight: bold;
  color: #023e8a;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AnswerSection = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  color: #28a745;
`;

// Helper function to get cookie (reused from Events)
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

const QnA = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [answerInputs, setAnswerInputs] = useState({}); // Map of questionId -> answer text

    useEffect(() => {
        fetchQuestions();
        const adminCookie = getCookie("adminAuthenticated");
        if (adminCookie === "true") {
            setIsAdmin(true);
        }
    }, []);

    const fetchQuestions = async () => {
        const { data, error } = await supabase
            .from('questions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching questions:', error);
        else setQuestions(data);
    };

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;

        const { error } = await supabase
            .from('questions')
            .insert([{ question: newQuestion, author_name: newAuthor || "Anonymous", is_answered: false }]);

        if (error) {
            alert("Error submitting question: " + error.message);
        } else {
            setNewQuestion("");
            setNewAuthor("");
            fetchQuestions();
        }
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
                    <Title>Student Forum & Q&A</Title>

                    <Row className="justify-content-center mb-5">
                        <Col md={8}>
                            <Card>
                                <Card.Body>
                                    <Card.Title className="text-center mb-4">Ask a Question</Card.Title>
                                    <Form onSubmit={handleSubmitQuestion}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Your Name (Optional)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Anonymous"
                                                value={newAuthor}
                                                onChange={(e) => setNewAuthor(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Question</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="What's on your mind?"
                                                value={newQuestion}
                                                onChange={(e) => setNewQuestion(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <div className="d-grid">
                                            <Button variant="primary" type="submit">Submit Question</Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h3 className="mb-4" style={{ fontFamily: "Cinzel", color: "#1d3557" }}>Recent Questions</h3>
                            {questions.length === 0 ? (
                                <p>No questions yet. Be the first to ask!</p>
                            ) : (
                                questions.map(q => (
                                    <QuestionCard key={q.id}>
                                        <QuestionHeader>
                                            <span>{q.author_name} asks:</span>
                                            {q.is_answered ? <Badge bg="success">Answered</Badge> : <Badge bg="secondary">Pending</Badge>}
                                        </QuestionHeader>
                                        <Card.Body>
                                            <Card.Text style={{ fontSize: "1.1rem" }}>{q.question}</Card.Text>

                                            {q.answer && (
                                                <AnswerSection>
                                                    <strong>STUCO Response:</strong>
                                                    <p className="mb-0">{q.answer}</p>
                                                </AnswerSection>
                                            )}

                                            {isAdmin && (
                                                <div className="mt-3 pt-3 border-top">
                                                    <h6 className="text-muted">Admin Controls</h6>
                                                    {!q.is_answered && (
                                                        <Form.Group className="mb-2">
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Type answer..."
                                                                value={answerInputs[q.id] || ""}
                                                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                            />
                                                        </Form.Group>
                                                    )}
                                                    <div className="d-flex gap-2">
                                                        {!q.is_answered && (
                                                            <Button size="sm" variant="success" onClick={() => handleSubmitAnswer(q.id)}>Submit Answer</Button>
                                                        )}
                                                        <Button size="sm" variant="danger" onClick={() => handleDelete(q.id)}>Delete</Button>
                                                    </div>
                                                </div>
                                            )}
                                        </Card.Body>
                                        <Card.Footer className="text-muted" style={{ fontSize: "0.8rem" }}>
                                            Posted on {new Date(q.created_at).toLocaleDateString()}
                                        </Card.Footer>
                                    </QuestionCard>
                                ))
                            )}
                        </Col>
                    </Row>
                </Container>
            </PageWrapper>
            <Footer />
        </>
    );
};

export default QnA;
