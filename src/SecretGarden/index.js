import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// Import Assets
import bgGate from "./assets/bg_gate.jpg";

const bgMeadow = "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=2000";
// (Plant image imports removed in favor of emojis)

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const popUp = keyframes`
  0% { transform: scale(0); opacity: 0; }
  70% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const GardenContainer = styled.div`
  height: calc(100vh - 56px);
  margin-top: 56px; /* Offset for fixed navbar */
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${props => props.isStarted ? bgMeadow : bgGate});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  font-family: "Gill Sans", sans-serif;
  overflow: hidden;
  position: relative;
  transition: background 1s ease;
  cursor: ${props => props.isStarted ? 'url("https://img.icons8.com/color/48/watering-can.png") 24 24, crosshair' : 'default'};
`;

const ContentBox = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease-out;
  max-width: 600px;
  width: 90%;
  z-index: 10;
  display: ${props => props.hide ? 'none' : 'block'};
`;

const GardenTitle = styled.h1`
  font-family: "Cinzel", serif;
  font-size: 3.5rem;
  margin-bottom: 20px;
  letter-spacing: 3px;
`;

const ComingSoonText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const EmojiPlant = styled.div`
  position: absolute;
  font-size: ${props => props.size}px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform: translate(-50%, -50%);
  animation: ${popUp} 0.5s ease-out forwards;
  pointer-events: ${props => props.active ? 'auto' : 'none'};
  z-index: 5;
  filter: ${props => props.watered ? 'none' : 'grayscale(100%) brightness(0.7)'};
  transition: filter 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  user-select: none;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const HUD = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 40px;
  z-index: 20;
  pointer-events: none;
`;

const StatItem = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 10px 25px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const plantEmojis = [
  "🌱", "🌿", "🪴", "🎄", "🍀", "🌵", "🌴", "🌳", "🌲"
];

const flowerEmojis = [
  "🌸", "🌼", "🌻", "🌷", "🌹", "🌺", "🪻", "🏵️", "🪷"
];

function SecretGarden() {
  const [gameState, setGameState] = React.useState("menu"); // menu, playing, finished
  const [plants, setPlants] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(30);
  const [highScore, setHighScore] = React.useState(() => {
    return parseInt(localStorage.getItem("gardenHighScore") || "0");
  });

  // Game Timer
  React.useEffect(() => {
    let timer;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState("finished");
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // High Score logic
  React.useEffect(() => {
    if (gameState === "finished") {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("gardenHighScore", score.toString());
      }
    }
  }, [gameState, score, highScore]);

  // Spawning Logic
  React.useEffect(() => {
    let spawnInterval;
    if (gameState === "playing") {
      spawnInterval = setInterval(() => {
        const newPlant = {
          id: Date.now(),
          x: Math.random() * (window.innerWidth - 100) + 50,
          y: Math.random() * (window.innerHeight - 250) + 150,
          size: Math.random() * 40 + 80, // Slightly larger base size
          emojiIndex: Math.floor(Math.random() * plantEmojis.length),
          flowerIndex: Math.floor(Math.random() * flowerEmojis.length),
          watered: false,
          expired: false
        };
        setPlants(prev => [...prev, newPlant]);

        // Auto-remove after 3 seconds if not watered
        setTimeout(() => {
          setPlants(prev => prev.filter(p => p.id !== newPlant.id || p.watered));
        }, 3000);

      }, 800);
    }
    return () => clearInterval(spawnInterval);
  }, [gameState]);

  const startGame = () => {
    setGameState("playing");
    setPlants([]);
    setScore(0);
    setTimeLeft(30);
  };

  const handleWaterTarget = (id) => {
    setPlants(prev => prev.map(p => {
      if (p.id === id && !p.watered) {
        setScore(s => s + 10);
        // Remove blooming plant after 1 second
        setTimeout(() => {
          setPlants(current => current.filter(cp => cp.id !== id));
        }, 1000);
        return { ...p, watered: true };
      }
      return p;
    }));
  };

  return (
    <>
      <NavBar />
      <GardenContainer isStarted={gameState === "playing"} onClick={(e) => e.stopPropagation()}>
        {/* HUD */}
        {gameState === "playing" && (
          <HUD>
            <StatItem>💧 Score: {score}</StatItem>
            <StatItem>⏳ Time: {timeLeft}s</StatItem>
          </HUD>
        )}

        {/* Splash Screen */}
        <ContentBox hide={gameState !== "menu"}>
          <GardenTitle>The Secret Garden</GardenTitle>
          <ComingSoonText>
            Water the Digital Plants! <br />
            Click on the plants to water them.
          </ComingSoonText>
          <div style={{ fontSize: "5rem", marginBottom: "30px" }}>🌱🌷🌻</div>
          <Button
            variant="outline-light"
            onClick={startGame}
            size="lg"
            style={{ borderRadius: "30px", padding: "12px 40px", fontWeight: "bold" }}
          >
            Enter the Garden
          </Button>
        </ContentBox>

        {/* Game Over Screen */}
        <ContentBox hide={gameState !== "finished"}>
          <GardenTitle>Garden Tended!</GardenTitle>
          <ComingSoonText>
            Next Challenge: Touch Grass <br />
            <b>Score: {score}</b> <br />
            <span style={{ fontSize: "1rem" }}>High Score: {highScore}</span>
          </ComingSoonText>
          <div style={{ fontSize: "5rem", marginBottom: "30px" }}>🌸🌼🌻</div>
          <Button
            variant="outline-light"
            onClick={startGame}
            size="lg"
            style={{ borderRadius: "30px", padding: "12px 40px", fontWeight: "bold" }}
          >
            Tend Again
          </Button>
        </ContentBox>

        {/* Active Game Elements */}
        {plants.map(plant => (
          <EmojiPlant
            key={plant.id}
            x={plant.x}
            y={plant.y}
            size={plant.size}
            watered={plant.watered}
            active={gameState === "playing" && !plant.watered}
            onClick={(e) => {
              e.stopPropagation();
              handleWaterTarget(plant.id);
            }}
          >
            {plant.watered ? flowerEmojis[plant.flowerIndex] : plantEmojis[plant.emojiIndex]}
          </EmojiPlant>
        ))}

        {gameState === "playing" && plants.length === 0 && (
          <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', pointerEvents: 'none', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            <p style={{ fontSize: '1.2rem' }}>Wait for plants to appear and water them!</p>
          </div>
        )}
      </GardenContainer>
      <Footer />
    </>
  );
}

export default SecretGarden;
