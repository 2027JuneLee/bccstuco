import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const PageWrapper = styled.div`
  padding-top: 80px; // Offset for fixed navbar
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Gill Sans", sans-serif;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-family: "Cinzel", serif;
  color: #023e8a;
  margin-bottom: 30px;
  text-align: center;
`;

const TextBlock = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
`;

function About() {
    return (
        <>
            <NavBar />
            <PageWrapper>
                <Container>
                    <Content>
                        <Title>About STUCO</Title>
                        <TextBlock>
                            {/*<p>
                                Welcome to the BC Collegiate Student Council (STUCO). We are dedicated to serving the student body
                                by organizing events, fostering school spirit, and providing a voice for students.
                            </p>
                            <p>
                                Our mission is to create an inclusive and engaging environment where every student feels valued.
                                From academic support to social gatherings, STUCO is here to make your high school experience memorable.
                            </p>
                            <p>
                                <strong>2025-2026 Academic Year</strong> marks a new chapter of growth and community building.
                                Stay tuned for exciting updates!
                            </p>
                            */}
                            <p>Coming Soon!!!!!</p>
                        </TextBlock>
                    </Content>
                </Container>
            </PageWrapper>
            <Footer />
        </>
    );
}

export default About;
