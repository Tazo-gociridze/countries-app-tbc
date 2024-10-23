import { FC, useContext } from "react";
import { LanguageContext } from "../../../App";

const Description: FC = () => {
  const { switchLang } = useContext(LanguageContext);
  return (
    <p>
      {switchLang === "en"
        ? "The most beautiful and reliable structures"
        : "ყველაზე ლამაზი და საიმედო სტრუქტურები"}
    </p>
  );
};

export default Description;
