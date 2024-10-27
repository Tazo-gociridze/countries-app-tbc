import React, { useContext } from "react";
import { LanguageContext } from "../../../../App";

const Title: React.FC = () => {
  const { switchLang } = useContext(LanguageContext);
  return <h1>{switchLang === "en" ? "ABOUT US" : "ჩვენს შესახებ"}</h1>;
};

export default Title;
