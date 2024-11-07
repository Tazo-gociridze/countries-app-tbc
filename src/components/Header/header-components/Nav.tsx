import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav: FC<{ switchLang: string }> = ({ switchLang }) => {
  const navs =
    switchLang === "en"
      ? [
          { name: "Home", path: "/en" },
          { name: "About", path: "/en/about" },
          { name: "Country", path: "/en/country" },
          { name: "Contact", path: "/en/contact" },
          { name: "OtpInput", path: "/en/otpinput" },
          { name: "useMutation", path: "/en/usemutation" },
        ]
      : [
          { name: "მთავარი", path: "/ge" },
          { name: "ჩვენს შესახებ", path: "/ge/about" },
          { name: "ქვეყანა", path: "/ge/country" },
          { name: "კონტაქტი", path: "/ge/contact" },
          { name: "ოტპ ინფუთი", path: "/ge/otpinput" },
          { name: "მუტაციის ჰუკი", path: "/ge/usemutation" },
        ];

  const location = useLocation();

  return (
    <div className="navbar">
      {navs.map((item, index) => (
        <Link
          to={item.path}
          className={location.pathname === item.path ? "active-color" : ""}
          key={index}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Nav;
