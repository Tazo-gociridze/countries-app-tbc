import { FC, useContext } from "react"
import { LanguageContext } from "../../../App";
import { IoIosConstruct } from "react-icons/io";
import Title from "./Title";
import Description from "./Description";

const Text: FC = () => {
  const { switchLang } = useContext(LanguageContext); 
  return (
    <div>
      <div className="hero__div-text">
        <IoIosConstruct className="hero__div-text-icon" />
        <Title/>
        <Description/>
        <button className="hero__section-btn">
          {switchLang === 'en' ? 'Find out more' : 'მეტის ნახვა'}
        </button>
      </div>
    </div>
  );
};

export default Text;
