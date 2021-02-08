import React, { useState } from "react";
import styled from "styled-components";

import Header from "./components/Header";
import FareForm from "./components/FareForm";
import ResultsBox from "./components/ResultsBox";

const BigDiv = styled.div`
  display: block;
  text-align: center;
  width: 60%;
  max-height: 100%;
  border: 3px solid lightgrey;
  padding: 0;
  margin: auto;
  @media (max-width: 425px) {
    width: 100%;
  }
`;
/*
My idea for this app was to have a controlled form component that would handle all the 
input and then pass the input as an object to App who would keep the state consistent and 
pass it onto the ResultsBox which would calculate and display the fare total.

I also simulated api calls and a DB which is in services/fares.js. I use it in 
FareForm and ResultsBox 

The notification is shown when someone picks onboard purchase for anytime (which is not possible)
and also when there is a 10 trip deal
*/
function App() {
  const [fareFormInputs, setFareFormInputs] = useState({});
  const [notification, setNotification] = useState("");
  const addFareFormInputs = (inputs) => {
    setNotification("");
    setFareFormInputs(inputs);
  };
  const notifyWith = (message) => {
    setNotification(message);
  };
  return (
    <BigDiv>
      <Header />
      {notification ? <h4>{notification}</h4> : ""}
      <FareForm addFareFormInputs={addFareFormInputs} />
      <ResultsBox
        fareFormInputs={fareFormInputs}
        setNotification={notifyWith}
      />
    </BigDiv>
  );
}

export default App;
