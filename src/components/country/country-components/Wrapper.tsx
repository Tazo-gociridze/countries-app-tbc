import { useContext } from "react";
import Img from "./Img";
import { CountryData } from "../static/Interfaces";
import { Link } from "react-router-dom";
import Characteristics from "./Characteristics";
import { CountryAction } from "../Reducer/countryReducer";
import { LanguageContext } from "../../../App";
import { deleteCountry } from "../../../api/countries";
import { useMutation } from "@tanstack/react-query";
import { countryComponentContext } from "./countrySection/CountryComponent";

interface WrapperProps {
  flagUrl: string | unknown;
  el: CountryData;
  countryIndex: number;
  countryLikes: number;
  dispatch: React.Dispatch<CountryAction>;
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  const { switchLang } = useContext(LanguageContext);
  const { refetch } = useContext(countryComponentContext);
  const {
    flagUrl,
    el,
    countryLikes,
    countryIndex,
    dispatch,
  } = props;
  const id = el.id;

  const deleteMutation = useMutation({ mutationFn: deleteCountry });

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Error deleting country:", error);
      },
    });
  };

  return (
    <div
      className={`country__section-wrapper ${el.isDeleted ? "countryDeleted" : ""}`}
    >
      <Link to={`/en/country/${id}`}>
        <Img flagUrl={flagUrl} />
      </Link>
      {/* eslint-disable-next-line */}
      {/* @ts-ignore */}
      <Characteristics
        countryLikes={countryLikes}
        el={el}
        index={countryIndex}
        dispatch={dispatch}
      />

      <button onClick={handleDelete} className="delete-btn">
        {switchLang === "en" ? "Delete" : "წაშლა"}
      </button>
      {el.isDeleted ? (
        <button className="revive-btn">
          {switchLang === "en" ? "Revive" : "აღდგენა"}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Wrapper;
