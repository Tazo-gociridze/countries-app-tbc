import { PiSignInBold } from "react-icons/pi";
import { FC, useContext } from "react";
import Nav from "./header-components/Nav";
import { Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../../App";



const Header: FC = () => {
  const { switchLang, setSwitchLang, dispatch } = useContext(LanguageContext); 
  const location = useLocation();
  const pagePath = location.pathname.slice(3)

  const handleLanguageChange = (newLang: string) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: { switchLang: newLang } });
    setSwitchLang(newLang); 
  };

  return (
    <>
      <header className="header">
        <div className="restrictive-container">
          <div className="logo__div"></div>
          <Nav switchLang={switchLang}/>
          <div style={{display: 'flex', alignItems: 'center', gap:'30px'}} >
            <PiSignInBold className="sign-in-btn" />
          <div>
          <Link style={{color: 'white'}} to={`/en${pagePath}`} onClick={() => handleLanguageChange('en')}>En</Link>
          <Link style={{color: 'white'}} to={`/ge${pagePath}`} onClick={() => handleLanguageChange('ge')}>Ge</Link>
          </div>
          </div>
        </div>
      </header>
      ;
    </>
  );
};

export default Header