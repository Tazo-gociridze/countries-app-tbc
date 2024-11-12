import { useContext } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { LanguageContext } from "../../../../App";
import { useSearchParams } from "react-router-dom";

interface SortBtnsProps {
  refetch: () => void;
}

const SortBtns: React.FC<SortBtnsProps> = ({ refetch }) => {
  const { switchLang } = useContext(LanguageContext);
  //eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortUp = () => {
    setSearchParams({ sort: "-likes" });
    refetch();
  };

  const handleSortDown = () => {
    setSearchParams({ sort: "likes" });
    refetch();
  };

  if (searchParams) {
    <></>
  }

  return (
    <div>
      <button onClick={handleSortUp} className="sort-btn">
        {switchLang === "en" ? "sort" : "სორტირება"} <FaSortUp />
      </button>
      <button onClick={handleSortDown} className="sort-btn">
        {switchLang === "en" ? "sort" : "სორტირება"} <FaSortDown />
      </button>
    </div>
  );
};

export default SortBtns;
