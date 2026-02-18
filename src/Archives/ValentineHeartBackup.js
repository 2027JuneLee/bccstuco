import React from "react";
import styled, { keyframes } from "styled-components";

// This file contains the heart effect and button code used for Valentine's Day 2026.
// It was removed from the MainPage on 2026-02-13 but kept here for future reference.

// --- FROM HeartEffect.js ---
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

export const HeartEffect = ({ isFading }) => {
    const [hearts, setHearts] = React.useState([]);

    React.useEffect(() => {
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

// --- FROM MainPage/index.js ---

export const HeartButton = styled.a`
  position: relative;
  width: 30px;
  height: 30px;
  background-color: #ff4d6d;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transform: rotate(-45deg);
  transition: transform 0.2s, background-color 0.2s;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: #ff4d6d;
    border-radius: 50%;
    transition: background-color 0.2s;
  }

  &::before {
    top: -15px;
    left: 0;
  }

  &::after {
    left: 15px;
    top: 0;
  }

  span {
    position: relative;
    z-index: 1;
    transform: rotate(45deg);
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
    display: block;
    margin-top: -2px;
    margin-left: 2px;
  }

  &:hover {
    background-color: #ff758f;
    transform: rotate(-45deg) scale(1.1);
    text-decoration: none;
    &::before, &::after {
      background-color: #ff758f;
    }
  }
`;

/*
// Reference for how it was used in MainPage:

  const [showHearts, setShowHearts] = React.useState(true);
  const [isFading, setIsFading] = React.useState(false);

  React.useEffect(() => {
    // Stage 1: Start fading after 5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 5000);

    // Stage 2: Stop rendering after fade finishes (2 seconds later)
    const removeTimer = setTimeout(() => {
      setShowHearts(false);
    }, 7000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // JSX:
  {showHearts && <HeartEffect isFading={isFading} />}
  ...
  <HeartButton href="/secret_valentines">
    <span>?</span>
  </HeartButton>
*/
