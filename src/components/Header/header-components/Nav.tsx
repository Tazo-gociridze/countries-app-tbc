import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav: FC<{ switchLang: string }> = ({ switchLang }) => {
  const navs = switchLang === 'en'
    ? [
        { name: "Home", path: "/en/home" },
        { name: "About", path: "/en/about" },
        { name: "Country", path: "/en/country" },
        { name: "Contact", path: "/en/contact" },
      ]
    : [
        { name: "მთავარი", path: "/ge/home" },
        { name: "ჩვენს შესახებ", path: "/ge/about" },
        { name: "ქვეყანა", path: "/ge/country" },
        { name: "კონტაქტი", path: "/ge/contact" },
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
