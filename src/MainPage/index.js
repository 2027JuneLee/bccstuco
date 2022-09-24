import styled from "styled-components";
import React, { useState } from "react";
import WallyImg from "./Wally.png";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";



const Wrapper = styled.div`
  display: flex;
  font-family: Gill Sans, sans-serif;
`;

const Left = styled.div`
  flex-shrink: 1;
  float: left;
  width: 10%;
  font-size: 10px;
  color: blue;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  font-weight: bold;
  font-color: black;
  background: linear-gradient(to top right, #ffffcc 0%, #00A8E8 100%);

`;
//background: linear-gradient(to top right, #009900 4%, #cc0000 105%);

//BEAUTIFUL SUMMER COLORSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
const H4 = styled.div`
  color: black;
`
const Right = styled.div`
  flex-shrink: 1;
  display: flex;
  flex: 1;
  background-color: #004359 ;
  font-size: 20px;
  width: 100vw;
  flex-direction: column;
  height: 100%;
  font-weight: bold;
`;

const WallyImage = styled.img`
  height: 100vh;
`;
const WelcomeTitle = styled.h1`
  color: black;
  font-weight: 800;
  font-size: 15px;
  margin-bottom: 50px;
`;

const Input = styled.input`
border-radius: 5px;
background: black;
font-size: 14px;
border: none;
color: white;
width: 500px;
height: 25px;
padding: 8px;

`;

const CONTACT = styled.div`
display: flex;
flex-direction: row;
`;

function MainPage() {
  function GORAFFLE(){
    navigate("/raffle")
  }
  const navigate = useNavigate();
  function NavigateToSite(){
    Window.open("https://www.usbccollegiate.org/")
  }

  return (
    <Wrapper>
          <Left>
            
            <img id="locologo" src="https://i.ibb.co/Wz8RYKc/Wally.png" width="75vw" height="75vh"></img>
            <img onclick="NavigateToSite()" id="locologo" src="https://i.ibb.co/NtXKc6J/image2.png" width="75vw" height="75vh"></img>
            <br></br>
            <H4>BCC STUCO 2022-2023</H4>
            <H4>CLICK ON THE LINKS BELOW! THEY'RE HYPERLINKS!</H4>
            <WelcomeTitle onClick={() => navigate("/")}>MAIN PAGE</WelcomeTitle>
            <WelcomeTitle onClick={() => navigate("/raffle")}>RAFFLE!</WelcomeTitle>
            <WelcomeTitle onClick={() => navigate("/fleamarket")}>FLEA MARKET!</WelcomeTitle>
            <WelcomeTitle onClick={() => navigate("/archive")}>Previous Work</WelcomeTitle>
            <WelcomeTitle onClick={() => navigate("/plansandevents")}>Plans And Events</WelcomeTitle>
            <WelcomeTitle onClick={() => navigate("/contact")}>Links</WelcomeTitle>
            <WelcomeTitle onClick={() => navigate("/gallery")}>Gallery</WelcomeTitle>
            <WelcomeTitle onClick={() => navigate("/roster")}>Roster</WelcomeTitle>
            <WelcomeTitle onClick={() => navigate("/community")}>Comm unity</WelcomeTitle>
            <H4>Made With ❤ And Genuine Coding From June Lee G8 (official BCC website uses Wix)</H4>
          </Left>
          <Col md={6} className="d-none d-lg-block">
            <Right>
              <h1>WE'RE STUCO!</h1>

              DECORATE THIS WITH CSS AND STUFF!!!!!!! THIS IS JUST A SAMPLE!
              <h4>Contact Us Through:</h4>
              <CONTACT>
                <h6>Mail (stuco@usbccollegiate.org) or dm (bcc_stuco) </h6>
              </CONTACT>
              <CONTACT>
                  <img src="https://fthmb.tqn.com/c05XvnTFkSPwfRR3TY3aZikoDvE=/768x0/filters:no_upscale()/2000px-Gmail_Icon.svg-599998b3b501e80010490cb5.png" alt="HTML tutorial" height="100px" width="100px"></img>
                  <br></br>
                  <img src="https://th.bing.com/th/id/R.26d9974a1feec9905a4e0d5e5ddf8db6?rik=ycoXFwG5Udz08A&pid=ImgRaw&r=0" alt="HTML tutorial" height="100px" width="100px"></img>
              </CONTACT>
            </Right>
          </Col>

    </Wrapper>
  );
}
export default MainPage;



















