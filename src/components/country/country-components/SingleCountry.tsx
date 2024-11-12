import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { countryDetailPage } from "../../../api/countries";

const SingleCountry = () => {
  const { id } = useParams();
  const [specificСountry, setSpecificCountry] = useState({
    name: "",
    capital: "",
    population: "",
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["specific-country", id], 
    queryFn: () => countryDetailPage({ id }), 
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.data) {
      setSpecificCountry(data.data); 
    }
    //eslint-disable-next-line
  }, [data]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

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
