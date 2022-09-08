import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




const List = ({loveSong, plusIcon, removeIcon}) => {
    
    
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    
    const clickHendler = e =>{
        e.preventDefault();
        setFlag(!flag);
        document.querySelector(".containerListSong__Button").classList.toggle("containerListSong__Button--Active");
        document.querySelector(".containerList").classList.toggle("containerList--Active");
        setTimeout(()=>{
            document.querySelector(".element").classList.toggle("element--Active");

        }, 1000);
        // for(let i = 1; i>=loveSong.length; i++){
        //     setInterval(() =>{
        //         document.querySelector(`ul`)[i].classList.toggle("Active");
        //     }, 1000)
        // }
        var childNodes = document.getElementsByTagName('ul')[0].childNodes;
        console.log(childNodes.length)
    }

    const items = loveSong.map((song, index) =>
        <div className="element" key={index}>
            <a href={song.link} >
                <li  >{song.title}</li>
            </a>

        </div>
  );

  
    return (<>
        
        <div className="containerListSong">
            <div className="containerList">
                <ul>
                    {flag && items}
                </ul>
            </div>
            <div className="containerListSong__Button" >
                <img onClick = {clickHendler} src={plusIcon}/>
            </div>

        </div>
        
    
        
        
</>
    )
}

// PlanningPartySide
// This is a page to easier communication DJ with organisator event




export default List;

