import React from "react";
import styled from "styled-components";
import SEPTA_logo from "../assets/SEPTA.svg";

const Wrapper = styled.header`
  background-color: #595959;
  display: flex;
  justify-content: center;
  color: white;
`;
const HeaderTitle = styled.h1`
  margin-left: 0.625em;
  font-size: 1.75em;
  @media (max-width: 325px) {
    font-size: 1.5em;
  }
`;
const HeaderImage = styled.img`
  width: 100%;
`;
const ImageContainer = styled.div`
  height: auto;
  max-width: 60px;
  margin: auto 0;
`;

const Header = () => (
  <Wrapper>
    <ImageContainer>
      <HeaderImage src={SEPTA_logo} alt="SEPTA logo" />
    </ImageContainer>
    <HeaderTitle>Regional Rail Fares</HeaderTitle>
  </Wrapper>
);
export default Header;
