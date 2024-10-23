import { FC} from "react";
import CountryComponent, { countryStateType } from "./country-components/countrySection/CountryComponent";


const CountrySection: FC<countryStateType> = ({countriesState, switchLangDispatch}) => {
  return (
    <>
      <section>      
        <CountryComponent countriesState={countriesState} switchLangDispatch={switchLangDispatch}/>
      </section>
    </>
  );
};

export default CountrySection;
