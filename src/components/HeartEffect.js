import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fall = keyframes`
  0% {
    transform: translateY(-10vh) translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) translateX(100px);
    opacity: 0;
  }
`;

const HeartContainer = styled.div`
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
  top: -50px;
  font-size: ${props => props.size}px;
  left: ${props => props.left}%;
  animation: ${fall} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  user-select: none;
`;

const HeartEffect = ({ isFading }) => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const heartEmojis = ["❤️", "💖", "💝", "💗", "💓"];
        const newHearts = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
            left: Math.random() * 100,
            size: Math.random() * (30 - 15) + 15,
            duration: Math.random() * (5 - 3) + 3,
            delay: Math.random() * 2,
        }));
        setHearts(newHearts);
    }, []);

    return (
        <HeartContainer isFading={isFading}>
            {hearts.map(heart => (
                <Heart
                    key={heart.id}
                    left={heart.left}
                    size={heart.size}
                    duration={heart.duration}
                    delay={heart.delay}
                >
                    {heart.emoji}
                </Heart>
            ))}
        </HeartContainer>
    );
};

export default HeartEffect;
