import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../styles/index.css";
import Logo from "./Wally.png";
import Email from "./email.png";
import Instagram from "./instagram.png";

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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const BlockTitle = styled.div`
  color: black;
  font-size: 50px;
  border-bottom: 2px solid #1d3557;
  width: 50%;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Month = styled.div`
  color: #023e8a;
  font-size: 45px;
  margin-top: 10px;
  font-weight: 700;
  font-family: "Fuzzy Bubbles", cursive;
`;
const MonthLink = styled.a`
  text-decoration: none;
`;

const IconImg = styled.img`
  width: 40px;
  height: 35px;
  margin-right: 10px;
  filter: invert(89%) sepia(14%) saturate(4527%) hue-rotate(339deg)
    brightness(94%) contrast(86%);
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
        <Link id="events" onClick={navigateToPage}>
          {" "}
          Events
        </Link>
        <a href="mailto:stuco@usbccollegiate.org" target="_blank">
          <IconImg src={Email}></IconImg>
        </a>
        <a href="https://www.instagram.com/bcc_stuco/" target="_blank">
          <IconImg src={Instagram}></IconImg>
        </a>
        <a href="https://www.usbccollegiate.org" target="_blank">
          <img
            width="100px"
            height="40px"
            src="https://i.ibb.co/BqjBZGQ/image2.png"
          ></img>
        </a>
      </Menu>

      <HeaderWrapper>
        <LogoImg src={Logo} />
        <Blank
          src={
            "https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg"
          }
        />
        <Title>Weekly Reports!</Title>
      </HeaderWrapper>

      <BlockWrapper>
        <BlockTitle>2022</BlockTitle>
        <MonthLink
          href="https://drive.google.com/drive/folders/1YUvUPJGVwspFY7tI1SY7HttHU52ivkOe"
          target="_blank"
        >
          <Month>SEPTEMBER</Month>
        </MonthLink>
        <MonthLink
          href="https://drive.google.com/drive/folders/1kdujEiqiME5cDrJLZ-wbBgOn1dsNqBp-"
          target="_blank"
        >
          <Month>OCTOBER</Month>
        </MonthLink>
        <Month>DECEMBER</Month>
        <BlockTitle>2023</BlockTitle>
        <Month>To be added...</Month>
      </BlockWrapper>
    </Wrapper>
  );
}
export default WeeklyReports;
