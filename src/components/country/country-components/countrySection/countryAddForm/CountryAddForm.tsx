import { FC } from "react";
import { DispatchType, useCountryAddFormLogic } from "./CountryAddFormLogic";



const CountryAddForm: FC<DispatchType> = ({ dispatch, typeOfLanguage }) => {

  const {
    switchLang,
    nameError,
    newCountryNameEng,
    newCountryNameGeo,
    capitalError,
    populationError,
    newCountryPopulationEng,
    newCountryPopulationGeo,
    newCountryCapitalEng,
    newCountryCapitalGeo,
    errorMessage,
    handleFlagChange,
    handleAddCountry,
    countryNameTargetHandlerEng,
    countryCapitalTargetHandlerEng,
    countryPopulationTargetHandlerEng,
    countryNameTargetHandlerGeo,
    countryCapitalTargetHandlerGeo,
    countryPopulationTargetHandlerGeo,
  } = useCountryAddFormLogic(
    {dispatch, typeOfLanguage}
  );

  return (
    <form className="create-country-form" onSubmit={handleAddCountry} action="">
      {nameError && <p>max limit of symbols - 8</p>}
      <input
        type="text"
        value={newCountryNameGeo}
        onChange={countryNameTargetHandlerGeo}
        placeholder={"ქვეყნის სახელი"}
      />
      <input
        type="text"
        value={newCountryNameEng}
        onChange={countryNameTargetHandlerEng}
        placeholder={"Country name"}
      />
      {capitalError && <p>min limit of symbols - 8</p>}
      <input
        type="text"
        value={newCountryCapitalGeo}
        onChange={countryCapitalTargetHandlerGeo}
        placeholder={"დედაქალაქი"}
      />
      <input
        type="text"
        value={newCountryCapitalEng}
        onChange={countryCapitalTargetHandlerEng}
        placeholder={"Capital"}
      />
      {populationError && <p>max limit of symbols - 8</p>}
      <input
        type="number"
        value={newCountryPopulationGeo}
        onChange={countryPopulationTargetHandlerGeo}
        placeholder={"მოსახლეობა"}
      />
      <input
        type="number"
        value={newCountryPopulationEng}
        onChange={countryPopulationTargetHandlerEng}
        placeholder={"population"}
      />
      <input type="file" accept="image/" onChange={handleFlagChange} />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button>
        {switchLang === "en" ? "add country" : "ქვეყნის დამატება"}
      </button>
    </form>
  );
};

export default CountryAddForm;
