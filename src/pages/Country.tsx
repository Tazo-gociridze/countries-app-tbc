import CountrySection from "@components/country/CountrySection";
import "../App.css";
import { FC } from "react";
import { countryStateType } from "@components/country/country-components/countrySection/CountryComponent";

const Country: FC<countryStateType> = ({
  switchLangDispatch,
}) => {
  return (
    <>
      <main>
        <CountrySection
          switchLangDispatch={switchLangDispatch}
        />
      </main>
    </>
  );
};

export default Country;
