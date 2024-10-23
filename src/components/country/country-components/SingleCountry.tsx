import { useParams } from "react-router-dom";
import { CountryData } from "../static/Interfaces";
import { CountryState } from "../Reducer/countryReducer";


const SingleCountry = ({ countriesState }: { countriesState: CountryState }) => {
  const { id } = useParams(); 

  const countryInfo: CountryData | undefined = countriesState.countries.find(
    (country) => country.id.toString() === id
  );


  console.log(countryInfo)

  if (!countryInfo) {
    return <p>Page in not found</p>;
  }

  return (
    <div>
      <span>{countryInfo.name}</span>
      <br />
      <span>{countryInfo.capital}</span>
      <br />
      <span>{countryInfo.population}</span>
      <br />
    </div>
  );
};

export default SingleCountry;
