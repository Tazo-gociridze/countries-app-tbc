import { FC, useContext } from "react"
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { DispatchType } from "./countryAddForm/CountryAddForm";
import { LanguageContext } from "../../../../App";

const SortBtns: FC<DispatchType> = ({dispatch}) => {
  const { switchLang } = useContext(LanguageContext); 
    const handleSortUp = () => {
        dispatch({ type: "SORT_UP" });
      };
    
      const handleSortDown = () => {
        dispatch({ type: "SORT_DOWN" });
      };

  return (
    <div>
        <button onClick={handleSortUp} className="sort-btn">
          {switchLang === 'en' ? 'sort' : 'სორტირება'} <FaSortUp />
        </button>
        <button onClick={handleSortDown} className="sort-btn">
        {switchLang === 'en' ? 'sort' : 'სორტირება'} <FaSortDown />
        </button>
    </div>
  )
};

export default SortBtns;
