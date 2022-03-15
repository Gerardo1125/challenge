import React from "react";
import logo from '../../assets/images/Company_Logo.png'
import './Header.css'
const Header = props => {

    return(
        <div>
            <img 
                id="profile-pic"
                src={logo}
            />
            
        </div>
    )
}

export default Header