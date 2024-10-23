import { FC, useContext } from "react";
import { LanguageContext } from "../../../../App";

const SecondTitle: FC = () => {
  const { switchLang } = useContext(LanguageContext); 
  return (
    <h2>
      {
      switchLang === 'en' 
      ? <div>WE ARE <span>CREATIVE</span></div> 
      : <div>ჩვენ ვართ <span>კრეატიულები</span></div>
      }   
    </h2>
  );
};

export default SecondTitle;
