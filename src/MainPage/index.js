import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Logo from "./Wally.png";
import "../styles/index.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Email from "./email.png";
import Instagram from "./instagram.png";
import moment from "moment";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const IconImg = styled.img`
  width: 40px;
  height: 35px;
  margin-right: 10px;
  filter: invert(89%) sepia(14%) saturate(4527%) hue-rotate(339deg)
    brightness(94%) contrast(86%);
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #4682b4;
  /* background-size: cover; */
  /* background-image: url("https://static.wixstatic.com/media/7d4bbb_70b3ede3518a4e67a778eb2c18a14ffb~mv2.jpg/v1/fill/w_1960,h_1420,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/7d4bbb_70b3ede3518a4e67a778eb2c18a14ffb~mv2.jpg"); */
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

const Modal = styled.div`
  width: 10px;
`;

const PopupWrapper = styled.div`
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
`;

function MainPage() {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState("no events");
  const closeModal = () => setOpen(false);
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
  const events = {
    "1987-11-16": {
      text: "Release Date of Never Gonna Give You Up",
    },
    "2022-08-16": {
      text: "First Day of School Year",
    },
    "2022-09-30": {
      text: "Anti-bullying Day",
    },
    "2022-10-27": {
      text: "Last Day of Q1",
    },
    "2022-10-28": {
      text: "Q2/Halloween Party",
    },
    "2022-09-30": {
      text: "Anti-bullying Day",
    },
    "2022-11-21": {
      text: "Map Testing",
    },
    "2022-11-22": {
      text: "Map Testing",
    },
    "2022-11-23": {
      text: "Map Testing",
    },
    "2022-12-16": {
      text: "Christmas Concert",
    },
    "2023-01-11": {
      text: "Final Exam (S1)",
    },
    "2023-01-12": {
      text: "Final Exam (S1)",
    },
    "2023-01-13": {
      text: "Final Exam (S1)",
    },
    "2023-01-16": {
      text: "Last Day of Q2/S1",
    },
    "2023-01-17": {
      text: "First Day of Q3/S2",
    },
    "2023-02-06": {
      text: "Winter Volunteer Week",
    },
    "2023-02-07": {
      text: "Winter Volunteer Week",
    },
    "2023-02-08": {
      text: "Winter Volunteer Week",
    },
    "2023-02-09": {
      text: "Winter Volunteer Week",
    },
    "2023-02-10": {
      text: "Winter Volunteer Week",
    },
    "2023-02-24": {
      text: "International Day",
    },
    "2023-03-09": {
      text: "Speech Contest",
    },
    "2023-03-10": {
      text: "Speech Contest",
    },
    "2023-03-14": {
      text: "Pi Day/Math Olympiad Contest!!!",
    },
    "2023-03-15": {
      text: "Pi Day/Math Olympiad Contest!!!",
    },
    "2023-04-01": {
      text: "BTS CONCERT (April Fools Day)",
    },
    "2023-04-04": {
      text: "Last Day of Q3",
    },
    "2023-04-05": {
      text: "First Day of Q4",
    },
    "2023-04-21": {
      text: "Spring Field Day",
    },
    "2023-05-01": {
      text: "AP Exam Week",
    },
    "2023-05-02": {
      text: "AP Exam Week",
    },
    "2023-05-03": {
      text: "AP Exam Week",
    },
    "2023-05-04": {
      text: "AP Exam Week",
    },
    "2023-05-05": {
      text: "AP Exam Week",
    },
    "2023-05-06": {
      text: "AP Exam Week",
    },
    "2023-05-07": {
      text: "AP Exam Week",
    },
    "2023-05-08": {
      text: "AP Exam Week",
    },
    "2023-05-09": {
      text: "AP Exam Week",
    },
    "2023-05-10": {
      text: "AP Exam Week",
    },
    "2023-05-11": {
      text: "AP Exam Week",
    },
    "2023-05-12": {
      text: "AP Exam Week",
    },
    "2023-05-19": {
      text: "Graduation Day (Seniors) 🎓",
    },
    "2023-05-22": {
      text: "Map Testing",
    },
    "2023-05-23": {
      text: "Map Testing",
    },
    "2023-05-24": {
      text: "Map Testing",
    },
    "2023-05-25": {
      text: "Art Exhibit",
    },
    "2023-05-26": {
      text: "Art Exhibit",
    },
    "2023-05-31": {
      text: "Science Fair",
    },
    "2023-06-07": {
      text: "Final Exam",
    },
    "2023-06-08": {
      text: "Final Exam",
    },
    "2023-06-09": {
      text: "Final Exam",
    },
    "2023-06-13": {
      text: "Last Day of Q3/S2",
    },
    "2023-06-15": {
      text: "Last Day of School Year",
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

  const onClickDate = (newDate) => {
    onChange();
    const date = moment(newDate).format("YYYY-MM-DD");
    setOpen((o) => !o);
    const text = events[date] ? events[date]["text"] : "no events";

    setEvent(text);

    // alert(events[date][text]);
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
        <Title>Welcome to BCC STUCO 2022-2023!</Title>
      </HeaderWrapper>
      <Calendar onChange={onClickDate} value={value} />
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          {event}
        </div>
      </Popup>
    </Wrapper>
  );
}
export default MainPage;
