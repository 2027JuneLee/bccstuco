import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const moveX = keyframes`
  from { left: 0; }
  to { left: calc(100% - 40px); }
`;

const moveY = keyframes`
  from { top: 0; }
  to { top: calc(100% - 40px); }
`;

const PongContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
  transition: opacity 2s ease-out;
  opacity: ${props => props.isFading ? 0 : 1};
`;

const Heart = styled.div`
  position: absolute;
  font-size: ${props => props.size}px;
  animation: 
    ${moveX} ${props => props.durationX}s linear infinite alternate,
    ${moveY} ${props => props.durationY}s linear infinite alternate;
  user-select: none;
  will-change: transform, left, top;
`;

const PongHeartEffect = ({ isFading }) => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const heartEmojis = ["❤️", "💖", "💝", "💗", "💓"];
        const newHearts = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
            size: Math.random() * (40 - 25) + 25,
            // Different durations for X and Y creates the "Pong" bounce pattern
            durationX: Math.random() * (4 - 2) + 2,
            durationY: Math.random() * (5 - 3) + 3,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <PongContainer isFading={isFading}>
            {hearts.map(heart => (
                <Heart
                    key={heart.id}
                    size={heart.size}
                    durationX={heart.durationX}
                    durationY={heart.durationY}
                >
                    {heart.emoji}
                </Heart>
            ))}
        </PongContainer>
    );
};

export default PongHeartEffect;
