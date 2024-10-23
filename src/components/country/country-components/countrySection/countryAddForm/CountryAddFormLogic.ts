import { useState, useContext } from "react";
import { LanguageContext } from "../../../../../App";
import { CountryData } from "@components/country/static/Interfaces";
import { CountryAction } from "@components/country/Reducer/countryReducer";

export interface DispatchType {
  dispatch: Dispatch<CountryAction>;
  typeOfLanguage: string;
}

type Dispatch<A extends CountryAction> = (action: A) => void;

export const useCountryAddFormLogic = (
  {dispatch}: {
  dispatch: Dispatch<CountryAction>;
  typeOfLanguage: string;}
  ) => {
  const { switchLang } = useContext(LanguageContext);

  const [newCountryFlagFile, setNewCountryFlagFile] = useState<File | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [newCountryNameEng, setNewCountryNameEng] = useState("");
  const [newCountryCapitalEng, setNewCountryCapitalEng] = useState("");
  const [newCountryPopulationEng, setNewCountryPopulationEng] = useState("");

  const [newCountryNameGeo, setNewCountryNameGeo] = useState("");
  const [newCountryCapitalGeo, setNewCountryCapitalGeo] = useState("");
  const [newCountryPopulationGeo, setNewCountryPopulationGeo] = useState("");

  const [nameError, setNameError] = useState("");
  const [capitalError, setCapitalError] = useState("");
  const [populationError, setPopulationError] = useState("");

  const handleFlagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const allowedTypes = ["image/png", "image/jpeg"];
      if (allowedTypes.includes(file.type)) {
        setNewCountryFlagFile(file);
        setErrorMessage(null);
      } else {
        setErrorMessage("Please upload file in PNG or JPG format.");
      }
    } else {
      setNewCountryFlagFile(null);
      setErrorMessage(null);
    }
  };

  const handleAddCountry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    let flagPath = "";
    if (newCountryFlagFile) {
      flagPath = URL.createObjectURL(newCountryFlagFile);
    }
  
    const newCountryEng: CountryData = {
      id: String(Math.random()),
      flagUrl: flagPath,
      name: newCountryNameEng,
      capital: newCountryCapitalEng,
      population: newCountryPopulationEng || "0",
      likes: 0,
    };
  
    const newCountryGeo: CountryData = {
      id: String(Math.random()),
      flagUrl: flagPath,
      name: newCountryNameGeo,
      capital: newCountryCapitalGeo,
      population: newCountryPopulationGeo || "0",
      likes: 0,
    };
  
    if (
      newCountryNameEng.length !== 0 && 
      newCountryCapitalEng.length !== 0 && 
      newCountryPopulationEng.length !== 0 
    ) {
      dispatch({ type: 'ADD_COUNTRY', payload: newCountryEng }); 
    }

    if (
      newCountryNameGeo.length !== 0 && 
      newCountryCapitalGeo.length !== 0 && 
      newCountryPopulationGeo.length !== 0 
    ) {

      dispatch({ type: 'ADD_COUNTRY', payload: newCountryGeo }); 
    }

    setNewCountryNameEng("");
    setNewCountryCapitalEng("");
    setNewCountryPopulationEng("");
    setNewCountryNameGeo("");
    setNewCountryCapitalGeo("");
    setNewCountryPopulationGeo("");
    setNewCountryFlagFile(null);
    setNameError("");
    setCapitalError("");
    setPopulationError("");
    setErrorMessage(null);
  };

  

  const countryNameTargetHandlerEng = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCountryNameEng(e.target.value);
    setNameError(e.target.value.length > 12 ? "the most length name" : "");
  };
  const countryNameTargetHandlerGeo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCountryNameGeo(e.target.value);
    setNameError(e.target.value.length > 12 ? "the most length name" : "");
  };

  const countryCapitalTargetHandlerEng = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCountryCapitalEng(e.target.value);
    setCapitalError(e.target.value.length > 12 ? "the most length name" : "");
  };
  const countryCapitalTargetHandlerGeo = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCountryCapitalGeo(e.target.value);
    setCapitalError(e.target.value.length > 12 ? "the most length name" : "");
  };

  const countryPopulationTargetHandlerEng = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCountryPopulationEng(e.target.value);
    setPopulationError(e.target.value.length > 12 ? "the most length name" : "");
  };

  const countryPopulationTargetHandlerGeo = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCountryPopulationGeo(e.target.value);
    setPopulationError(e.target.value.length > 12 ? "the most length name" : "");
  };

  return {
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
    newCountryFlagFile,
    setNewCountryFlagFile,
    errorMessage,
    setErrorMessage,
    handleFlagChange,
    handleAddCountry,
    countryNameTargetHandlerEng,
    countryNameTargetHandlerGeo,
    countryCapitalTargetHandlerEng,
    countryCapitalTargetHandlerGeo,
    countryPopulationTargetHandlerEng,
    countryPopulationTargetHandlerGeo,
  };
};
