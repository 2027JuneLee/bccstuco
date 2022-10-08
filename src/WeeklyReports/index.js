import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../styles/index.css";
import Logo from "./Wally.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
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
  height: 30px;
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

const BlockWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 70%;
  margin-left: 20%;
`;

const BlockRow = styled.div`
display:flex;
flex-direction:row;
`;

const Block = styled.div`
  width: 25%;
  height: 100%auto;
  padding: 20px;
  background-color: #023e8a;
  border-radius: 5px;
  color: white;
`;
const BlockRed = styled.div`
  width: 25%;
  height: 100%auto;
  padding: 20px;
  background-color: red;
  border-radius: 5px;
  color: white;
`;

function WeeklyReports() {
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

  const navigateToPage = (e) => {
    const id = e.target.id;
    if (id == "home") {
      navigate("/");
    } else {
      navigate("/" + id);
    }
  };

  return (
    <Wrapper>
      <Menu noOverlay styles={styles}>
        <Link id="home" onClick={navigateToPage}>
          {" "}
          Home
        </Link>
        <Link id="flea" onClick={navigateToPage}>
          {" "}
          Flea Market
        </Link>
        <Link id="reports" onClick={navigateToPage}>
          Weekly Reports
        </Link>
        <Link id="gallery" onClick={navigateToPage}>
          Gallery
        </Link>
        <Link id="roster" onClick={navigateToPage}>
          {" "}
          Roster
        </Link>
        <Link id="community" onClick={navigateToPage}>
          {" "}
          Community
        </Link>
      </Menu>

      <HeaderWrapper>
        <LogoImg src={Logo} />
        <Blank
          src={
            "https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg"
          }
        />
        <Title>Welcome to BCC STUCO 2022-2023!</Title>
      </HeaderWrapper>
      <BlockWrapper>
        
        <BlockRow>
        <BlockRed>2022</BlockRed>
        </BlockRow>

        <BlockRow>
        <Blank
          src={
            "https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg"
          }
        />
        </BlockRow>
        
        <BlockRow>
          <Block>SEPTEMBER</Block>
          <Block>OCTOBER</Block>
          <Block>NOVEMBER</Block>
          <Block>...</Block>
        </BlockRow>

        <BlockRow>
        <Blank
          src={
            "https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg"
          }
        />
        </BlockRow>

        <BlockRed>2023</BlockRed>
      </BlockWrapper>
    </Wrapper>
  );
}
export default WeeklyReports;
