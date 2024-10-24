import { CountryData } from "../static/Interfaces";
import { countryCharacteristics } from "./state";

export interface ChangeLanguagePayload {
  switchLang: string;
}

export interface CountryState {
  switchLang: string; 
  countries: CountryData[];
}

export interface CountryAction {
  type:
    | "SORT_UP"
    | "SORT_DOWN"
    | "UPDATE_COUNTRIES"
    | "INCREMENT_LIKE"
    | "ADD_COUNTRY"
    | "DELETE_COUNTRY"
    | "REVIVE_COUNTRY"
    | "CHANGE_LANGUAGE";
  payload?:
    | {
        index?: number | string;
        countries?: CountryData[];
        switchLang?: string;
        typeOfLanguage?: string;
        newCountryEng?: CountryData | undefined;
        newCountryGeo?: CountryData | undefined;
      }
    | CountryData;
}

export const countryReducer = (
  state: CountryState,
  action: CountryAction
): CountryState => {
  switch (action.type) {
    case "SORT_UP":
      return {
        ...state,
        countries: [
          ...state.countries
            .filter((country) => !country.isDeleted)
            .sort((a, b) => (b.likes || 0) - (a.likes || 0)),
          ...state.countries.filter((country) => country.isDeleted),
        ],
      };

    case "SORT_DOWN":
      return {
        ...state,
        countries: [
          ...state.countries
            .filter((country) => !country.isDeleted)
            .sort((a, b) => (a.likes || 0) - (b.likes || 0)),
          ...state.countries.filter((country) => country.isDeleted),
        ],
      };

    case "UPDATE_COUNTRIES":
      return {
        ...state,
        countries: action.payload?.countries || state.countries,
      };

    case "INCREMENT_LIKE":
      return {
        ...state,
        countries: state.countries.map((country, index) =>
          index === action.payload?.index
            ? { ...country, likes: country.likes + 1 }
            : country
        ),
      };

      case 'ADD_COUNTRY':
      //@ts-ignore
      const { newCountryEng, newCountryGeo } = action.payload;

      if (newCountryEng) {
        countryCharacteristics.en.unshift(newCountryEng);
      }
      if (newCountryGeo) {
        countryCharacteristics.ge.unshift(newCountryGeo);
      }

      if (state.switchLang === 'en' && newCountryEng) {
        return {
          ...state,
          countries: [...countryCharacteristics.en],
        };
      } else if (state.switchLang === 'ge' && newCountryGeo) {
        return {
          ...state,
          countries: [...countryCharacteristics.ge],
        };
      } 
      
      return {
        ...state,
      };
        
    case "DELETE_COUNTRY":
      if (
        typeof action.payload?.index === "number" &&
        action.payload.index >= 0 &&
        action.payload.index < state.countries.length
      ) {
        const deletedCountries = [...state.countries];
        const deletedCountry = { ...deletedCountries[action.payload.index] };
        deletedCountry.isDeleted = true;
        deletedCountries.splice(action.payload.index, 1);
        deletedCountries.push(deletedCountry);
        return {
          ...state,
          countries: deletedCountries,
        };
      } else {
        console.error("action.payload.index is undefine");
        return state;
      }

    case "REVIVE_COUNTRY":
      if (
        typeof action.payload?.index === "number" &&
        action.payload.index >= 0 &&
        action.payload.index < state.countries.length
      ) {
        const revivedCountries = [...state.countries];
        const revivedCountry = { ...revivedCountries[action.payload.index] };

        revivedCountry.isDeleted = false;
        revivedCountries.splice(action.payload.index, 1);
        revivedCountries.unshift(revivedCountry);

        return {
          ...state,
          countries: revivedCountries,
        };
      } else {
        console.error("action.payload.index is undefined");
        return state;
      }

      case "CHANGE_LANGUAGE":
        return {
          ...state, 
          switchLang: (action.payload as ChangeLanguagePayload).switchLang,
          countries: (action.payload as ChangeLanguagePayload).switchLang === 'en' 
            ? [...countryCharacteristics.en]
            : [...countryCharacteristics.ge],
        };
    default:
      return state;
  }
};
