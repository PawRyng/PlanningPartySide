import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SongList from "./ListBadSong";


const BadSong = ({badSong, acceptIcon, plusIcon, removeIcon}) => {
    
    const navigate = useNavigate();

    const [song, setSong] = useState({Title: "", Link:""});
    const [listSong, setListSong] = useState(badSong)
    const [error, setError] = useState(false) 
    const sendSong = e =>{
        // e.preventDefault();
        if(song.Title.length == 0){
            setError(true)

        }else{
            setListSong([...listSong, song]);
            fetch('http://localhost:3001/BadSongAdd',{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem("token")}`, 
                    },
                    body: JSON.stringify({
                        IdUser: localStorage.getItem("id"),
                        TitleNewSong: song.Title,
                        LinkNewSong: song.Link
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
                        badSong = json.badSong;
                        window.location.reload();
                        console.log(badSong)         
                    })
                    .catch(err =>console.log(err))
                    navigate("/userPanel")
        }
    }
    const hangeHendler = e =>{
        let {name, value} = e.target;
        setSong({...song, [name]:value});
    }

    return (<>
        <h2>Piosenki których nie grać:</h2>

        <div className="containerSong">
            <div className="containerSong__Form">
                <input onChange={hangeHendler} placeholder="Nazwa" name="Title" type="text" />
                <input onChange={hangeHendler} placeholder="Link" name="Link" type="text" />
            </div>
            <div className="containerSong__Icon">
                <img onClick = {sendSong} src={acceptIcon} />
            </div>
        </div>
        <SongList badSong = {badSong} plusIcon = {plusIcon} removeIcon = {removeIcon}/>
    
        
        
</>
    )
}

export default BadSong;