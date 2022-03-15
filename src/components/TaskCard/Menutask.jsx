import React, {useState} from "react";
import './TaskCard.css'
import { FaEllipsisH } from "react-icons/fa";
import reactOnclickoutside from "react-onclickoutside";

const MenuTask = props =>{
    const [open, setOpen] = useState(false)
    
    const close = () => {
        setOpen(false)
        window.document.removeEventListener('click', close, false)
    }

    const status = open ? 'open': 'close'
    MenuTask.handleClickOutside = ()=> setOpen(false)
    return(
        <span className="menu-wrapper">
            <FaEllipsisH 
                        onClick={()=>{setOpen(!open)}} 
                        style={{cursor:'pointer', marginTop: 10}}
                        color='#919497' 
            />
            <div className={`menu menu-${status}`}>
                {props.children}
            </div>
        </span>
    )
}

var clickOutsideConfig = {
    handleClickOutside: function(instance) {
      // There aren't any "instances" when dealing with functional
      // components, so we ignore the instance parameter entirely,
      //  and just return the handler that we set up for Menu:
      return MenuTask.handleClickOutside;
    }
  };

export default reactOnclickoutside(MenuTask, clickOutsideConfig)