import React, {useState, useEffect} from "react";
import './Dashboard.css'
import axios from "axios";

import {FaPlus} from 'react-icons/fa'
import TaskCard from "../../components/TaskCard/TaskCard";
import ModalTask from "../../components/Modal/Modal";
import { Alert } from "@mui/material";
import { Spinner } from "react-activity";
import 'react-activity/dist/library.css'

const tab = [
    { icon: <i class="fas fa-edit"></i>, name: "editer", function: console.log('asd') },
    {
      icon: <i class="fas fa-trash"></i>,
      name: "delete",
      alert: "true",
      color: "tomato"
    }
  ];

  const config = {
    headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiOTNhNTk5YTFkMmQ4IiwicHJvamVjdElkIjoiZDQwMWJhNGMtNzQzMy00ZDQ3LWI3ZjktZmI4NGQ4MzVhYmQwIiwiZnVsbE5hbWUiOiJHZXJhcmRvIEZlbGlwZSBUYW1vIFZhcmdhcyIsImVtYWlsIjoiZ3RhbW9AdW5zYS5lZHUucGUiLCJpYXQiOjE2NDcwNDE3MDR9.z6SbiiPt1gT-UQPt4j8T0ToPyg9moqW0lhDWljaa9uU`,
        'Content-Type': 'application/json'
    }
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

const Dashboard = () => {
    useEffect(()=> {
        getAllProfile()
        getTasks()
        return () => {}
    },[])

    const [data, setData] = useState()
    const [cont, setCont] = useState([])    
    const [status, setStatus] = useState([])
    const [allUsers, setAllUsers] = useState()
    const [modalOpen, setModalOpen] = useState(false)

    const [name, setName] = useState('')
    const [tags, setTags] = useState(null)
    const [tags2, setTags2] = useState(null)
    const [status1, setStatus1] = useState(null)
    const [point, setPoint] = useState(null)
    const [asignee, setAsignee] = useState(null)
    const [startDate, setStartDate] = useState(new Date( (new Date().getFullYear() + '-'+(new Date().getMonth()<9? "0" +(new Date().getMonth()+1) : (new Date().getMonth()+1)) + "-" +new Date().getDate()).replace(/-/g, '\/')));
    const [idTask, setIdTassk] = useState('')
    
    const [alert1, setAlert1] = useState(false)
    const [alert2, setAlert2] = useState(false)

    const [flag, setFlag] = useState(false)
    const [dots, setDots] = useState(true)

    async function getTasks(){

        let resp = await axios
            .get('https://syn-api-prod.herokuapp.com/tasks', config)
            .then((resp) =>{
                let arr = status
                for (let i = 0; i < resp.data.length; i++) {
                    if(arr.length === 0){
                        arr = [...arr, resp.data[i]]
                    }else{
                        let flag = false
                        for (let j = 0; j < arr.length; j++) {
                            if(arr[j].status === resp.data[i].status){
                                flag = true
                                break                                
                            }
                        }
                        if(!flag){
                            arr = [...arr, resp.data[i]]
                        }
                    }
                }
                getCount(resp.data, arr)
                setStatus(arr)
                setData(resp.data)
                setDots(!dots)
            })
    }

    function getCount(resp, arr){
        let arr2 = []
        for (let i = 0; i < arr.length; i++) {
            let task = arr[i].status
            let c = 0
            for (let j = 0; j < resp.length; j++) {
                if(task === resp[j].status){
                    c++
                }                
            }
            arr2 = [...arr2, c]
        }
        setCont(arr2)      
    }

    async function getAllProfile(){

        let resp = await axios
            .get('https://syn-api-prod.herokuapp.com/users', config)
            .then((resp)=>{
                setAllUsers(resp.data)
            })
    }

    if(alert1 || alert2){
        const myTimeout = setTimeout(()=>{
            setAlert1(false)
            setAlert2(false)
        }, 3000);
    }

    async function saveTask(name, tag, status, point, date, assignee){
        if(flag){
            try {
                const bodyParameters = {
                    name: name,
                    tags : tag,
                    status : status,
                    pointEstimate : parseInt(point),
                    dueDate : date,
                    assigneeId : assignee,
                    position: 1

                }
                let resp = await axios
                    .put('https://syn-api-prod.herokuapp.com/tasks/'+ idTask, 
                    bodyParameters, config)
                    .then(()=>{
                        setModalOpen(false)
                        getTasks()
                        setAlert1(true)
                    })

            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const bodyParameters = {
                    name: name,
                    tags : tag,
                    status : status,
                    pointEstimate : point,
                    dueDate : date,
                    assigneeId : assignee
                }
                let resp = await axios
                    .post('https://syn-api-prod.herokuapp.com/tasks',bodyParameters, config)
                    .then((resp)=>{
                        console.log('Creado')
                        setModalOpen(false)
                        getTasks()
                        setAlert1(true)
                    })
            } catch  (e) {
                console.log(e)
            }
        }
    }

    async function deleteTask(id){
        try {
            let resp = await axios
                .delete('https://syn-api-prod.herokuapp.com/tasks/'+ id, config)
                .then(()=>{
                    getTasks()
                    console.log("borrado")
                    setAlert2(true)
                })
        } catch (e) {
            console.log(e)
        }
    }

    function saveData(name, tags, status, point, asignee, date, id){
        setName(name)
        let arrtag= [], aux = []
        for (let i = 0; i < tags.length; i++) {
            for (let j = 0; j < tagsOptions.length; j++) {
                if(tags[i] === tagsOptions[j].value){
                    arrtag = [...arrtag, tagsOptions[j]] 
                    aux = [...aux, tagsOptions[j].value]
                }
            }
        }
        setTags(arrtag)
        setTags2(aux)
        for (let j = 0; j < statusOptions.length; j++) {
            if(status === statusOptions[j].value){
                arrtag =statusOptions[j]
                break
            }
        }
        setStatus1(arrtag)
        
        for (let j = 0; j < pointOptions.length; j++) {
            if(point === pointOptions[j].value){
                arrtag = pointOptions[j]
                break
            }
        }
        setPoint(arrtag)
        setAsignee({
            value: asignee.id,
            label: asignee.fullName
        })
        
        setStartDate(date.substring(0,10))
        setFlag(true)
        setIdTassk(id)
        setModalOpen(true)
    }

    return (
                    
            <div className="dash-view">
                {
                    !dots ?
                    <div>
                        <h2 className="view-heading"></h2>
                        <div style={{
                            position:'relative',
                            marginLeft: '95%'
                        }}>
                            <button style={{
                                height: 40, 
                                width: 40, 
                                background:'#da584a', 
                                borderRadius:10,
                                borderWidth: 0.01,
                                borderColor: '#da584a',
                                cursor:'pointer'
                            }}
                                onClick={()=>{
                                    setFlag(false)
                                    setName('')
                                    setTags(null)
                                    setTags2(null)
                                    setStatus1(null)
                                    setPoint(null)
                                    setAsignee(null)
                                    setStartDate((new Date().getFullYear() + '-'+(new Date().getMonth()<9? "0" +(new Date().getMonth()+1) : (new Date().getMonth()+1)) + "-" +new Date().getDate()));
                                    setModalOpen(!modalOpen)}
                                }
                            >
                                <FaPlus color="white" size={30} style={{
                                    marginLeft:-2,
                                }} />
                            </button>
                        </div>
                        <div style={{textAlign: 'left' , 
                                display:'grid',
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gridGap: 80,                  
                                }}>
                            {
                                status.map((item, index) => {
                                    return(
                                        <div key={item.id}>
                                            <p className="view-heading ">{item.status} ({cont[index]})</p>
                                            {
                                                data && 
                                                <div>
                                                    {
                                                        data.map((i)=>{
                                                            if(i.status === item.status){
                                                                return(
                                                                    <div key={i.id}>
                                                                        <TaskCard 
                                                                            data={i}
                                                                            content={tab}
                                                                            deleteTask={deleteTask}
                                                                            saveData = {saveData}
                                                                        />
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ModalTask 
                            open={modalOpen}
                            close = {()=>{setModalOpen(false)}}
                            users={allUsers}
                            saveTask={saveTask}
                            
                            alert1={()=>{
                                setAlert1(true)
                            }}

                            name={name}
                            tag={tags}
                            tagaux = {tags2}
                            status = {status1}
                            point = {point}
                            asignee = {asignee}
                            date = {startDate}
                            flag = {flag}
                        />
                    </div>
                    :              
                    <Spinner color="white" size={80} speed={0.5} animating={true} 
                            style={{
                                top:'40%',
                                position:'absolute',
                                left: '50%'
                            }}
                    />
                    
                }
                {
                    alert1 && 
                    <Alert onClose={() => {setAlert1(false)}} style={{
                        position:'absolute',
                        top: 0,
                        opacity:1,
                        left:'45%'
                        
                    }}>Task created successfully</Alert>
                }
                {
                    alert2 && 
                    <Alert onClose={() => {setAlert2(false)}} style={{
                        position:'absolute',
                        top: 0,
                        opacity:1,
                        left:'45%'
                        
                    }}>Task deleted successfully</Alert>
                }
            </div>
        
    );
}
export default Dashboard