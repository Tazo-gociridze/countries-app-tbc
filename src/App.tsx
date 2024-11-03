import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Country from "./pages/Country";
import Contact from "./pages/Contact";
import SingleCountry from "@components/country/country-components/SingleCountry";
import React, { FC, useState, createContext, useReducer, useEffect } from "react";
import { CountryAction ,CountryState ,countryReducer, } from "@components/country/Reducer/countryReducer";
import OtpInput from "./pages/OtpInput";
import axios from "axios";

//eslint-disable-next-line
export const LanguageContext = createContext({
  switchLang: "en",
  setSwitchLang: undefined as unknown as (newLang: string) => void,
  dispatch: undefined as unknown as React.Dispatch<CountryAction>,
  state: undefined as unknown as CountryState,
  setCountryAdded: undefined as unknown as (value: boolean) => void,
  countryAdded: undefined as unknown as boolean,
});

const App: FC = () => {
  const [switchLang, setSwitchLang] = useState("en");
  const [countryAdded, setCountryAdded] = useState(false);
  const [state, dispatch] = useReducer(countryReducer, {
    switchLang: switchLang,
    countries: [], 
  } as CountryState);

  
  useEffect(() => {
    axios.get('http://localhost:3000/countries')
      .then(res => {
        dispatch({ type: 'FETCH_COUNTRIES_SUCCESS', payload:{resData: res.data}});
      })
      .catch(error => console.error('Error while retrieving data:', error));
      //eslint-disable-next-line  
  }, [countryAdded]);

  return (
    <BrowserRouter>
      <LanguageContext.Provider value={{ switchLang, setSwitchLang, dispatch, state, setCountryAdded, countryAdded}}>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={'/en'}/>}></Route>
            <Route path="/:lang" element={<Home />}></Route>
            <Route path="/:lang/about" element={<About />}></Route>
            <Route
              path="/:lang/country"
              element={
                <Country countriesState={state} switchLangDispatch={dispatch} />
              }
            ></Route>
            <Route
              path="/:lang/country/:id"
              element={<SingleCountry countriesState={state} />}
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
