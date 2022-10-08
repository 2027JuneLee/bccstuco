import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Logo from "./Wally.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
  background-size: cover;
  background-image: url("https://i.giphy.com/media/LXONhtCmN32YU/giphy.webp");
  font-family: Gill Sans, sans-serif;
`;
const HeaderWrapper = styled.div`
  display: flex;
  background-color: white;
  flex-direction: row;
  justify-content: center;
`;
const LogoImg = styled.img`
  width: 100px;
  height: 100px;
`;
const Blank = styled.img`
  width: 30px;
  height: 100px;
`;
const Title = styled.div`
  font-size: 50px;
  font-weight: 800;
  text-align: center;
  margin-top: 20px;
  color: #023e8a;
  font-family: "Cinzel", serif;
`;

const Link = styled.a`
  width: 100%;
  margin-bottom: 30px !important;
  font-family: times new roman;
`;

function Rick() {
  const navigate = useNavigate();

  var styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "36px",
      top: "36px",
    },
    bmBurgerBars: {
      background: "#373a47",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#1d3557",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
      paddingTop: "100px",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      display: "inline-block",

      marginBottom: "10px",
    },
  };
  return (
    <Wrapper>
      <Menu noOverlay styles={styles}>
        <Link className="menu-item"> Home</Link>
        <Link className="menu-item"> Flea Market</Link>
        <Link>Weekly Reports</Link>
        <Link>Gallery</Link>
        <Link> Roster</Link>
        <Link> Community</Link>
        <h6>Made With Genuine Code and ❤ From June Lee G8 (Official BCC Website uses Wix lol)</h6>
      </Menu>

      <HeaderWrapper>
        <LogoImg src={Logo} />
        <Blank src={"https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg"}/>
        <Title>Never Gonna Give You Up</Title>
      </HeaderWrapper>
    </Wrapper>
  );
}
export default Rick;