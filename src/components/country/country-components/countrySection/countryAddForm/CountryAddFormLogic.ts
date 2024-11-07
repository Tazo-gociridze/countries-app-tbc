import { useState, useContext } from "react";
import { LanguageContext } from "../../../../../App";
import { CountryData } from "@components/country/static/Interfaces";
import { CountryAction } from "@components/country/Reducer/countryReducer";
import { addCountry } from "../../../../../api/countries";
import { useMutation } from "@tanstack/react-query";

export interface DispatchType {
  dispatch: Dispatch<CountryAction>;
  typeOfLanguage: string;
}

type Dispatch<A extends CountryAction> = (action: A) => void;

export const useCountryAddFormLogic = () => {
  const { switchLang, countryAdded, setCountryAdded } =
    useContext(LanguageContext);

  const [newCountryFlagFile, setNewCountryFlagFile] = useState<File | null>(
    null,
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
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const fileType = file.type;
      if (fileType === "image/png" || fileType === "image/jpeg") {
        setNewCountryFlagFile(file);
      } else {
        setErrorMessage("Please select a PNG or JPG file");
      }
    } else {
      setNewCountryFlagFile(null);
    }
  };

  const uploadFile = (file: File) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          resolve(e.target.result);
        } else {
          reject("Ошибка при чтении файла");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  const addCountryMutation = useMutation({mutationFn:addCountry});

  const handleAddCountry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        newCountryNameEng.length !== 0 &&
        newCountryCapitalEng.length !== 0 &&
        newCountryPopulationEng.length !== 0 &&
        newCountryFlagFile
      ) {
        const flagUrl = await uploadFile(newCountryFlagFile);

        const newCountry: CountryData = {
          id: String(Math.random()),
          flagUrl: flagUrl,
          name: newCountryNameEng,
          capital: newCountryCapitalEng,
          population: newCountryPopulationEng || "0",
          likes: 0,
        };

        // ქვეყნის დამატება მუტაციით
        addCountryMutation.mutate({newCountry}, {
          onSuccess: () => {
            console.log('country added')
          },
          onError: (error) => {
            console.error('erroe for adding country', error);
          },
        })

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
        setCountryAdded(!countryAdded);

        return { newCountry };
      } else {
        setErrorMessage("Please fill in all fields");
      }
    } catch (error) {
      console.error("Error adding country:", error);
    }
  };

  const countryNameTargetHandlerEng = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewCountryNameEng(e.target.value);
    setNameError(e.target.value.length > 12 ? "the most length name" : "");
  };
  const countryNameTargetHandlerGeo = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewCountryNameGeo(e.target.value);
    setNameError(e.target.value.length > 12 ? "the most length name" : "");
  };

  const countryCapitalTargetHandlerEng = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewCountryCapitalEng(e.target.value);
    setCapitalError(e.target.value.length > 12 ? "the most length name" : "");
  };
  const countryCapitalTargetHandlerGeo = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewCountryCapitalGeo(e.target.value);
    setCapitalError(e.target.value.length > 12 ? "the most length name" : "");
  };

  const countryPopulationTargetHandlerEng = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewCountryPopulationEng(e.target.value);
    setPopulationError(
      e.target.value.length > 12 ? "the most length name" : "",
    );
  };

  const countryPopulationTargetHandlerGeo = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewCountryPopulationGeo(e.target.value);
    setPopulationError(
      e.target.value.length > 12 ? "the most length name" : "",
    );
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
    addCountryMutation,
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
