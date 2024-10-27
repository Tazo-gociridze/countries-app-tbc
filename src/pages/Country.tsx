import CountrySection from "@components/country/CountrySection";
import "../App.css";
import { FC } from "react";
import { countryStateType } from "@components/country/country-components/countrySection/CountryComponent";

const Country: FC<countryStateType> = ({
  countriesState,
  switchLangDispatch,
}) => {
  return (
    <>
      <main>
        <CountrySection
          countriesState={countriesState}
          switchLangDispatch={switchLangDispatch}
        />
      </main>
    </>
  );
};

export default Country;
