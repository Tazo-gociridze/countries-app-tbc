import Header from "@components/Header/Header";
import { FC } from "react";
import { Outlet } from "react-router-dom";


const Layout: FC = () => {
    return (
        <div className="layout">
            <Header/>
            <main>
                <Outlet/>
            </main>
            
        </div>
    );
};

export default Layout;