import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


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
  background: linear-gradient(to top right, #ffffcc 0%, #66ccff 100%);

`;
//background: linear-gradient(to top right, #009900 4%, #cc0000 105%);

//BEAUTIFUL SUMMER COLORSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
const H4 = styled.h4`
  color: black;
`
const Right = styled.div`

  flex-shrink: 1;
  display: block;
  flex: 1;
  font-size: 20px;
  width: 100vw;
  position: absolute
  font-weight: bold;
  background: repeating-linear-gradient(
    90deg,

    #f5fffa 2px,
    #8ED383 40px
  );
  font-family: papyrus;
`;
//    #ff0000 10px,
const Ads = styled.div`
  flex-shrink: 1;
  float: up;
  height: 10%;
  font-size: 20px;
  color: #615649;
  font-weight: 900;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  font-weight: bold;
  font-color: black;
  background: linear-gradient(to top right, #ffffcc 60%, #66ccff 100%);
`

const WelcomeTitle = styled.h1`
  color: black;
  font-weight: 800;
  font-size: 15px;
  margin-bottom: 50px;
`;


function Raffle() {
    const navigate = useNavigate();
    return (
    <Wrapper>
            <Left>
              <Ads>!WOW! Raffle Tickets Are On The Way!</Ads>
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
          <Right>
            <h2>How To Participate In Raffles!</h2>
            <br></br>
            <ol>
              <li>Buy Raffle Tickets (1000 Won per ticket) From LOCATION (STUCO Member Must Be Present)</li>
              <li>Enter Name Grade And What You Want To Enter</li>
              <li>Decide Which Raffle To Enter From Board Below (some prizes may require specific time like throwing pies to mr shim's face)</li>
              <li>Put Raffle Inside Box In LOCATION</li>
              <li>WIN!</li>
              <li>TIP: If you spell supercalifragilisticexpialidocious, you get a free ticket! (Maybe not)</li>
            </ol> 
            <h1>PUT PRIZE IMAGE (MAKE FROM CANVA OR ANYTHING)</h1>
          </Right>
    </Wrapper>
  );
}
export default Raffle;
