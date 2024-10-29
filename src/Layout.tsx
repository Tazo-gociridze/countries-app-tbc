import Header from "@components/Header/Header";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/en");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
