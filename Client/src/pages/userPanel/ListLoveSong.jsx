import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




const List = ({loveSong, plusIcon, removeIcon}) => {
    
    const [listMusic, setListMusic] = useState(loveSong);
    const [flag, setFlag] = useState(true);
    const navigate = useNavigate();
    
    
    const clickHendler = e =>{
        e.preventDefault();
        setFlag(!flag);
            const containerListElement = document.querySelector(".containerList")
            document.querySelector(".containerListSong__Button").classList.toggle("containerListSong__Button--Active");
            containerListElement.classList.toggle("containerList--Active");
            var childNodesList = document.querySelectorAll('ul')[0].childNodes;
            console.log(childNodesList)
            flag ? containerListElement.style["max-height"] = `${100+(30 * childNodesList.length)}px` : containerListElement.style["max-height"] = `13px`
         
        
        for(let i = 0; i <= childNodesList.length - 1; i++){
            setTimeout(() =>{
                childNodesList[i].classList.toggle("element--Active");
            }, 500)
        }
    }
    const removeHendler = songTitle =>{
        
        window.location.reload();
        fetch('http://localhost:3001/removeLoveSong',{
                    method:"DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem("token")}`, 
                    },
                    body: JSON.stringify({
                        IdUser: localStorage.getItem("id"),
                        titleSong: songTitle
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
                        console.log(json)         
                    })
                    .catch(err =>console.log(err))
        
        console.log(songTitle)
    }
    const items = loveSong.map((song, index) =>
        <div className="element" key={index}>
            <a href={song.Link} >
                <li  >{song.Title}</li>
            </a>
            <div onClick={() => removeHendler(song.Title)} className="element__deleteIconContainer">
                <img src={removeIcon} alt="" />
            </div>

        </div>
  );
  
    return (<>
        
        <div className="containerListSong">
            <div className="containerList">
                <ul>
                    {items.length > 0 ? items : <h2>Brak piosenek </h2> }
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

