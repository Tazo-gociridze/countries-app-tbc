import Wrapper from "../Wrapper";
import SortBtns from "./SortBtns";
import CountryAddForm from "./countryAddForm/CountryAddForm";
import React, { Dispatch } from "react";
import {
  CountryAction,
  CountryState,
} from "@components/country/Reducer/countryReducer";

export interface countryStateType {
  countriesState: CountryState;
  switchLangDispatch: Dispatch<CountryAction>;
}

const CountryComponent: React.FC<countryStateType> = ({
  countriesState,
  switchLangDispatch,
}) => {
  const handleDeleteCountry = (index: number) => {
    switchLangDispatch({ type: "DELETE_COUNTRY", payload: { index } });
  };

  const handleReviveCountry = (index: number) => {
    switchLangDispatch({ type: "REVIVE_COUNTRY", payload: { index } });
  };

  return (
    <>
      <div>
        {/* eslint-disable-next-line */}
        {/* @ts-ignore */}
        <SortBtns dispatch={switchLangDispatch} />
        <div className="country__section">
          <div style={{ display: "flex", gap: "10px" }}>
            <CountryAddForm
              dispatch={switchLangDispatch}
              typeOfLanguage={"eng"}
            />
          </div>
          {countriesState.countries.map((obj, index) => (
            <Wrapper
              key={obj.id}
              flagUrl={obj.flagUrl}
              countryIndex={index}
              countriesState={countriesState.countries}
              dispatch={switchLangDispatch}
              el={obj}
              onDelete={() => handleDeleteCountry(index)}
              onRevive={() => handleReviveCountry(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CountryComponent;
