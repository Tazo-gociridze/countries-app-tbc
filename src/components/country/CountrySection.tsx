import { FC } from "react";
import CountryComponent, {
  countryStateType,
} from "./country-components/countrySection/CountryComponent";

const CountrySection: FC<countryStateType> = ({
  switchLangDispatch,
}) => {
  return (
    <>
      <section>
        <CountryComponent
          switchLangDispatch={switchLangDispatch}
        />
      </section>
    </>
  );
};

export default CountrySection;
