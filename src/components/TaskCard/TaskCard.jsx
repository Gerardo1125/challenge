import React, {useState, useEffect, useRef} from "react";
import CardTags from "./CardTags";
import Menutask from "./Menutask";
import {FaEllipsisH, 
    FaRegClock, 
    FaPaperclip, 
    FaRegComment, 
    FaProjectDiagram,
    FaEdit,
    FaTrashAlt
} from 'react-icons/fa'
import reactOnclickoutside from "react-onclickoutside";

import './TaskCard.css'

const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
const TaskCard = props =>{
    const ref = useRef(null);

    useEffect(()=>{
        const handleClickOutside = (event)=> {
            if(ref.current && !ref.current.contains(event.target)){
                setOpen(false)
            }
        }
        
        document.addEventListener('click', handleClickOutside, true)

        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    },[ref])

    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);

    const date1 = new Date(props.data.dueDate.substring(0,10).replace(/-/g, '\/'))
    const one_day = 1000*60*60*24;
    const dateNow = new Date()
    const result = (Math.ceil((date1.getTime()- dateNow.getTime())/(one_day)))
    const status = open ? 'open': 'close'
    return(
        <div id="task-card">
            <div className="task-header" ref={ref}>
                <p className="task-p"> {props.data.name} </p>
                <span className="menu-wrapper">
                    <FaEllipsisH 
                            onClick={()=>{setOpen(!open)}} 
                            style={{cursor:'pointer', marginTop: 10}}
                            color='#919497' 
                    />
                    {
                        open &&
                        <div className={`menu menu-${status}`}>
                            <ul style={{
                                alignItems:"flex-start",
                                                             
                            }}>
                                <li onClick={()=>{
                                    props.saveData(
                                        props.data.name, 
                                        props.data.tags,
                                        props.data.status,
                                        props.data.pointEstimate,
                                        props.data.assignee,
                                        props.data.dueDate,
                                        props.data.id
                                        )
                                    setOpen(false)
                                    
                                }}
                                    style={{cursor:'pointer'}}
                                >
                                    <FaEdit />
                                    <a >Edit</a>
                                </li>
                                <li onClick={()=>{
                                    props.deleteTask(props.data.id)
                                    setOpen(false)
                                }}
                                    style={{cursor:'pointer'}}                                
                                >
                                    <FaTrashAlt /> 
                                    <a>Deleted</a>
                                </li>
                            </ul>
                        </div>   
                    }
                </span>
            </div>

            <div className="task-subtitle" style={{fontSize: 13}}>
                 <p className="task-p"> {props.data.pointEstimate} Points </p>
                {
                    result === 0 && (props.data.status === 'DONE' || props.data.status === 'CANCELLED') ?
                    <div className="task-date">
                        <FaRegClock color="white" style={{marginTop: 10, marginRight: 5}}></FaRegClock>
                        <p className="task-p" style={{fontWeight:'bold'}}> TODAY </p>
                    </div>
                    :
                    result === 0 && (props.data.status !== 'DONE' || props.data.status === 'CANCELLED') ?
                    <div className="task-date">
                        <FaRegClock color="#d2a651" style={{marginTop: 10, marginRight: 5}}></FaRegClock>
                        <p className="task-p" style={{fontWeight:'bold', color:'#d7aa51'}}> TODAY </p>
                    </div>
                    :
                    result > 0 && result <= 2 && props.data.status !== 'DONE' ?
                    <div className="task-date">
                        <FaRegClock color="#d2a651" style={{marginTop: 10, marginRight: 5}}></FaRegClock>
                        <p className="task-p" style={{fontWeight:'bold', color:'#d7aa51'}}> {date1.getDate() +" " + date1.toLocaleString('default', {month:'long'}).toUpperCase() + ", " + date1.getFullYear()} </p>
                    </div>
                    :
                    result === -1 ?
                    <div className="task-date" style={{background: '#3d3335'}}>
                        <FaRegClock color="#c35247" style={{marginTop: 10, marginRight: 5}}></FaRegClock>
                        <p className="task-p" style={{fontWeight:'bold', color:"#c35247"}}> YESTERDAY </p>
                    </div>
                    :
                    result < -1 ?
                    <div className="task-date" style={{background: '#3d3335'}}>
                        <FaRegClock color="#c35247" style={{marginTop: 10, marginRight: 5}}></FaRegClock>
                        <p className="task-p" style={{fontWeight:'bold', color:"#c35247"}}> {date1.getDate() +" " + date1.toLocaleString('default', {month:'long'}).toUpperCase() + ", " + date1.getFullYear()} </p>
                    </div>
                    :  
                    <div className="task-date">
                        <FaRegClock color="white" style={{marginTop: 10, marginRight: 5}}></FaRegClock>
                        <p className="task-p"> {date1.getDate() +" " + date1.toLocaleString('default', {month:'long'}).toUpperCase() + ", " + date1.getFullYear()} </p>
                    </div>

                }
            </div>
            <div style={{
                display:'grid',
                gridTemplateColumns: "repeat(2, 1fr)",
                gridGap: 0,
                
            }}>
                {
                    props.data.tags.map((item, index) =>{
                        return(
                            <div key={item + props.data.id} style={{marginRight:10}}>
                                <CardTags tag={item} />
                            </div>
                        )
                    })
                }
            </div>

            <div className="task-subtitle">
                <img src={props.data.assignee.avatar} style={{
                    height:25,
                    width:25,
                    borderRadius:25
                }}/>
                <div style={{
                    flexDirection:'row',
                    display:'flex',
                    justifyContent:'space-between',
                    width:'35%',
                    marginTop:10                    
                }}>
                    <FaPaperclip color="#cacbcc" size={12} style={{}} />
                    
                    <div style={{
                    flexDirection:'row',
                    display:'flex',                   
                    }}>
                        <p style={{marginTop: 0, fontSize: 12, marginRight: 5}}>5</p>
                        <FaProjectDiagram color="#cacbcc" size={12}/>
                    </div>
                    <div style={{
                    flexDirection:'row',
                    display:'flex',                   
                    }}>
                        <p style={{marginTop: 0, fontSize: 12, marginRight: 5}}>3</p>
                        <FaRegComment color="#cacbcc" size={12}/>
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default TaskCard