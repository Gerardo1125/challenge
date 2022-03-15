import React from "react";
import './TaskCard.css'

const CardTags = props => {

    if(props.tag === 'IOS'){
        return(
            <p style={{background:"rgba(51,60,53,255)",
                padding: 8,
                width:80,
                borderRadius:5,
                color: 'rgba(110,178,82,255)',
                fontSize:15,
                textAlign:'center'
            }}>IOS</p>
        )
    }else if(props.tag === 'NODE_JS'){
        return(
            <p style={{background:"rgb(61, 135, 59,0.15)",
                padding: 8,
                borderRadius:5,
                width:80,
                textAlign:'center',
                fontSize:15,
                color:'rgba(61, 135, 59)'
            }}>NODE_JS</p>
        )
    }else if(props.tag === 'REACT'){
        return(
            <p style={{background:"rgba(6, 116, 232,0.15)",
                padding: 8,
                borderRadius:5,
                width:80,
                textAlign:'center',
                fontSize:15,
                color:'#098ff2'
            }}>REACT</p>
        )
    }else if(props.tag === 'RAILS'){
        return(
            <p style={{background:"rgb(255, 0, 0, 0.12)",
                padding: 8,
                borderRadius:5,
                width:80,
                textAlign:'center',
                fontSize:15,
                color:'rgb(255, 0, 0)'
            }}>RAILS</p>
        )
    }else if(props.tag === 'ANDROID'){
        return(
            <p style={{background:"rgba(62,60,54,255)",
                padding: 8,
                borderRadius:5,
                color:"rgba(225,177,83,255)",
                width:80,
                textAlign:'center',
                fontSize:15,
            }} 
            >ANDROID</p>
        )
    }

    return(
        <></>
        )
}

export default CardTags