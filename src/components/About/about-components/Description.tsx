import React, { useContext } from "react";
import Title from "./Description/title";
import SecondTitle from "./Description/SecondTitle";
import Paragraph from "./Description/Paragraph";
import Button from "../../utils/Button/Button";
import { LanguageContext } from "../../..//App";

const Description: React.FC = () => {
  const { switchLang } = useContext(LanguageContext);
  return (
    <div className="about__section-description">
      <Title />
      <SecondTitle />
      <Paragraph />
      <Button>{switchLang === "en" ? "Read more" : "მეტის ნახვა"}</Button>
    </div>
  );
};

export default Description;
