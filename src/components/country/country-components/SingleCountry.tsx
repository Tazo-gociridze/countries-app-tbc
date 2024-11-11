import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { countryDetailPage } from "../../../api/countries";

const SingleCountry = () => {
  const { id } = useParams();
  const [specificСountry, setSpecificCountry] = useState({
    name: "",
    capital: "",
    population: "",
  });

  useEffect(() => {
    if (id) {
      countryDetailPage({ id }).then((res) => setSpecificCountry(res?.data));
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="single-country__wrapper">
      <span>{specificСountry.name}</span>
      <br />
      <span>{specificСountry.capital}</span>
      <br />
      <span>{specificСountry.population}</span>
      <br />
    </div>
  );
};

export default SingleCountry;
