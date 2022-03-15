import React, {useState, useEffect} from "react";
import './Profile.css'
import stars from '../../assets/images/Stars.svg'
import { Spinner } from "react-activity";
import 'react-activity/dist/library.css'

import axios from "axios";

const Profile = props =>{

    useEffect(()=>{
        getProfile()
    },[])

    const [profile, setProfile] = useState()
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [created, setCreated] = useState('')
    const [updated, setUpdated] = useState('')

    const [dots, setDots] = useState(false)

    async function getProfile(){
        const config = {
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiOTNhNTk5YTFkMmQ4IiwicHJvamVjdElkIjoiZDQwMWJhNGMtNzQzMy00ZDQ3LWI3ZjktZmI4NGQ4MzVhYmQwIiwiZnVsbE5hbWUiOiJHZXJhcmRvIEZlbGlwZSBUYW1vIFZhcmdhcyIsImVtYWlsIjoiZ3RhbW9AdW5zYS5lZHUucGUiLCJpYXQiOjE2NDcwNDE3MDR9.z6SbiiPt1gT-UQPt4j8T0ToPyg9moqW0lhDWljaa9uU`,
            }
        } 

        let resp = await axios
            .get('https://syn-api-prod.herokuapp.com/user', config)
            .then((resp)=>{
                //console.log(resp.data)
                setProfile(resp.data)
                /****************** */
                let fullname = resp.data.fullName
                let aux = fullname.substring(0, fullname.indexOf(' '))
                fullname = fullname.substring(fullname.indexOf(' ')+1, fullname.length)
                setName(aux +" "+fullname.substring(0, fullname.indexOf(' ')))
                fullname = fullname.substring(fullname.indexOf(' '), fullname.length)
                setLastName(fullname)
                /**************** */
                //
                const create = new Date(resp.data.createdAt)
                const update = new Date(resp.data.updatedAt)

                setCreated(create.getDate() +" " + create.toLocaleString('default', {month:'long'}).toUpperCase() + ", " + create.getFullYear())
                setUpdated(update.getDate() +" " + update.toLocaleString('default', {month:'long'}).toUpperCase() + ", " + update.getFullYear())
                setDots(true)
            })
    }

    
    return(
        <div className="profile">
            {
                dots ?
                <div>
                    <div style={{
                        backgroundImage : `url(${stars})`,
                        position: 'absolute',
                        height:'100%',
                        width: '80%' 
                    }}/>
                    <div className="image" style={{
                    }}/>
                    <div className="moon" style={{
                    }}/>
                    <h1 className="textStyle">
                        <span >{name}</span>
                        <br></br>
                        <span style={{
                            marginLeft: 30
                        }}>{lastName}</span>       
            
                    </h1>
                    {
                        profile &&
                        <div style={{
                            position:'absolute',
                                right: 40,
                                top: '55%',
                        }}>
                            <span style={{
                                
                                color: '#f300b4',
                                fontStyle: 'italic',
                                fontSize: 50,
                                
                            }}>{profile.type }</span>
                            <br/>
                            <span style={{
                                
                                color: '#f300b4',
                                fontStyle: 'italic',
                                fontSize: 30
                            }}>{profile.email}</span>
                        </div>
                    }
                    <span style={{
                            position:'absolute',
                            bottom:0,
                            color: 'white',
                            fontStyle: 'italic',
                            fontSize: 30,
                            left:'50%'
                        }}>Thanks for watching</span>
                    <span style={{
                            position:'absolute',
                            color: 'white',
                            fontStyle: 'italic',
                            fontSize: 20,
                            right:15
                        }}>
                            <span>
                            Created: {created}
                            </span>
                            <br/>
                            <span>
                            Updated: {updated}
                            </span>
                            </span>
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
            
        </div>
    )
}

export default Profile