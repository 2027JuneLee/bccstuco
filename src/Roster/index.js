import styled from "styled-components";
import React, { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  font-family: Gill Sans, sans-serif;
`;

const Left = styled.div`
  float: left;
  width: 10%;
  font-size: 10px;
  color: blue;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 114.4vh;
  padding: 20px;
  text-align: center;
  font-weight: bold;
  font-color: black;
  background: linear-gradient(to top right, #ffffcc 0%, #66ccff 100%);

`;
//background: linear-gradient(to top right, #009900 4%, #cc0000 105%);

//BEAUTIFUL SUMMER COLORSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
const H4 = styled.div`
  color: black;
`
const Right = styled.div`
  float: right;
  width: 87.37%;
  background-color: #faf0e6 ;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  height: 120vh;
  font-weight: bold;
`;

const WelcomeTitle = styled.h1`
  color: black;
  font-weight: 800;
  font-size: 15px;
  margin-bottom: 50px;
`;


function Roster() {

    return (
    <Wrapper>
      PICTURES AND  UNDER NAMES?
      SLOGANS?
      ANYTHING?????????
        <h2>Our Proud STUCO Members!</h2>
            <br></br>
            <ol>
              <li>Min Kwon (G12) - President -</li>
              <li>Aaron Yoo (G11) - Vice President -</li>
              <li>Annie Lim (G12) - Treasurer -</li>
              <li>Bella Y Kim (G9) - Secretary -</li>
              <li>Louis Han (G11) - HS Rep -</li>
              <li>Dayoung Lee (G11) - HS Rep -</li>
              <li>June Lee (G8) - MS Rep, Website Creator -</li>
            </ol> 
            <h1>Noice</h1>
    </Wrapper>
  );
}
export default Roster;
