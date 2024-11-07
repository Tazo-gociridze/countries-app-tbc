import { CountryAction } from "@components/country/Reducer/countryReducer";
import { httpClient } from "..";
import { CountryData } from "@components/country/static/Interfaces";

interface CountryResponse {
  data: CountryData;
}

//აღწერეთ ტაიპსკრიპტის მეშვეობით რექუესთზე დაბრუნებული პასუხი
export const getCountries = async ({
  dispatch,
}: {
  dispatch: React.Dispatch<CountryAction>;
}) => {
  try {
    const res: CountryResponse = await httpClient.get("/countries");
    dispatch({
      type: "FETCH_COUNTRIES_SUCCESS",
      payload: { resData: res.data },
    });
    return res.data;
  } catch (error) {
    console.error("error for reciving countries", error);
  }
};


export const addCountry = async ({
  newCountry,
}: {
  newCountry: CountryData;
}) => {
  try {
    return await httpClient.post("/countries", newCountry);
  } catch (error) {
    console.error("error for add countries", error);
  }
};

export const deleteCountry = async (id: number | string | bigint) => {
  try {
    await httpClient.delete(`/countries/${id}`);
  } catch (error) {
    console.error("Error deleting country:", error);
  }
};


export const editingCountry = async (updatedCountry: CountryData) => {
  try {
    await httpClient.put(`/countries/${updatedCountry.id}`, updatedCountry); 
  } catch (error) {
    console.error("Error editing country:", error);
  }
};