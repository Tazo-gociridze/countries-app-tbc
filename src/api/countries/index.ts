import { CountryAction } from "@components/country/Reducer/countryReducer";
import { httpClient } from "..";
import { CountryData } from "@components/country/static/Interfaces";

interface CountryResponse {
  data: CountryData;
}

// აღწერეთ ტაიპსკრიპტის მეშვეობით რექუესთზე დაბრუნებული პასუხი
export const getCountries = async ({ dispatch }: { dispatch: React.Dispatch<CountryAction> }) => {
  try {
    const res: CountryResponse = await httpClient.get('/countries'); 
    dispatch({
      type: "FETCH_COUNTRIES_SUCCESS",
      payload: { resData: res.data },
    });
    return res.data; 
  } catch (error) {
    console.error("error for reciving countries", error);
  }
};

export const addCountry = async ({newCountry} : {newCountry: CountryData}) => {
  try {
     return await httpClient.post("/countries", newCountry);
  } catch (error) {
    console.error("error for add countries", error);
  }
};

export const deleteCountry = async ({dispatch, id, countryIndex} :
   {dispatch: React.Dispatch<CountryAction>, id: string | number | bigint, countryIndex: number}) => {
  try {
    await httpClient.delete(`http://localhost:3000/countries/${id}`);
    dispatch({ type: "DELETE_COUNTRY", payload: { index: countryIndex } });
  } catch (error) {
    console.error("Error deleting country:", error);
  }
};
