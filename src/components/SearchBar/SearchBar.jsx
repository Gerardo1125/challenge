import React from "react";
import './SearchBar.css'
import avatar from '../../assets/images/hooded.jpg'
import {FaSearch, FaRegBell} from 'react-icons/fa'

const SearchBar = props =>{

    return(
        <div id="searchBar">
            <FaSearch color="#909497" style={{margin: 16}} size={20} />
            <form style={{width:'80%'}}>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search"
                    color="#909497"
                    style={{
                        height: '100%',
                        width:'100%',
                        background:'transparent', 
                        borderColor:'transparent',
                        color:'#909497',
                        outlineStyle:'none',
                        fontSize: 15,
                        marginTop:-0    
                    }}
                    
                    name='search'
                />
            </form>
            <FaRegBell color="#909497" style={{margin: 16}} size={20} />
            <img src={avatar} style={{
                height:35,
                width: 35,
                borderRadius: 35
            }}/>
        </div>
    )
}

export default SearchBar