import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FaresService from "../services/fares";

const Wrapper = styled.div`
  background-color: #595959;
  text-align: center;
  color: white;
  padding: 0;
  margin: 0;
  overflow-y: auto;
`;

const ResultsBox = ({ fareFormInputs, setNotification }) => {
  const [fareRules, setFareRules] = useState([]);
  const [fareTotal, setFareTotal] = useState(0);
  useEffect(
    () => FaresService.getZones().then((zones) => setFareRules(zones)),
    []
  );
  useEffect(() => {
    const calculateFare = () => {
      if (Object.keys(fareFormInputs).length !== 0) {
        //get the correct zone and within the obj, get the correct trip type and purchase type
        let fareObj = fareRules
          .filter((zones) => zones.zone === fareFormInputs.zone)[0]
          .fares.filter(
            (fare) =>
              fare.type === fareFormInputs.type &&
              fare.purchase === fareFormInputs.purchase
          )[0];
        if (!fareObj) {
          setNotification(
            "Sorry, that purchase location is not available for that ride time"
          );
        } else {
          if (fareObj.trips === 10) {
            setNotification(
              `Special deal! 10 Trips for only $${fareObj.price}!`
            );
          }
          //this is to account for when there is advance_purchase trips = 10
          //just get it down to the per trip price
          const price = fareObj.price / fareObj.trips;
          setFareTotal((fareFormInputs.tickets * price).toFixed(2));
        }
      }
    };
    calculateFare();
  }, [fareFormInputs]);

  return (
    <Wrapper>
      <h3>Your fare will cost</h3>
      <h1>${fareTotal}</h1>
    </Wrapper>
  );
};
export default ResultsBox;
