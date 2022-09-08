import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




const Head = ({name, data, time, calendarIcon, clockIcon}) =>{
    
    const navigate = useNavigate();
    
    const onClickHandler = e =>{
        e.preventDefault();
        
        navigate(`/change${e.target.name}`);

    }

    return (<>
        <h1>Hej {name}!</h1>
        <div className="containerUserPanel">
            <div className="containerUserPanel__Flex">
                <h2>Data:</h2>
                <h3>{data}</h3>
            </div>
            <div className="containerUserPanel__Flex">
                <div className="containerUserPanel__buttonBcg">
                    <img onClick={onClickHandler} name = "Data" src= {calendarIcon} alt="" />
                </div>
            </div>


        </div>
        <div className="containerUserPanel">
            <div className="containerUserPanel__Flex">
                <h2>Godzina:</h2>
                <h3>{time}</h3>
            </div>
            <div className="containerUserPanel__Flex">
                <div className="containerUserPanel__buttonBcg">
                    <img onClick={onClickHandler} name = "Time" src= {clockIcon} alt="" />
                </div>
            </div>
        </div>
        <div className="containerUserPanel">
            <div className="containerUserPanel__Flex">
                <h2>Miejsce:</h2>
                <h3>Złota kaczka</h3>
            </div>
            <div className="containerUserPanel__Flex">
                <div className="containerUserPanel__buttonBcg">
                    <img onClick={onClickHandler} name = "Time" src= {clockIcon} alt="" />
                </div>
            </div>
        </div>
        
</>
    )
}

export default Head;