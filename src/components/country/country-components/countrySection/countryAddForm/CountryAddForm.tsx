import React, { useState } from "react";
import { DispatchType, useCountryAddFormLogic } from "./CountryAddFormLogic";

const CountryAddForm: React.FC<DispatchType> = ({ dispatch }) => {

  const [inputLanguage, setInputLanguage] = useState("english");
  const [isAddCountry, setIsAddCountry] = useState(false)

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
  } = useCountryAddFormLogic({ dispatch, inputLanguage });


  return (
    <form className="create-country-form" onSubmit={handleAddCountry} action="">
      <div className="form-lang-navigation">
        <span
          className={inputLanguage === "english" ? `lang-active` : ``}
          onClick={() => setInputLanguage("english")}
        >
          English
        </span>
        <span
          className={inputLanguage === "georgian" ? `lang-active` : ``}
          onClick={() => setInputLanguage("georgian")}
        >
          ქართული
        </span>
      </div>

      {inputLanguage === "english" ? (
        <>
          <input
            type="text"
            value={newCountryNameEng}
            onChange={countryNameTargetHandlerEng}
            placeholder={"Country name"}
          />

          <input
            type="text"
            value={newCountryCapitalEng}
            onChange={countryCapitalTargetHandlerEng}
            placeholder={"Capital"}
          />

          <input
            type="number"
            value={newCountryPopulationEng}
            onChange={countryPopulationTargetHandlerEng}
            placeholder={"population"}
          />
        </>
      ) : (
        <>
          {nameError && <p>max limit of symbols - 8</p>}
          <input
            type="text"
            value={newCountryNameGeo}
            onChange={countryNameTargetHandlerGeo}
            placeholder={"ქვეყნის სახელი"}
          />
          {capitalError && <p>min limit of symbols - 8</p>}
          <input
            type="text"
            value={newCountryCapitalGeo}
            onChange={countryCapitalTargetHandlerGeo}
            placeholder={"დედაქალაქი"}
          />

          {populationError && <p>max limit of symbols - 8</p>}
          <input
            type="number"
            value={newCountryPopulationGeo}
            onChange={countryPopulationTargetHandlerGeo}
            placeholder={"მოსახლეობა"}
          />
        </>
      )}

      <input type="file" accept="image/" onChange={handleFlagChange} />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={() => setIsAddCountry(!isAddCountry)}>
        {switchLang === "en" ? "add country" : "ქვეყნის დამატება"}
      </button>
    </form>
  );
};

export default CountryAddForm;
