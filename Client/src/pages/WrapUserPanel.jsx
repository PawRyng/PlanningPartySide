import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Head from "./userPanel/Head";
import LoveSong from "./userPanel/LoveSong";

import calendarIcon from "../Img/calendar.svg";
import clockIcon from "../Img/clock.svg";
import acceptIcon from "../Img/acceptIcon.svg";
import plusIcon from "../Img/plusIcon.svg"


import BCG from '../Img/BCG.svg';

import '../Styles/userPanel/userPanel.css'


const WrapUserPanel = () =>{
    
    const navigate = useNavigate();
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')



    const [state, setState]= useState({});
    const [name, setName] = useState("nieznany");
    const [date, setDate] = useState("966-01-01");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    let songs = [{
        title: "Bass Astral x Igo + Krzysztof Zalewski - Would",
        link: "https://www.youtube.com/",
    },
    {
        title: "Dawid Podsiadlo - Pastempomat",
        link: "https://www.youtube.com/",
    }
]
    useEffect( ()=>{     
        setLoading(true);
            fetch('http://localhost:3001/admin',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify({
                    id
                }),
            })
                .then(res =>{
                    if(res.status !== 200 ){
                        throw Error(res.status);
                    }
                    else{
                        return res.json()
                    }
                })
                .then(json => {
                    
                    if(json.status != "OK"){
                        navigate("/")
                    }
                    else{
                        setState(json.userData)
                        setName(json.userData.name.split(" ")[0])
                        setDate(json.userData.date.split("T")[0])
                        setLoading(false);
                    }             
                })
                .catch(err =>console.log(err))
       

            
    }, []);


    return (<>
        <Head name = {name} data = {date} time = {state.time} calendarIcon = {calendarIcon} clockIcon = {clockIcon}/>
        <LoveSong loveSong = {songs} acceptIcon = {acceptIcon} plusIcon = {plusIcon}/>
        
        </>
    )
}

export default WrapUserPanel;