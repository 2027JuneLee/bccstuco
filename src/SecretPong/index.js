import React, { useState, useEffect, useRef, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PongContainer = styled.div`
  height: calc(100vh - 56px);
  margin-top: 56px;
  background: ${props => props.isGaming ? "#050505" : "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1544033527-b192daee1f5b?auto=format&fit=crop&w=1500&q=80')"};
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
  transition: background 0.5s ease;
`;

const ContentBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1s ease-out;
  max-width: 600px;
  width: 90%;
  z-index: 10;
  display: ${props => (props.hide ? "none" : "block")};
`;

const Title = styled.h1`
  font-family: "Cinzel", serif;
  font-size: 3.5rem;
  margin-bottom: 20px;
  letter-spacing: 3px;
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
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 25px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Canvas = styled.canvas`
  background: #000;
  border: 4px solid #111;
  border-radius: 8px;
  cursor: none;
  max-width: 95vw;
  max-height: 65vh;
  display: block;
  transform: translateZ(0); /* Force GPU Layer */
`;

const GameArena = React.memo(({ onGameOver, highScore }) => {
    const canvasRef = useRef(null);
    const livesRef = useRef(null);
    const scoreRef = useRef(null);

    const pRef = useRef({
        pWidth: 200,
        pX: 300,
        targetPX: 300,
        bX: 400,
        bY: 250,
        dx: 5,
        dy: -5,
        lastT: 0,
        lives: 3,
        score: 0
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: false });
        let fId;

        const pH = 15;
        const bR = 10;
        const W = 800;
        const H = 500;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.scale(dpr, dpr);

        const loop = (t) => {
            const p = pRef.current;
            if (!p.lastT) p.lastT = t;
            const dt = Math.min((t - p.lastT) / 16.666, 1.3);
            p.lastT = t;

            // SHARP INPUT: Higher factor means less "float" lag
            p.pX += (p.targetPX - p.pX) * 0.8 * dt;
            if (p.pX < 0) p.pX = 0;
            const maxPX = W - p.pWidth;
            if (p.pX > maxPX) p.pX = maxPX;

            // PRIMITIVE RENDER: Blazing fast
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, W, H);

            // Paddle
            ctx.fillStyle = "#00B4D8";
            ctx.fillRect(Math.floor(p.pX), H - pH - 15, Math.floor(p.pWidth), pH);

            // Ball
            ctx.fillStyle = "#FFF";
            ctx.beginPath();
            ctx.arc(Math.floor(p.bX), Math.floor(p.bY), bR, 0, 7);
            ctx.fill();

            // Physics
            const nX = p.bX + p.dx * dt;
            const nY = p.bY + p.dy * dt;

            if (nX > W - bR || nX < bR) p.dx = -p.dx;
            if (nY < bR) p.dy = -p.dy;

            const pT = H - pH - 15;
            if (nY >= pT - bR && p.bY < pT) {
                if (p.bX >= p.pX - 5 && p.bX <= p.pX + p.pWidth + 5) {
                    p.dy = -Math.abs(p.dy);
                    p.bY = pT - bR;
                    p.dx *= 1.05;
                    p.dy *= 1.05;
                    p.pWidth = Math.max(50, p.pWidth - 4);
                    p.score++;
                    if (scoreRef.current) scoreRef.current.innerText = `⚪ ${p.score}`;
                }
            } else if (nY > H + bR) {
                p.lives--;
                if (p.lives <= 0) {
                    onGameOver(p.score);
                    return;
                } else {
                    if (livesRef.current) livesRef.current.innerText = `❤️ ${p.lives}`;
                    p.bX = W / 2;
                    p.bY = H / 2;
                    p.dx = 5 * (Math.random() > 0.5 ? 1 : -1);
                    p.dy = -5;
                    p.pWidth = Math.min(200, p.pWidth + 20);
                }
            }

            p.bX += p.dx * dt;
            p.bY += p.dy * dt;

            fId = requestAnimationFrame(loop);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) * (W / rect.width);
            pRef.current.targetPX = mouseX - pRef.current.pWidth / 2;
        };

        window.addEventListener("mousemove", handleMouseMove);
        fId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(fId);
        };
    }, [onGameOver]);

    return (
        <>
            <HUD>
                <StatItem ref={livesRef}>❤️ 3</StatItem>
                <StatItem ref={scoreRef}>⚪ 0</StatItem>
                <StatItem>🏆 {highScore}</StatItem>
            </HUD>
            <Canvas ref={canvasRef} style={{ width: 800, height: 500 }} />
        </>
    );
});

function SecretPong() {
    const [gameState, setGameState] = useState("menu");
    const [finalScore, setFinalScore] = useState(0);
    const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem("pongHighScore") || "0"));

    const handleGameOver = useCallback((score) => {
        setFinalScore(score);
        setGameState("finished");
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("pongHighScore", score.toString());
        }
    }, [highScore]);

    const startGame = () => {
        setFinalScore(0);
        setGameState("playing");
    };

    return (
        <>
            <NavBar />
            <PongContainer isGaming={gameState === "playing"}>
                <ContentBox hide={gameState !== "menu"}>
                    <Title>Secret Pong</Title>
                    <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
                        How I Feel When I Play Ping Pong. <br />
                        Please don't let the ball drop!
                    </p>
                    <div style={{ fontSize: "5rem", marginBottom: "30px" }}>⚪🏓🪩</div>
                    <Button variant="outline-light" size="lg" onClick={startGame} style={{ borderRadius: "30px", padding: "12px 40px" }}>
                        Enter Arena
                    </Button>
                </ContentBox>

                <ContentBox hide={gameState !== "finished"}>
                    <Title>Game Over</Title>
                    <p style={{ fontSize: "1.5rem", marginBottom: "30px" }}>
                        Score: <b>{finalScore}</b>
                    </p>
                    <div style={{ fontSize: "5rem", marginBottom: "30px" }}>Try getting over 50 :)</div>
                    <Button variant="outline-light" size="lg" onClick={startGame} style={{ borderRadius: "30px", padding: "12px 40px" }}>
                        Play Again
                    </Button>
                </ContentBox>

                {gameState === "playing" && (
                    <GameArena onGameOver={handleGameOver} highScore={highScore} />
                )}
            </PongContainer>
            <Footer />
        </>
    );
}

export default SecretPong;
