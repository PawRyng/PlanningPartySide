import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




const List = ({badSong, plusIcon, removeIcon}) => {
    
    const [listMusic, setListMusic] = useState(badSong);
    const [flag, setFlag] = useState(true);
    const navigate = useNavigate();
    
    
    const clickHendler = e =>{
        e.preventDefault();
        setFlag(!flag);
            const containerListElement = document.querySelector(".containerBadList")
            document.querySelector(".containerListBadSong__Button").classList.toggle("containerListBadSong__Button--Active");
            containerListElement.classList.toggle("containerBadList--Active");
            var childNodesList = document.getElementsByTagName('ul')[1].childNodes;
            flag ? containerListElement.style["max-height"] = `${100+(30 * childNodesList.length)}px` : containerListElement.style["max-height"] = `13px`
         
        
        for(let i = 0; i <= childNodesList.length - 1; i++){
            setTimeout(() =>{
                childNodesList[i].classList.toggle("element--Active");
            }, 500)
        }
    }
    const removeHendler = songTitle =>{
        
        window.location.reload();
        fetch('http://localhost:3001/removeBadSong',{
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
    const items = badSong.map((song, index) =>
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
        
        <div className="containerListBadSong">
            <div className="containerBadList">
                <ul>
                    {items.length > 0 ? items : <h2>Brak piosenek </h2> }
                </ul>
            </div>
            <div className="containerListBadSong__Button" >
                <img onClick = {clickHendler} src={plusIcon}/>
            </div>

        </div>
        
    
        
        
</>
    )
}

// PlanningPartySide
// This is a page to easier communication DJ with organisator event




export default List;

