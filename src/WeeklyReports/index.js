import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../styles/index.css";
import Logo from "./Wally.png";
import { Col } from "react-bootstrap";

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
  flex-direction: column;
  
`;

const BlockRow = styled.div`
display:flex;
flex-direction:column;
`;

const Block = styled.div`
  width: 40%;
  height: 100%auto;
  padding: 20px;
  background-color: #023e8a;
  border-radius: 5px;
  color: white;
`;
const BlockTItle = styled.div`

  color: #1d3557;
  font-size: 50px;
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
        <a href="mailto:stuco@usbccollegiate.org" target="_blank">
        <img width="50px" height="30px" src="https://th.bing.com/th/id/R.88d88f1872909358b97ffa695cb97b66?rik=A77az%2fwRYB%2bLrw&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f05%2fGmail_logo_icon.png&ehk=8gYQfqc8h6fYCXddKEQE%2blQ7004YVwPu1S2LSHmiUgE%3d&risl=&pid=ImgRaw&r=0"></img>
        </a>
        <a href="https://www.instagram.com/bcc_stuco/" target="_blank">
          <img width="45px" height="45px" src="https://th.bing.com/th/id/OIP.JtmXSh_uyZBaTg1eXd-NtgHaHa?pid=ImgDet&rs=1"></img>
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
      <Blank
          src={
            "https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg"
          }
        />
      <BlockWrapper>
      
        <BlockTItle>2022</BlockTItle>
        <BlockRow>
        <Blank
          src={
            "https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg"
          }
        />
        </BlockRow>
        
        <BlockRow>
          <a href="https://drive.google.com/drive/folders/1YUvUPJGVwspFY7tI1SY7HttHU52ivkOe" target="_blank">
          <Block>SEPTEMBER</Block>
          </a>
          <br></br>
          <a href="https://drive.google.com/drive/folders/1kdujEiqiME5cDrJLZ-wbBgOn1dsNqBp-" target="_blank">
          <Block>OCTOBER</Block>
          </a>
          <br></br>
          <a href="https://drive.google.com/drive/folders/1CRbBgYsIxF0ALuyb54xWkfa4IUWjvkPe" target="_blank">
          <Block>STUCO DRIVE</Block>
          <br></br>
          </a>
          <Block>...</Block>
        </BlockRow>
        <BlockRow>
        <Blank
          src={
            "https://fortbendseniors.org/wp-content/uploads/2019/01/blank-white-square-thumbnail.jpg"
          }
        />
        </BlockRow>
    
      </BlockWrapper>
    </Wrapper>
  );
}
export default WeeklyReports;
