import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { supabase } from "./supabaseClient";

const PageWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 60px;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
  font-family: "Gill Sans", sans-serif;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const PageTitle = styled.h1`
  font-family: "Cinzel", serif;
  color: #023e8a;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 600px;
  margin: 0 auto;
`;

const SuggestionFormCard = styled(Card)`
  border: none;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 35px;
  background: white;
`;

const SuggestionFeedCard = styled(Card)`
  border: none;
  border-radius: 16px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FeedHeader = styled.h3`
  font-family: "Cinzel", serif;
  color: #023e8a;
  font-size: 1.5rem;
  margin-bottom: 25px;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 10px;
`;

const FeedList = styled.div`
  overflow-y: auto;
  max-height: 550px;
  flex-grow: 1;
  padding-right: 5px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(2, 62, 138, 0.2);
    border-radius: 20px;
  }
`;

const SuggestionItem = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  border-left: 5px solid ${props => props.color || "#023e8a"};
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const SuggestionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 0.88rem;
`;

const SuggestionText = styled.p`
  margin: 0;
  color: #333;
  line-height: 1.5;
  font-size: 1rem;
`;

const AdminCommentBox = styled.div`
  background: rgba(2, 62, 138, 0.05);
  border-left: 3px solid #023e8a;
  border-radius: 8px;
  padding: 12px 15px;
  margin-top: 15px;
  font-size: 0.92rem;
`;

const CommentHeader = styled.div`
  font-weight: 700;
  color: #023e8a;
  font-family: "Cinzel", serif;
  font-size: 0.78rem;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CommentText = styled.p`
  margin: 0;
  color: #444;
  line-height: 1.4;
`;

const StatusBadge = styled(Badge)`
  font-weight: 600;
  font-size: 0.65rem;
  padding: 5px 10px;
  border-radius: 30px;
  background-color: ${props => props.bgColor} !important;
  color: ${props => props.color || "#fff"} !important;
`;

const LikeButton = styled.button`
  background: ${props => props.hasLiked ? "#e2eafd" : "transparent"};
  border: 1px solid ${props => props.hasLiked ? "#023e8a" : "#ccc"};
  color: ${props => props.hasLiked ? "#023e8a" : "#666"};
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 20px;
  padding: 5px 15px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: "Gill Sans", sans-serif;
  
  &:hover:not(:disabled) {
    background: #e2eafd;
    border-color: #023e8a;
    color: #023e8a;
    transform: scale(1.05);
  }
  
  &:disabled {
    cursor: default;
  }
`;

const StyledButton = styled(Button)`
  font-family: "Gill Sans", sans-serif;
  text-transform: uppercase;
  padding: 12px 30px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 0;
  background-color: #023e8a;
  border: none;
  &:hover {
    background-color: #0077b6;
  }
`;

const CategoryBadge = styled(Badge)`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.65rem;
  padding: 6px 12px;
  border-radius: 30px;
  background-color: ${props => props.color} !important;
`;

const CATEGORIES = {
    "General": { label: "General Suggestion", color: "#023e8a" },
    "Events": { label: "Event Idea", color: "#ff4d6d" },
    "Spirit": { label: "Facilities", color: "#ffb703" },
    "Lunch": { label: "School Snack Menu", color: "#fb8500" }
};

const STATUS_STYLING = {
    "Pending": { label: "Pending Review", bgColor: "#6c757d", color: "#fff" },
    "Approved": { label: "Approved!", bgColor: "#198754", color: "#fff" },
    "Disapproved": { label: "Disapproved", bgColor: "#dc3545", color: "#fff" },
    "Advanced": { label: "Moved to STUCO 🚀", bgColor: "#0d6efd", color: "#fff" }
};

function About() {
    const [suggestion, setSuggestion] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [category, setCategory] = useState("General");
    const [suggestionsList, setSuggestionsList] = useState([]);
    const [likedSuggestions, setLikedSuggestions] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);

    const fetchSuggestions = async () => {
        try {
            const { data, error } = await supabase
                .from("suggestions")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(20);

            if (error) throw error;
            setSuggestionsList(data || []);
        } catch (err) {
            console.warn("Could not fetch suggestions from database. Using local fallback.", err);
            const localData = JSON.parse(localStorage.getItem("bcc_suggestions") || "[]");
            const defaultSuggestions = [
                {
                    id: "def-1",
                    suggestion: "We should organize a volleyball tournament during spirit week!",
                    category: "Events",
                    author_name: "Anonymous",
                    status: "Advanced",
                    likes: 24,
                    admin_comment: "Excellent idea! We are currently planning sport events for Spirit Week.",
                    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
                },
                {
                    id: "def-2",
                    suggestion: "Can we get more vegetarian lunch options in the cafeteria?",
                    category: "Lunch",
                    author_name: "Sarah M.",
                    status: "Approved",
                    likes: 18,
                    admin_comment: "Stuco is forwarding this to the cafeteria directors to search for safe lunch options.",
                    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
                },
                {
                    id: "def-3",
                    suggestion: "A school-wide talent show would be awesome for the end of the year.",
                    category: "Events",
                    author_name: "Alex P.",
                    status: "Pending",
                    likes: 8,
                    admin_comment: null,
                    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
                },
                {
                    id: "def-4",
                    suggestion: "Let's put up more trash cans near the courtyard to prevent littering.",
                    category: "General",
                    author_name: "Anonymous",
                    status: "Pending",
                    likes: 3,
                    admin_comment: null,
                    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
                }
            ];
            setSuggestionsList([...localData, ...defaultSuggestions]);
        }
    };

    useEffect(() => {
        fetchSuggestions();
        const liked = JSON.parse(localStorage.getItem("bcc_liked_suggestions") || "[]");
        setLikedSuggestions(liked);
    }, []);

    const handleSuggestionSubmit = async (e) => {
        e.preventDefault();
        if (!suggestion.trim()) return;

        setIsSubmitting(true);
        setSubmitMessage(null);

        const newSuggestionData = {
            suggestion: suggestion.trim(),
            category: category,
            author_name: authorName.trim() || "Anonymous",
            status: "Pending",
            likes: 0,
            admin_comment: null
        };

        try {
            const { error } = await supabase
                .from("suggestions")
                .insert([newSuggestionData]);

            if (error) throw error;

            setSubmitMessage("Thank you! Your suggestion has been sent to STUCO! 🎉");
            setSuggestion("");
            setAuthorName("");
            setCategory("General");
            fetchSuggestions();
        } catch (err) {
            console.warn("DB insert failed, saving locally:", err);
            const localData = JSON.parse(localStorage.getItem("bcc_suggestions") || "[]");
            const localItem = {
                id: `local-${Date.now()}`,
                created_at: new Date().toISOString(),
                ...newSuggestionData
            };
            const updated = [localItem, ...localData];
            localStorage.setItem("bcc_suggestions", JSON.stringify(updated));

            setSubmitMessage("Thank you! Your suggestion has been saved! 🎉");
            setSuggestion("");
            setAuthorName("");
            setCategory("General");

            const defaultSuggestions = [
                {
                    id: "def-1",
                    suggestion: "We should organize a volleyball tournament during spirit week!",
                    category: "Events",
                    author_name: "Anonymous",
                    status: "Advanced",
                    likes: 24,
                    admin_comment: "Excellent idea! We are currently planning sport events for Spirit Week.",
                    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
                },
                {
                    id: "def-2",
                    suggestion: "Can we get more vegetarian lunch options in the cafeteria?",
                    category: "Lunch",
                    author_name: "Sarah M.",
                    status: "Approved",
                    likes: 18,
                    admin_comment: "Stuco is forwarding this to the cafeteria directors to search for safe lunch options.",
                    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
                },
                {
                    id: "def-3",
                    suggestion: "A school-wide talent show would be awesome for the end of the year.",
                    category: "Events",
                    author_name: "Alex P.",
                    status: "Pending",
                    likes: 8,
                    admin_comment: null,
                    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
                },
                {
                    id: "def-4",
                    suggestion: "Let's put up more trash cans near the courtyard to prevent littering.",
                    category: "General",
                    author_name: "Anonymous",
                    status: "Pending",
                    likes: 3,
                    admin_comment: null,
                    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
                }
            ];
            setSuggestionsList([localItem, ...localData, ...defaultSuggestions]);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage(null), 5000);
        }
    };

    const handleLike = async (id) => {
        if (likedSuggestions.includes(id)) return;

        const newList = [...likedSuggestions, id];
        setLikedSuggestions(newList);
        localStorage.setItem("bcc_liked_suggestions", JSON.stringify(newList));

        // Optimistically update feed
        let currentItem = null;
        setSuggestionsList(prev => prev.map(item => {
            if (item.id === id) {
                currentItem = item;
                return { ...item, likes: (item.likes || 0) + 1 };
            }
            return item;
        }));

        try {
            const { error } = await supabase
                .from("suggestions")
                .update({ likes: (currentItem ? (currentItem.likes || 0) : 0) + 1 })
                .eq("id", id);

            if (error) throw error;
        } catch (err) {
            console.warn("Could not sync like to DB, saving locally:", err);
            // Fallback
            if (typeof id === 'string' && id.startsWith('local-')) {
                const localData = JSON.parse(localStorage.getItem("bcc_suggestions") || "[]");
                const updated = localData.map(item => {
                    if (item.id === id) {
                        return { ...item, likes: (item.likes || 0) + 1 };
                    }
                    return item;
                });
                localStorage.setItem("bcc_suggestions", JSON.stringify(updated));
            } else {
                // Mock fallback increment for default list items
                const defaultsList = JSON.parse(localStorage.getItem("bcc_liked_default_suggestions") || "[]");
                localStorage.setItem("bcc_liked_default_suggestions", JSON.stringify([...defaultsList, id]));
            }
        }
    };

    return (
        <>
            <NavBar />
            <PageWrapper>
                <Container>
                    <HeaderSection>
                        <PageTitle>STUCO Suggestion Box</PageTitle>
                        <PageSubtitle>
                            Have ideas, feedback, or suggestions for our school community? Share them directly with your Student Council!
                        </PageSubtitle>
                    </HeaderSection>

                    <Row>
                        <Col lg={5} className="mb-4">
                            <SuggestionFormCard>
                                <h3 style={{ fontFamily: "Cinzel", color: "#023e8a", fontSize: "1.4rem", marginBottom: "20px" }}>
                                    Submit a Suggestion 📝
                                </h3>
                                {submitMessage && (
                                    <Alert variant="success" className="border-0 shadow-sm" style={{ borderRadius: "10px" }}>
                                        {submitMessage}
                                    </Alert>
                                )}
                                <Form onSubmit={handleSuggestionSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ fontWeight: "600", color: "#555" }}>Your Name (Optional)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="e.g. Anonymous, Rick Roller"
                                            value={authorName}
                                            onChange={(e) => setAuthorName(e.target.value)}
                                            style={{ borderRadius: "8px", padding: "10px" }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ fontWeight: "600", color: "#555" }}>Category</Form.Label>
                                        <Form.Select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            style={{ borderRadius: "8px", padding: "10px" }}
                                        >
                                            <option value="General">General Suggestion</option>
                                            <option value="Events">Event Idea</option>
                                            <option value="Spirit">Facilities</option>
                                            <option value="Lunch">School Snack Menu</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ fontWeight: "600", color: "#555" }}>Your Suggestion</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="What should STUCO do next? Share your thoughts, ideas, or feedback!"
                                            value={suggestion}
                                            onChange={(e) => setSuggestion(e.target.value)}
                                            required
                                            style={{ borderRadius: "8px", padding: "10px" }}
                                        />
                                    </Form.Group>
                                    <div className="d-grid mt-4">
                                        <StyledButton type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting..." : "Submit Suggestion"}
                                        </StyledButton>
                                    </div>
                                </Form>
                            </SuggestionFormCard>
                        </Col>

                        <Col lg={7} className="mb-4">
                            <SuggestionFeedCard>
                                <FeedHeader>Recent Suggestions 💡</FeedHeader>
                                <FeedList>
                                    {suggestionsList.length === 0 ? (
                                        <div className="text-center text-muted p-4">No suggestions yet. Be the first to share one!</div>
                                    ) : (
                                        suggestionsList.map((item) => {
                                            const catInfo = CATEGORIES[item.category] || CATEGORIES.General;
                                            const statusInfo = STATUS_STYLING[item.status || "Pending"] || STATUS_STYLING.Pending;
                                            const hasLiked = likedSuggestions.includes(item.id);

                                            return (
                                                <SuggestionItem key={item.id} color={catInfo.color}>
                                                    <SuggestionMeta>
                                                        <div>
                                                            <span className="fw-bold me-2" style={{ color: "#1d3557" }}>{item.author_name}</span>
                                                            <CategoryBadge color={catInfo.color}>{catInfo.label}</CategoryBadge>
                                                        </div>
                                                        <StatusBadge bgColor={statusInfo.bgColor} color={statusInfo.color}>
                                                            {statusInfo.label}
                                                        </StatusBadge>
                                                    </SuggestionMeta>
                                                    <SuggestionText>{item.suggestion}</SuggestionText>

                                                    {item.admin_comment && (
                                                        <AdminCommentBox>
                                                            <CommentHeader>🎓 STUCO Response</CommentHeader>
                                                            <CommentText>{item.admin_comment}</CommentText>
                                                        </AdminCommentBox>
                                                    )}

                                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                                        <LikeButton
                                                            onClick={() => handleLike(item.id)}
                                                            disabled={hasLiked}
                                                            hasLiked={hasLiked}
                                                        >
                                                            👍 {hasLiked ? "Liked" : "Like"} ({item.likes || 0})
                                                        </LikeButton>
                                                        <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                                                            {new Date(item.created_at).toLocaleDateString()}
                                                        </small>
                                                    </div>
                                                </SuggestionItem>
                                            );
                                        })
                                    )}
                                </FeedList>
                            </SuggestionFeedCard>
                        </Col>
                    </Row>
                </Container>
            </PageWrapper>
            <Footer />
        </>
    );
}

export default About;
