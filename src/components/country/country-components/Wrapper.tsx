import { useContext } from "react";
import Img from "./Img";
import { CountryData } from "../static/Interfaces";
import { Link } from "react-router-dom";
import Characteristics from "./Characteristics";
import { CountryAction } from "../Reducer/countryReducer";
import { LanguageContext } from "../../../App";
import { deleteCountry } from "../../../api/countries";
import { useMutation } from "@tanstack/react-query";

interface WrapperProps {
  flagUrl: string | unknown;
  el: CountryData;
  countryIndex: number;
  countriesState: CountryData[];
  dispatch: React.Dispatch<CountryAction>;
  onDelete: () => void;
  onRevive: () => void;
}

const Wrapper: React.FC<WrapperProps> = (props) => {
  const { switchLang } = useContext(LanguageContext);
  const { flagUrl, el, countryIndex, countriesState, dispatch, onRevive } =
    props;
  const id = el.id;

  const deleteMutation = useMutation({mutationFn:deleteCountry});

  const handleDelete = () => {
    deleteMutation.mutate(3, {
      onSuccess: () => {
        dispatch({ type: "DELETE_COUNTRY", payload: { index: countryIndex } });
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
      <Characteristics
        el={el}
        index={countryIndex}
        countryState={countriesState}
        dispatch={dispatch}
      />

      <button onClick={handleDelete} className="delete-btn">
        {switchLang === "en" ? "Delete" : "წაშლა"}
      </button>
      {el.isDeleted ? (
        <button onClick={onRevive} className="revive-btn">
          {switchLang === "en" ? "Revive" : "აღდგენა"}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Wrapper;
