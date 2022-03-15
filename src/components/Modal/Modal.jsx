import React,{useEffect, useState} from "react";
import './Modal.css'
import Modal from "react-modal";
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(33, 37, 40, 1)',
      minHeight:'60%',
      minWidth: '40%',
      color:'white'
    },
  };

const ModalTask = props =>{
    
    const [name, setName] = useState(props.name)
    const [tags, setTags] = useState(props.tag)
    const [status, setStatus] = useState(props.status)
    const [point, setPoint] = useState(props.point)
    const [asignee, setAsignee] = useState(props.asignee)
    const [startDate, setStartDate] = useState(props.date);

    const [users, setUsers] = useState([])
    const [flag, setFlag] = useState(true)

    useEffect(()=>{
        setName(props.name)
        setTags(props.tagaux)
        setStatus(props.status)
        setPoint(props.point)
        setAsignee(props.asignee)
        setStartDate(props.date)
        
    },[props.name, props.tagaux, props.status, props.point, props.asignee, props.date])
    if(flag){
        if(props.users !== undefined){
            formatUsers()
            setFlag(false)
            
        }
    }
    function formatUsers(){
        let format = []
        for (let i = 0; i < props.users.length; i++) {
            const element = {
                value: props.users[i].id,
                label: props.users[i].fullName
            }
            format.push(element)
        }
        setUsers(format)
    }

    const tagsOptions = [
        {value: 'ANDROID', label: 'ANDROID'},
        {value: 'IOS', label: 'IOS'},
        {value: 'NODE_JS', label: 'NODE JS'},
        {value: 'REACT', label: 'RAILS'},
        {value: 'RAILS', label: 'REACT'},
    ]

    const statusOptions = [
        {value: 'BACKLOG', label: 'BACKLOG'},
        {value: 'TODO', label: 'TODO'},
        {value: 'IN_PROGRESS', label: 'IN PROGRESS'},
        {value: 'DONE', label: 'DONE'},
        {value: 'CANCELLED', label: 'CANCELLED'},
    ]

    const pointOptions = [
        {value: '0', label: '0'},
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '4', label: '4'},
        {value: '8', label: '8'},
    ]

    const animatedComponents = makeAnimated();

    return(
       
            <Modal
            isOpen={props.open}
            style={customStyles}
            contentLabel='Example'
            overlayClassName='overlay'
            
            >
                <h2 style={{
                    color:'white',
                    textAlign:'center'
                }}>Create new Task!</h2>
                <input
                        type="text"
                        id="header-search"
                        placeholder="Name"
                        color="#909497"
                        style={{
                            padding: 10,
                            background:'white', 
                            borderColor:'transparent',
                            color:'#909497',
                            outlineStyle:'none',
                            fontSize: 15,
                            marginTop:-0,
                            width:'95%',
                            marginBottom: 15    
                        }}
                        defaultValue={props.name}
                        onChange= {(item)=> {
                            setName(item.target.value)
                        }}
                        name='Name'
                />

                <div style={{marginBottom:15}}>
                    <Select 
                        options={tagsOptions}
                        onChange={(item)=>{
                            if(item === null){
                                setTags(null)
                            }else{
                                let resp = []
                                for (let i = 0; i < item.length; i++) {
                                    resp = [...resp, item[i].value]
                                }
                                setTags(resp)                     
                            }
                        }}
                        isMulti
                        className="basic-multi-select"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={props.tag}
                        styles={{
                            multiValue: (base) => ({
                                ...base,
                                color:'black'                        
                            }),
                            option : (base) => ({
                                ...base,
                                background:'#2d2f33',     
                            }),

                            menuList: (base)=>({
                                ...base,
                                background:'#2d2f33',
                                maxHeight:120
                            }),
                            multiValueLabel: (base) => ({
                                ...base,
                                background:'#2d2f33',
                                color:'white'     
                            }),
                            multiValueRemove: (base) => ({
                                ...base,
                                background:'#2d2f33',     
                                color:'white'
                            }),
                            
                        }}
                        
                        placeholder="Select Tags"
                    />
                </div>

                <div style={{marginBottom:15}}>
                    <Select
                        defaultValue={props.status}
                        options={statusOptions}
                        onChange={(item)=>{
                            setStatus(item)
                            
                        }}
                        styles={{
                            multiValue: (base) => ({
                                ...base,
                                color:'black'                        
                            }),
                            option : (base) => ({
                                ...base,
                                background:'#2d2f33',
                                            
                            }),
                            menuList: (base)=>({
                                ...base,
                                background:'#2d2f33',
                                maxHeight:120
                            }),

                        }}
                        placeholder="Select Status"
                        isClearable
                        isSearchable
                    />
                </div>
                <div style={{marginBottom:15}}>
                    <Select 
                        defaultValue={props.point}
                        options={pointOptions}
                        onChange={(item)=>{
                            setPoint(item)

                        }}
                        styles={{
                            multiValue: (base) => ({
                                ...base,
                                color:'black'                        
                            }),
                            option : (base) => ({
                                ...base,
                                background:'#2d2f33',
                                            
                            }),
                            menuList: (base)=>({
                                ...base,
                                background:'#2d2f33',
                                maxHeight: 100
                            }),

                        }}
                        placeholder="Select point"
                        isClearable
                        isSearchable
                    />
                </div>

                <div style={{marginBottom:15}}>
                    <Select
                        defaultValue={props.asignee}
                        options={users}
                        onChange={(item)=>{
                            setAsignee(item)
                        
                        }}
                        styles={{
                            multiValue: (base) => ({
                                ...base,
                                color:'black'                        
                            }),
                            option : (base) => ({
                                ...base,
                                background:'#2d2f33',
                                            
                            }),
                            menuList: (base)=>({
                                ...base,
                                background:'#2d2f33',
                                maxHeight: 100
                            }),

                        }}
                        placeholder="Assignee"
                        isClearable
                        isSearchable
                    />
                </div>

                <input type='date' 
                    onChange={(day)=>{
                    setStartDate((day.target.value))
                    //console.log(new Date(day.target.value.replace(/-/g, '\/')).toISOString())
                }}
                    defaultValue= {props.date}
                />

                <div style={{
                    position:'absolute',
                    bottom:20,
                    right: 25
                }}>
                    <button onClick={()=>{
                        if(name === '' || tags === null || status === null || 
                            point === null ){
                                alert('empty spaces')
                        }else{
                            props.saveTask(name, tags, status.value, point.value, new Date(startDate.replace(/-/g, '\/')).toISOString(), asignee.value)
                        }
                    }} style={{
                        padding: 10,
                        marginRight:10,
                        background: '#2d2f33',
                        color:'white',
                        outlineStyle:'none',
                        fontSize: 25
                    }}>Save</button>
                    <button onClick={props.close} style={{
                        padding: 10,
                        marginRight:10,
                        background: '#2d2f33',
                        color:'red',
                        outlineStyle:'none',
                        fontSize: 25
                    }}>Close</button>
                </div>
               
            </Modal>
            
    )
}

export default ModalTask