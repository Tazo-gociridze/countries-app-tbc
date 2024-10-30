import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Country from "./pages/Country";
import Contact from "./pages/Contact";
import SingleCountry from "@components/country/country-components/SingleCountry";
import React, { FC, useState, createContext, useReducer } from "react";
import { CountryState,countryReducer, } from "@components/country/Reducer/countryReducer";
import { countryCharacteristics } from "@components/country/Reducer/state";
import OtpInput from "./pages/OtpInput";
import { LanguageAction, initialState, languageReducer } from "./AppInterfaces";

export const LanguageContext = createContext<{
  switchLang: string;
  setSwitchLang: (newLang: string) => void;
  dispatch: React.Dispatch<LanguageAction>;
}>({
  switchLang: 'en',
  setSwitchLang: undefined as unknown as (newLang: string) => void, 
  dispatch: undefined as unknown as React.Dispatch<LanguageAction>, 
});

const App: FC = () => {
  const [switchLang, setSwitchLang] = useState("en");
  const [state, dispatch] = useReducer(languageReducer, initialState);
  const [countriesState, countryDispatch] = useReducer(countryReducer, {
    switchLang: switchLang,
    countries: [...countryCharacteristics.en],
  } as CountryState);

  return (
    <BrowserRouter>
      <LanguageContext.Provider value={{ switchLang: state.switchLang, setSwitchLang, dispatch }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/:lang" element={<Home />}></Route>
            <Route path="/:lang/about" element={<About />}></Route>
            <Route
              path="/:lang/country"
              element={
                <Country countriesState={countriesState} switchLangDispatch={countryDispatch} />
              }
            ></Route>
            <Route
              path="/:lang/country/:id"
              element={<SingleCountry countriesState={countriesState} />}
            ></Route>
            <Route path="/:lang/contact" element={<Contact />}></Route>
            <Route path="/:lang/otpinput" element={<OtpInput />}></Route>
          </Route>
        </Routes>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
};

export default App;