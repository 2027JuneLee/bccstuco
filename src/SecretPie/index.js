import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import html2canvas from "html2canvas";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const splatAnimation = keyframes`
  0% { transform: scale(0.5) translate(-50%, -50%); opacity: 0; }
  50% { transform: scale(1.1) translate(-50%, -50%); opacity: 1; }
  100% { transform: scale(1) translate(-50%, -50%); opacity: 1; }
`;

const throwAnimation = keyframes`
  0% { transform: scale(1) translate(-50%, 0); opacity: 1; bottom: 0; }
  100% { transform: scale(1.5) translate(-50%, 0); opacity: 0; bottom: 50%; }
`;

const bubbleAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  20% { transform: scale(1.2); opacity: 1; }
  80% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0); opacity: 0; }
`;

const GameWrapper = styled.div`
  min-height: calc(100vh - 56px);
  margin-top: 56px;
  padding: 80px 20px 120px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
  position: relative;
  font-family: "Gill Sans", sans-serif;
  cursor: ${props => (props.isReadyToThrow || props.hasSelectedIngredient) ? 'none' : 'default'};
`;

const CustomCursor = styled.div`
  position: fixed;
  pointer-events: none;
  font-size: ${props => props.isPie ? '4rem' : '2.5rem'};
  z-index: 2000;
  transform: translate(-50%, -50%);
  display: ${props => props.active ? 'block' : 'none'};
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  text-shadow: 0 5px 15px rgba(0,0,0,0.5);
`;

const Person = styled.div`
  position: absolute;
  top: 50%;
  ${props => props.side === 'left' ? 'left: 12%;' : 'right: 12%;'}
  transform: translateY(-50%);
  font-size: 8rem;
  z-index: 5;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
`;

const SpeechBubble = styled.div`
  background: white;
  color: #333;
  padding: 12px 24px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  z-index: 10;
  animation: ${bubbleAnimation} 1.5s ease-out forwards;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    border-width: 10px 10px 0; border-style: solid;
    border-color: white transparent transparent;
    transform: translateX(-50%);
  }
`;

const PieBuilder = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.8s ease-out;
  z-index: 10;
  max-width: 500px;
  width: 90%;
  position: relative;
`;

const PieBase = styled.div`
  width: ${props => props.size || '250px'};
  height: ${props => props.size || '250px'};
  background: ${props => props.fillColor || '#f4d03f'};
  border-radius: 50%;
  border: ${props => props.borderSize || '8px'} solid ${props => props.crustColor || '#d35400'};
  position: ${props => props.absolute ? 'absolute' : 'relative'};
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  margin: ${props => props.margin || '20px 0'};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), inset 0 0 50px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: ${props => props.zIndex || 1};
  transform-origin: center;
  cursor: ${props => props.clickable ? 'crosshair' : 'inherit'};
  
  ${props => props.animated && css`
    animation: ${splatAnimation} 0.3s ease-out forwards;
  `}
`;

const Ingredient = styled.div`
  position: absolute;
  font-size: ${props => props.size};
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  transform: translate(-50%, -50%) rotate(${props => props.rotate}deg);
  pointer-events: none;
  user-select: none;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
`;

const IngredientBtn = styled.button`
  background: ${props => props.selected ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)'};
  border: 1px solid ${props => props.selected ? '#f4d03f' : 'rgba(255, 255, 255, 0.3)'};
  color: white;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 1.5rem;
  transition: all 0.2s;
  box-shadow: ${props => props.selected ? '0 0 15px #f4d03f' : 'none'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }
`;

const CustomEmojiInput = styled.input`
  background: ${props => props.selected ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px dashed ${props => props.selected ? '#ffd700' : 'rgba(212, 175, 55, 0.4)'};
  color: white;
  width: 120px;
  height: 60px;
  border-radius: 15px;
  text-align: center;
  font-size: 1.2rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  outline: none;
  cursor: text;
  box-shadow: ${props => props.selected ? '0 0 20px rgba(255, 215, 0, 0.4)' : 'none'};
  font-weight: bold;
  
  &:focus {
    border-style: solid;
    border-color: #ffd700;
    background: rgba(212, 175, 55, 0.2);
    width: 140px;
    box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
  }

  &::placeholder {
    color: rgba(255, 215, 0, 0.6);
    font-size: 0.9rem;
    font-weight: normal;
  }
`;

const ActionButtons = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;

const SliderContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SliderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  label {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const ColorSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
  }
`;

const ThrownPieContainer = styled.div`
  position: fixed;
  left: 50%;
  z-index: 50;
  pointer-events: none;
  animation: ${throwAnimation} 0.5s ease-in forwards;
`;

const StatCounter = styled.div`
  position: absolute;
  top: 80px;
  right: 30px;
  background: rgba(0, 0, 0, 0.5);
  padding: 12px 25px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 100;
  backdrop-filter: blur(5px);
  color: #f4d03f;
`;

const ingredientsSettings = [
    { emoji: "🍓", name: "Strawberry" },
    { emoji: "🫐", name: "Blueberry" },
    { emoji: "🥝", name: "Kiwi" },
    { emoji: "🍌", name: "Banana" },
    { emoji: "🍫", name: "Chocolate" },
    { emoji: "🥧", name: "Crust" },
    { emoji: "➕", name: "Plus" },
    { emoji: "π", name: "Pi" },
    { emoji: "∑", name: "Sigma" },
];

function SecretPie() {
    const [ingredients, setIngredients] = useState([]);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [thrownIngredients, setThrownIngredients] = useState([]);
    const [isThrowing, setIsThrowing] = useState(false);
    const [isReadyToThrow, setIsReadyToThrow] = useState(false);
    const [persistentPies, setPersistentPies] = useState([]);
    const [thrownCount, setThrownCount] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [reactions, setReactions] = useState({ left: null, right: null });
    const [customEmojiValue, setCustomEmojiValue] = useState("");
    const [crustHue, setCrustHue] = useState(24); // Default #d35400 ish
    const [fillHue, setFillHue] = useState(48); // Default #f4d03f ish

    const crustColor = `hsl(${crustHue}, 100%, 41%)`;
    const fillColor = `hsl(${fillHue}, 90%, 60%)`;

    const teacherReactions = [
        "OUCH! 😵‍💫",
        "F FOR YOU!!!",
        "NOT AGAIN!!!!!",
        "Why did I sign up for this??",
        "Yummy 🥧!"
    ];

    const studentReactions = [
        "OUCH!",
        "Yummy 🥧!",
        "😭😭😭😭😭",
        "My hair!",
        "This was a mistake ✨"
    ];

    const pieBaseRef = useRef(null);
    const teacherRef = useRef(null);
    const studentRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleCustomInputChange = (e) => {
        const val = e.target.value;
        // Take only the last character/emoji
        const char = Array.from(val).pop() || "";
        setCustomEmojiValue(char);
        if (char) {
            setSelectedEmoji(char);
        }
    };

    const handlePieBaseClick = (e) => {
        if (!selectedEmoji || isReadyToThrow) return;

        const rect = pieBaseRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const newIngredient = {
            id: Date.now() + Math.random(),
            emoji: selectedEmoji,
            x,
            y,
            rotate: Math.random() * 360,
            size: (1.5 + Math.random() * 1.5) + "rem"
        };
        setIngredients([...ingredients, newIngredient]);
    };

    const clearEverything = () => {
        setIngredients([]);
        setPersistentPies([]);
        setIsReadyToThrow(false);
        setIsThrowing(false);
        setSelectedEmoji(null);
        setCustomEmojiValue("");
        setCrustHue(24);
        setFillHue(48);
    };

    const prepareThrow = () => {
        //if (ingredients.length === 0 && !window.confirm("Throw an empty pie?")) return;
        setIsReadyToThrow(true);
        setSelectedEmoji(null);
    };

    const downloadPie = async () => {
        if (!pieBaseRef.current) return;

        // Temporarily hide markers or anything unwanted if needed
        // but for now we just capture the pie
        const canvas = await html2canvas(pieBaseRef.current, {
            backgroundColor: null,
            logging: false,
            scale: 2 // Higher resolution
        });

        const link = document.createElement('a');
        link.download = `custom-pie-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const handleScreenClick = (e) => {
        if (!isReadyToThrow || isThrowing) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const targetX = e.clientX - rect.left;
        const targetY = e.clientY - rect.top;

        const currentPieIngredients = [...ingredients];
        setThrownIngredients(currentPieIngredients);
        setIsThrowing(true);

        // Detect hits on people using bounding rectangles
        if (teacherRef.current) {
            const rect = teacherRef.current.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                const msg = teacherReactions[Math.floor(Math.random() * teacherReactions.length)];
                setReactions(prev => ({ ...prev, left: { text: msg, id: Date.now() } }));
                setTimeout(() => setReactions(prev => ({ ...prev, left: null })), 2500);
            }
        }

        if (studentRef.current) {
            const rect = studentRef.current.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                const msg = studentReactions[Math.floor(Math.random() * studentReactions.length)];
                setReactions(prev => ({ ...prev, right: { text: msg, id: Date.now() } }));
                setTimeout(() => setReactions(prev => ({ ...prev, right: null })), 2500);
            }
        }

        setTimeout(() => {
            const newPie = {
                id: Date.now(),
                x: targetX,
                y: targetY,
                size: 80 + Math.random() * 60,
                ingredients: currentPieIngredients,
                crustColor,
                fillColor
            };

            setPersistentPies(prev => [...prev, newPie]);
            setThrownCount(curr => curr + 1);
            setIsThrowing(false);
            setIsReadyToThrow(false);
            setIngredients([]);
        }, 500);
    };

    return (
        <>
            <NavBar />
            <GameWrapper
                isReadyToThrow={isReadyToThrow}
                hasSelectedIngredient={!!selectedEmoji}
                onClick={handleScreenClick}
            >
                <StatCounter>Pies Thrown: {thrownCount}</StatCounter>

                {/* Custom Cursors */}
                <CustomCursor
                    active={isReadyToThrow && !isThrowing}
                    isPie x={mousePos.x} y={mousePos.y}
                >
                    🥧
                </CustomCursor>
                <CustomCursor
                    active={!!selectedEmoji && !isReadyToThrow}
                    x={mousePos.x} y={mousePos.y}
                >
                    {selectedEmoji}
                </CustomCursor>

                {/* People Targets */}
                <Person side="left" ref={teacherRef}>
                    {reactions.left && <SpeechBubble key={reactions.left.id}>{reactions.left.text}</SpeechBubble>}
                    👨‍🏫
                </Person>
                <Person side="right" ref={studentRef}>
                    {reactions.right && <SpeechBubble key={reactions.right.id}>{reactions.right.text}</SpeechBubble>}
                    👩‍🎓
                </Person>

                <PieBuilder onClick={(e) => e.stopPropagation()}>
                    <h2 style={{ fontFamily: '"Cinzel", serif', marginBottom: '10px', color: '#f4d03f' }}>HAPPY PIE DAY!</h2>
                    <p style={{ opacity: 0.8, marginBottom: '10px' }}>Select an ingredient, then click "load pie" to throw it anywhere!</p>

                    <PieBase
                        ref={pieBaseRef}
                        onClick={handlePieBaseClick}
                        clickable={!!selectedEmoji && !isReadyToThrow}
                        crustColor={crustColor}
                        fillColor={fillColor}
                    >
                        {ingredients.map(ing => (
                            <Ingredient
                                key={ing.id}
                                x={ing.x}
                                y={ing.y}
                                rotate={ing.rotate}
                                size={ing.size}
                            >
                                {ing.emoji}
                            </Ingredient>
                        ))}
                    </PieBase>

                    <Controls>
                        {ingredientsSettings.map(item => (
                            <IngredientBtn
                                key={item.name}
                                selected={selectedEmoji === item.emoji}
                                onClick={() => {
                                    setSelectedEmoji(item.emoji);
                                    setCustomEmojiValue(""); // Clear custom input when clicking standard emojis
                                }}
                                title={item.name}
                            >
                                {item.emoji}
                            </IngredientBtn>
                        ))}
                        <CustomEmojiInput
                            value={customEmojiValue}
                            onChange={handleCustomInputChange}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (customEmojiValue) setSelectedEmoji(customEmojiValue);
                            }}
                            selected={selectedEmoji === customEmojiValue && customEmojiValue !== ""}
                            placeholder="Custom: ✨"
                            title="Type any emoji here!"
                            maxLength="2" // In case of complex emojis
                        />
                    </Controls>

                    <SliderContainer>
                        <SliderGroup>
                            <label>Crust Color</label>
                            <ColorSlider
                                type="range"
                                min="0"
                                max="360"
                                value={crustHue}
                                onChange={(e) => setCrustHue(e.target.value)}
                            />
                        </SliderGroup>
                        <SliderGroup>
                            <label>Inner Color</label>
                            <ColorSlider
                                type="range"
                                min="0"
                                max="360"
                                value={fillHue}
                                onChange={(e) => setFillHue(e.target.value)}
                            />
                        </SliderGroup>
                    </SliderContainer>

                    <ActionButtons>
                        <Button
                            variant="outline-danger"
                            onClick={clearEverything}
                            style={{ borderRadius: '20px', padding: '10px 20px', fontSize: '0.9rem' }}
                        >
                            Reset
                        </Button>
                        <Button
                            variant="primary"
                            onClick={downloadPie}
                            style={{ borderRadius: '20px', padding: '10px 20px', fontSize: '0.9rem' }}
                        >
                            Download PNG
                        </Button>
                        {!isReadyToThrow ? (
                            <Button
                                variant="success"
                                onClick={prepareThrow}
                                style={{ borderRadius: '20px', padding: '10px 30px', fontWeight: 'bold' }}
                            >
                                LOAD PIE!
                            </Button>
                        ) : (
                            <Button
                                variant="warning"
                                disabled
                                style={{ borderRadius: '20px', padding: '10px 30px', fontWeight: 'bold' }}
                            >
                                AIMING...
                            </Button>
                        )}
                    </ActionButtons>
                </PieBuilder>

                {isThrowing && (
                    <ThrownPieContainer>
                        <PieBase
                            size="100px"
                            borderSize="3px"
                            margin="0"
                            crustColor={crustColor}
                            fillColor={fillColor}
                        >
                            {thrownIngredients.map(ing => (
                                <Ingredient
                                    key={ing.id}
                                    x={ing.x}
                                    y={ing.y}
                                    rotate={ing.rotate}
                                    size={`calc(${ing.size} * 0.4)`}
                                >
                                    {ing.emoji}
                                </Ingredient>
                            ))}
                        </PieBase>
                    </ThrownPieContainer>
                )}

                {persistentPies.map(pie => (
                    <PieBase
                        key={pie.id}
                        absolute
                        x={pie.x}
                        y={pie.y}
                        size={`${pie.size}px`}
                        borderSize={`${pie.size / 40}px`}
                        margin="0"
                        zIndex="5"
                        animated
                        style={{ transform: 'translate(-50%, -50%)' }}
                        crustColor={pie.crustColor || crustColor}
                        fillColor={pie.fillColor || fillColor}
                    >
                        {pie.ingredients.map(ing => (
                            <Ingredient
                                key={ing.id}
                                x={ing.x}
                                y={ing.y}
                                rotate={ing.rotate}
                                size={`calc(${ing.size} * ${pie.size / 250})`}
                            >
                                {ing.emoji}
                            </Ingredient>
                        ))}
                    </PieBase>
                ))}

                <div style={{ marginTop: '50px', opacity: 0.6, pointerEvents: 'none', textAlign: 'center', maxWidth: '600px' }}>
                    <p style={{ fontSize: '1.1rem' }}>
                        <strong>Hint:</strong> Practice throwing pies for AMC club's upcoming Pie Day event! <br />
                        Target the teacher and student on the sides to see what happens!
                    </p>
                </div>
            </GameWrapper>
            <Footer />
        </>
    );
}

export default SecretPie;
