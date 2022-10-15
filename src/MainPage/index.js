import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Logo from "./Wally.png";
import "../styles/index.css";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
  background-size: cover;
  background-image: url("https://static.wixstatic.com/media/7d4bbb_70b3ede3518a4e67a778eb2c18a14ffb~mv2.jpg/v1/fill/w_1960,h_1420,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/7d4bbb_70b3ede3518a4e67a778eb2c18a14ffb~mv2.jpg");
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

function MainPage() {
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
        <a href="mailto:stuco@usbccollegiate.org" target="_blank">
          <img
            width="50px"
            height="30px"
            src="https://th.bing.com/th/id/R.88d88f1872909358b97ffa695cb97b66?rik=A77az%2fwRYB%2bLrw&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f05%2fGmail_logo_icon.png&ehk=8gYQfqc8h6fYCXddKEQE%2blQ7004YVwPu1S2LSHmiUgE%3d&risl=&pid=ImgRaw&r=0"
          ></img>
        </a>
        <a href="https://www.instagram.com/bcc_stuco/" target="_blank">
          <img
            width="45px"
            height="45px"
            src="https://i.ibb.co/6rdNNw5/image-removebg-preview-4.png"
          ></img>
        </a>
        <a href="https://www.usbccollegiate.org" target="_blank">
          <img
            width="150px"
            height="65px"
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
        <Title>Welcome to BCC STUCO 2022-2023!</Title>
      </HeaderWrapper>
    </Wrapper>
  );
}
export default MainPage;
