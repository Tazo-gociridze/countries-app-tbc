import Wrapper from "../Wrapper";
import SortBtns from "./SortBtns";
import CountryAddForm from "./countryAddForm/CountryAddForm";
import { Dispatch, FC } from "react";
import { CountryAction, CountryState } from "@components/country/Reducer/countryReducer";

export interface countryStateType{
  countriesState: CountryState; 
  switchLangDispatch: Dispatch<CountryAction>; 
}

const CountryComponent: FC<countryStateType> = ({countriesState, switchLangDispatch}) => {

  const handleDeleteCountry = (index: number) => {
    switchLangDispatch({ type: "DELETE_COUNTRY", payload: { index } });
  };

  const handleReviveCountry = (index: number) => {
    switchLangDispatch({ type: "REVIVE_COUNTRY", payload: { index } });
  };

  return (
    <>
      <SortBtns dispatch={switchLangDispatch} />
      <div className="country__section">
        <div style={{display: 'flex', gap: '10px'}}>
          <CountryAddForm dispatch={switchLangDispatch} typeOfLanguage={'eng'}/>
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
    </>
  );
};

export default CountryComponent;
