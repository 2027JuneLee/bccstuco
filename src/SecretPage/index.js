import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
`;

const SecretContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: #d63384;
`;

const FloatingHeart = styled.div`
  position: absolute;
  bottom: -50px;
  background-color: rgba(255, 255, 255, 0.4);
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  animation: ${float} linear infinite;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: inherit;
    border-radius: 50%;
  }
  &::before { left: -10px; }
  &::after { top: -10px; }
`;

const SecretContent = styled.div`
  z-index: 10;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  padding: 50px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const Title = styled.h1`
  font-family: 'Cinzel', serif;
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-family: 'Gill Sans', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 30px;
`;

const HeartButtonLarge = styled.button`
  background: #ff4d6d;
  color: white;
  border: none;
  padding: 20px 40px;
  font-size: 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
  box-shadow: 0 5px 15px rgba(255, 77, 109, 0.4);
  
  &:hover {
    transform: scale(1.1);
    background-color: #ff758f;
  }
`;

const fall = keyframes`
  0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(500px) rotate(360deg); opacity: 0; }
`;

const GameHeart = styled.div`
  position: absolute;
  top: -50px;
  background-color: #ff4d6d;
  width: 30px;
  height: 30px;
  transform: rotate(45deg);
  animation: ${fall} 3s linear forwards;
  cursor: pointer;
  z-index: 20;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: inherit;
    border-radius: 50%;
  }
  &::before { left: -15px; }
  &::after { top: -15px; }
  
  &:hover {
    background-color: #ff758f;
    transform: rotate(45deg) scale(1.2);
  }
`;

const ScoreBoard = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ff4d6d;
`;

const WinMessage = styled.div`
    font-size: 2rem;
    color: #ff4d6d;
    font-family: 'Cinzel', serif;
    margin-top: 20px;
    animation: ${keyframes`from {transform: scale(0);} to {transform: scale(1);}`} 0.5s ease-out;
`;

function SecretPage() {
    const [hearts, setHearts] = React.useState([]);
    const [gameActive, setGameActive] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [gameHearts, setGameHearts] = React.useState([]);
    const [won, setWon] = React.useState(false);

    const addHeart = () => {
        const id = Date.now();
        const style = {
            left: Math.random() * 100 + "vw",
            animationDuration: Math.random() * 3 + 2 + "s",
            width: Math.random() * 20 + 10 + "px",
            height: Math.random() * 20 + 10 + "px"
        };
        setHearts(prev => [...prev, { id, style }]);
        setTimeout(() => {
            setHearts(prev => prev.filter(h => h.id !== id));
        }, 5000);
    };

    const startGame = () => {
        setGameActive(true);
        setScore(0);
        setGameHearts([]);
        setWon(false);
    };

    React.useEffect(() => {
        let interval;
        if (gameActive && !won) {
            interval = setInterval(() => {
                const id = Date.now();
                const left = Math.random() * 80 + 10; // keep within content bounds roughly
                setGameHearts(prev => [...prev, { id, left }]);

                // Remove heart after animation
                setTimeout(() => {
                    setGameHearts(prev => prev.filter(h => h.id !== id));
                }, 3000);
            }, 800);
        }
        return () => clearInterval(interval);
    }, [gameActive, won]);

    const catchHeart = (id) => {
        setScore(prev => {
            const newScore = prev + 1;
            if (newScore >= 15) {
                setWon(true);
                // Trigger explosion of decorative hearts
                for (let i = 0; i < 20; i++) {
                    setTimeout(addHeart, i * 100);
                }
            }
            return newScore;
        });
        setGameHearts(prev => prev.filter(h => h.id !== id));
    };

    return (
        <>
            <NavBar />
            <SecretContainer>
                {/* Decorative background hearts */}
                {hearts.map(h => (
                    <FloatingHeart key={h.id} style={{
                        ...h.style,
                        left: h.style.left,
                        width: h.style.width,
                        height: h.style.height
                    }} />
                ))}

                <SecretContent style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', minWidth: '500px' }}>
                    <Title>Happy Valentine's Day!</Title>
                    <Message>Enjoy this short game!</Message>

                    {!gameActive && !won && (
                        <>
                            <HeartButtonLarge onClick={addHeart}>❤️❤️❤️</HeartButtonLarge>
                            <div style={{ marginTop: '30px' }}>
                                <Button variant="danger" size="lg" onClick={startGame} style={{ borderRadius: '50px', padding: '10px 30px' }}>
                                    Play Heart Catcher
                                </Button>
                            </div>
                        </>
                    )}

                    {gameActive && !won && (
                        <>
                            <ScoreBoard>Hearts Caught: {score} / 15</ScoreBoard>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                                {gameHearts.map(h => (
                                    <GameHeart
                                        key={h.id}
                                        style={{ left: `${h.left}%`, pointerEvents: 'auto' }}
                                        onClick={() => catchHeart(h.id)}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {won && (
                        <>
                            <WinMessage>You Win!</WinMessage>
                            <Message style={{ marginTop: '20px' }}>
                                In case you thought this game is too easy, I have <br></br> something much harder planned for International Day :)<br />
                                <strong>Hope You Enjoyed this Game!</strong>
                            </Message>
                            <div style={{ marginTop: '30px' }}>
                                <Button variant="outline-danger" href="/" size="lg" style={{ borderRadius: '50px' }}>
                                    Back to Home
                                </Button>
                            </div>
                        </>
                    )}
                </SecretContent>
            </SecretContainer>
            <Footer />
        </>
    );
}

export default SecretPage;
