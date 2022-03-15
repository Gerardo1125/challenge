import React from "react";
import SiderbarMenu from "../../components/SidebarMenu/SiderbarMenu";
import Header from "../../components/Header/Header";
import './Sidebar.css'

const Sidebar = props => {


    return(
        <div className="sidebar-menu ">
            <Header />
            <SiderbarMenu 
                item1={"Task"}
                item3={"My perfil"}
                
                setView={props.setView}
            />
        </div>
    )
}

export default Sidebar