import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// Import Assets
import bgGate from "./assets/bg_gate.jpg";
import bgMeadow from "./assets/bg_meadow.jpg";
import plant1 from "./assets/plant1.jpg";
import plant2 from "./assets/plant2.jpg";
import plant3 from "./assets/plant3.jpg";
import plant4 from "./assets/plant4.jpg";
import plant5 from "./assets/plant5.jpg";
import plant6 from "./assets/plant6.jpg";
import plant7 from "./assets/plant7.jpg";
import plant8 from "./assets/plant8.jpg";
import plant9 from "./assets/plant9.jpg";
import plant10 from "./assets/plant10.jpg";

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

const PlantOverlay = styled.img`
  position: absolute;
  width: ${props => props.size}px;
  height: auto;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform: translate(-50%, -50%);
  animation: ${popUp} 0.5s ease-out forwards;
  pointer-events: none;
  z-index: 5;
`;

const plantImages = [
    plant1, plant2, plant3, plant4, plant5,
    plant6, plant7, plant8, plant9, plant10
];

function SecretGarden() {
    const [isStarted, setIsStarted] = React.useState(false);
    const [plants, setPlants] = React.useState([]);

    const handlePlant = (e) => {
        if (!isStarted) return;

        // Calculate position relative to container
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newPlant = {
            id: Date.now(),
            x,
            y,
            size: Math.random() * 50 + 60, // Random size between 60 and 110
            imgIndex: Math.floor(Math.random() * plantImages.length)
        };

        setPlants(prev => [...prev, newPlant]);
    };

    return (
        <>
            <NavBar />
            <GardenContainer isStarted={isStarted} onClick={handlePlant}>
                <ContentBox hide={isStarted}>
                    <GardenTitle>The Secret Garden</GardenTitle>
                    <ComingSoonText>
                        Something botanical is growing here... <br />
                        Our Gardening Club is carefully cultivating a special minigame just for you.
                    </ComingSoonText>
                    <div style={{ fontSize: "5rem", marginBottom: "30px" }}>🌱🌷🌻</div>
                    <Button
                        variant="outline-light"
                        onClick={() => setIsStarted(true)}
                        size="lg"
                        style={{ borderRadius: "30px", padding: "12px 40px", fontWeight: "bold" }}
                    >
                        Enter the Garden
                    </Button>
                </ContentBox>

                {plants.map(plant => (
                    <PlantOverlay
                        key={plant.id}
                        src={plantImages[plant.imgIndex]}
                        x={plant.x}
                        y={plant.y}
                        size={plant.size}
                    />
                ))}

                {isStarted && (
                    <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', pointerEvents: 'none', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        <p style={{ fontSize: '1.2rem' }}>Click anywhere to plant a flower!</p>
                    </div>
                )}
            </GardenContainer>
            <Footer />
        </>
    );
}

export default SecretGarden;
