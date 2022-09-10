import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




const List = ({loveSong, plusIcon, removeIcon}) => {
    
    
    const [flag, setFlag] = useState(true);
    const navigate = useNavigate();
    
    const clickHendler = e =>{
        e.preventDefault();
        setFlag(!flag);
        const containerListElement = document.querySelector(".containerList")
        document.querySelector(".containerListSong__Button").classList.toggle("containerListSong__Button--Active");
        containerListElement.classList.toggle("containerList--Active");
        var childNodesList = document.getElementsByTagName('ul')[0].childNodes;
        flag ? containerListElement.style["max-height"] = `${100+(17 * childNodesList.length)}px` : containerListElement.style["max-height"] = `13px` 
        
        console.log(flag)
        for(let i = 0; i <= childNodesList.length - 1; i++){
            setTimeout(() =>{
                childNodesList[i].classList.toggle("element--Active");
            }, 500)
        }
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
                    {items}
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

