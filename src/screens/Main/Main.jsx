import React, {useState} from "react";
import './Main.css'

import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../../components/SearchBar/SearchBar";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";

const Main = props => {
    const [view, setViewName] = useState("task")

    function setView(view){
        setViewName(view)
    }
    
    /* const ShowCase = () =>{
        return(
            <div>
                {
                    (()=> {
                        switch(view) {
                            case "overview":
                                return (
                                <div id="dashboard">
                                    <Sidebar setView={setView} />
                                    <Overview />
                                    
                                </div>
                            );
                            case "schedule":
                            return (
                                <div id="dashboard">
                                    <Sidebar setView={setView} />
                                    {//<ScheduleView />
                                    }
                                </div>
                            );
                            case "performance":
                            return (
                                <div id="dashboard">
                                    <Sidebar setView={setView} />
                                    {//<PerformanceView />
                                    }
                                </div>
                            );
                            case "administrator":
                            return (
                                <div id="dashboard">
                                    <Sidebar setView={setView} />
                                    {//<AdministratorView />
                                    }
                                </div>
                            );
                            default:
                                <div id="dashboard">
                                    <Sidebar setView={setView} />
                                    {//<Overview />
                                    }
                                </div>
                        }
                    })()
                }
            </div>
        )
    }*/

    return(
        
            (()=> {
                switch(view) {
                    case "task":
                        return (
                        <div id="dashboard">
                            <Sidebar setView={setView} />
                            <div>
                                <SearchBar />
                                <Dashboard />
                            </div>
                            
                        </div>
                    );
                    case "profile":
                    return (
                        <div id="dashboard">
                            <Sidebar setView={setView} />
                            <div>
                                <Profile />
                            </div>
                        </div>
                    );
                    default:
                        <div id="dashboard">
                            <Sidebar setView={setView} />
                            {//<Overview />
                            }
                        </div>
                }
            })()
        
    )
}

export default Main