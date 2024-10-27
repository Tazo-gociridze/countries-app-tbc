import { useContext } from "react";
import { LanguageContext } from "../../../App";

const Title: React.FC = () => {
  const { switchLang } = useContext(LanguageContext);
  return (
    <>
      {switchLang === "en" ? (
        <h1>
          Corporate center <span>Corpo</span>
        </h1>
      ) : (
        <h1>
          კორპორაციული ცენტრი <span>კორპო</span>
        </h1>
      )}
    </>
  );
};

export default Title;
