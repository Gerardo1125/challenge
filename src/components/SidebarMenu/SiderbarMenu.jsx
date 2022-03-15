import React, {useState} from "react";
import './SiderbarMenu.css'
const SiderbarMenu = (props) =>{
    const [task, setTask] = useState('active-item')
    const [profile, setProfile] = useState('inactive-item')
    const [administrator, setAdministrador] = useState('inactive-item')
    
    function setBtnAndView(view){
        props.setView(view)
        if(view === "task"){
            setTask("active-item")
            setProfile("inactive-item")
            //setAdministrador("inactive-item")
        }else if(view === 'myTask'){
            setTask("inactive-item")
            setProfile("inactive-item")
            //setAdministrador("inactive-item")
        }else if(view === 'profile'){
            setTask("inactive-item")
            setProfile("active-item")
            //etAdministrador("inactive-item")
        }else if(view === 'administrator'){
            setTask("inactive-item")
            setProfile("inactive-item")
            //setAdministrador("active-item")
        }
    }

    return(
        <div className="menu-items">
            <a
                className={task}
                href='#'
                onClick={()=> setBtnAndView('task')}
            >
                {props.item1}
            </a>
			<a
				className={profile}
				href="#"
				onClick={() => setBtnAndView("profile")}
			>
				{props.item3}
			</a>

        </div>
    )
}

export default SiderbarMenu