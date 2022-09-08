import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SongList from "./ListLoveSong";


const LoveSong = ({loveSong, acceptIcon, plusIcon}) => {
    
    const navigate = useNavigate();
    const [song, setSong] = useState({Title: "", Link:""});; 
    const sendSong = e =>{
        e.preventDefault();
        console.log(song)
    }
    const hangeHendler = e =>{
        let {name, value} = e.target;
        setSong({...song, [name]:value});
    }

    return (<>
        <h2>Piosenki które musimy zagrać:</h2>

        <div className="containerSong">
            <div className="containerSong__Form">
                <input onChange={hangeHendler} placeholder="Nazwa" name="Title" type="text" />
                <input onChange={hangeHendler} placeholder="Link" name="Link" type="text" />
            </div>
            <div className="containerSong__Icon">
                <img onClick = {sendSong} src={acceptIcon} />
            </div>
        </div>
        <SongList loveSong = {loveSong} plusIcon = {plusIcon}/>
    
        
        
</>
    )
}

export default LoveSong;