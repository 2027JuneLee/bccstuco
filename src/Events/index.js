import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Logo from "./Wally.png";
import "../styles/index.css";
import Email from "./email.png";
import Instagram from "./instagram.png";
import Sports from "./sportsday.png";
import PUMP from "./hallow.png";
import MISC from "./photo22.png";
import "./index.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #edede9;
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

const IconImg = styled.img`
  width: 40px;
  height: 35px;
  margin-right: 10px;
  filter: invert(89%) sepia(14%) saturate(4527%) hue-rotate(339deg)
    brightness(94%) contrast(86%);
`;

const EventsWrapper = styled.div`
  margin-left: 300px;
  margin-top: 50px;
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const EventsRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const TileOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: #f6f4d2;
`;
const EventTile = styled.div`
  width: 50%;
  height: 300px;
  margin-right: 30px;
  margin-bottom: 100px;
  text-align: center;
  position: relative;
  background-color: white;
`;

const EventTitle = styled.div`
  color: #184e77;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  text-align: center;
`;

const EventImg = styled.img`
  width: 100%;
  display: block;
  height: 100%;
`;
function Work() {
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
          Special Events
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
        <Title>Special Events</Title>
      </HeaderWrapper>
      <EventsWrapper>
        <EventsRow>
          <EventTile className="tile">
            <EventImg src={Sports}></EventImg>
            <TileOverlay className="overlay">
              <EventTitle className="title"> Sports Day</EventTitle>
            </TileOverlay>
          </EventTile>

          <EventTile className="tile">
            <EventImg src={PUMP}></EventImg>
            <TileOverlay className="overlay">
              <EventTitle className="title"> Halloween</EventTitle>
            </TileOverlay>
          </EventTile>
        </EventsRow>
        <EventsRow>
          <EventTile className="tile">
            <EventImg src={MISC}></EventImg>
            <TileOverlay className="overlay">
              <EventTitle className="title"> Mail Box</EventTitle>
            </TileOverlay>
          </EventTile>
          <EventTile className="tile">
            <TileOverlay className="overlay">
              <EventTitle className="title"> Coming Soon!</EventTitle>
            </TileOverlay>
          </EventTile>
        </EventsRow>
      </EventsWrapper>
    </Wrapper>
  );
}
export default Work;
