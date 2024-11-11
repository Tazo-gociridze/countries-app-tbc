import { httpClient } from "..";
import { CountryData } from "@components/country/static/Interfaces";

//აღწერეთ ტაიპსკრიპტის მეშვეობით რექუესთზე დაბრუნებული პასუხი
export const getCountries = async (searchParams: URLSearchParams, pageParam: number) => {
  try {
    const res = await httpClient.get<CountryData>(`/countries?_page=${pageParam}&_per_page=5&_${searchParams}`);
    console.log(`${searchParams}`)
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

export const updateLikes = async ({ el, countryLikes }: { el: CountryData, countryLikes: number }) => {
  try {
    httpClient.patch(`/countries/${el.id}`, {likes: countryLikes + 1})
  } catch (error) {
    console.error("Error editing country:", error);
  }
};

export const countryDetailPage = async ({ id }: { id: string | number }) => {
  try {
    return await httpClient.get(`/countries/${id}`);
  } catch {
    console.log("catch");
  }
};

export const sortCounrties = async ({searchParams}: {searchParams: string}) => {
  httpClient.get(`/countries?_${searchParams}`).then((sortedData) => {console.log(sortedData)});
}
