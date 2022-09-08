import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import WrapUserPanel from "./WrapUserPanel";



import BCG from '../Img/BCG.svg';

import '../Styles/userPanel/userPanel.css'


const UserPanel = () =>{
    const navigate = useNavigate();
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
                        setLoading(false);
                    }             
                })
                .catch(err =>console.log(err))
       

            
    }, []);


    return (<>
        
        {loading ? <h1>Loading...</h1>:(error ? <h1>Error!</h1> :
        (
        <WrapUserPanel />
        ))}
</>
    )
}

export default UserPanel;