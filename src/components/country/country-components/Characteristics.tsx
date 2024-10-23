import { FC,} from "react";
import { CountryData } from "../static/Interfaces";
import { AiOutlineLike } from "react-icons/ai";
import { CountryAction } from "../Reducer/countryReducer";



interface CountryInfoProps {
  el: CountryData;
  index: number;
  countryState: CountryData[];
  dispatch: React.Dispatch<CountryAction>; 
}

const Characteristics: FC<CountryInfoProps> = ({
  el,
  index,
  dispatch,
}) => {


  const handleLikeClick = () => {
    dispatch({ type: "INCREMENT_LIKE", payload: { index } });
  };

  return (
    <div className="characteristics">
      <div className="characteristic">
        <span>{el.name}</span>
        <br />
        <span>{el.capital}</span>
        <br />
        <span>{el.population}</span>
        <br />
        <div onClick={handleLikeClick} className="like-icon">
          <span>{el.likes}</span> 
          <AiOutlineLike />
        </div>
      </div>
    </div>
  );
};


export default Characteristics;