import React, { useEffect, useState } from "react";
import * as R from "ramda";
import styled from "styled-components";

import FaresService from "../services/fares";

const Select = styled.select`
  width: 50%;
  padding: 5px 5px;
  border: 2px solid lightgrey;
  border-radius: 5px;
  font-size: 14px;
  -webkit-appearance: none;
  background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+)
    no-repeat 100% 50%;
`;

const HeaderTitle = styled.h3`
  padding: 10px;
  margin: 0;
  font-size: 16px;
  display: block;
`;

const NumberInput = styled.input`
  width: 60px;
  height: 30px;
  text-align: center;
  border: 2px solid lightgrey;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 20px;
`;

const FareForm = ({ addFareFormInputs }) => {
  const [timeOptions, setTimeOptions] = useState([]);
  const [zoneOptions, setZoneOptions] = useState([]);

  const [timeOfRideSubtitle, setTimeOfRideSubtitle] = useState([]);
  const [purchaseLocationSubtitle, setPurchaseLocationSubtitle] = useState([]);

  const [timeSelected, setTimeSelected] = useState("anytime");
  const [zoneSelected, setZoneSelected] = useState(1);
  const [purchaseLocation, setPurchaseLocation] = useState("");
  const [numTickets, setNumTickets] = useState(0);

  //When there is a change in the input, an object will be formatted to send to App.js
  useEffect(() => {
    const sendInfoToParent = () => {
      if (purchaseLocation !== "" && numTickets !== 0) {
        addFareFormInputs({
          type: timeSelected,
          zone: zoneSelected,
          purchase: purchaseLocation,
          tickets: numTickets,
        });
      }
    };
    sendInfoToParent();
  }, [purchaseLocation, numTickets, timeSelected, zoneSelected]);

  useEffect(() => {
    FaresService.getInfo().then((info) => {
      //this is to separate the info object so advance_purchase and onboard_purchase
      //are not shown in the dropdown
      const purchaseValues = R.props(
        ["advance_purchase", "onboard_purchase"],
        info
      );
      const withoutPurchaseValues = (n) => !purchaseValues.includes(n);
      const withPurchaseValues = (n) => purchaseValues.includes(n);

      //this will be for the "when are you riding?" dropdown and its subtitles
      const withoutPurchaseValuesObj = R.filter(withoutPurchaseValues, info);
      setTimeOfRideSubtitle(withoutPurchaseValuesObj);
      setTimeOptions(Object.keys(withoutPurchaseValuesObj));
      //this will be for the radio button subtitles
      setPurchaseLocationSubtitle(R.filter(withPurchaseValues, info));
    });

    FaresService.getZones().then((zones) => {
      const zoneOptionsArray = zones.map((zoneInfo) => zoneInfo.zone);
      setZoneOptions(zoneOptionsArray);
    });
  }, []);

  return (
    <form>
      <div>
        <HeaderTitle>Where are you going?</HeaderTitle>
        <Select
          value={zoneSelected}
          onChange={(event) => setZoneSelected(Number(event.target.value))}
        >
          {zoneOptions.map((zone) => (
            <option key={zone} value={zone} type="number">
              Zone {zone}
            </option>
          ))}
        </Select>
      </div>
      <hr />
      <div>
        <HeaderTitle>When are you riding?</HeaderTitle>
        <Select
          value={timeSelected}
          onChange={(event) => setTimeSelected(event.target.value)}
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>
        <p>{timeOfRideSubtitle[timeSelected]}</p>
        <hr />
      </div>
      <div>
        <HeaderTitle>Where will you purchase the fare?</HeaderTitle>
        <input
          type="radio"
          value="advance_purchase"
          id="advance_purchase"
          onChange={(event) => setPurchaseLocation(event.target.value)}
          name="purchase_location"
        />
        <label htmlFor="advance_purchase">Station Kiosk</label>

        <input
          type="radio"
          value="onboard_purchase"
          id="onboard_purchase"
          onChange={(event) => setPurchaseLocation(event.target.value)}
          name="purchase_location"
        />
        <label htmlFor="onboard_purchase">Onboard</label>
        <p>{purchaseLocationSubtitle[purchaseLocation]}</p>
        <hr />
      </div>
      <div>
        <HeaderTitle>How many rides will you need?</HeaderTitle>
        <NumberInput
          type="number"
          id="numTickets"
          value={numTickets}
          onChange={(event) =>
            setNumTickets(event.target.value.replace(/\D/, ""))
          }
          name="numTickets"
        />
      </div>
    </form>
  );
};
export default FareForm;
