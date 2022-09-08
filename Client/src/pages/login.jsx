import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


//img's
import Logo from '../Img/logo_bogas2_BIAE.png';
import Person from '../Img/personIcon.svg';
import PasswordIcon from '../Img/passwordIcon.svg';
import AlertIcon from '../Img/Allert.svg';
import FacebookIcon from '../Img/facebookIcon.svg';
import BCG from '../Img/BCG.svg';

//css

import '../Styles/Login.css';



const Login = () =>{

    const [test, setTest] = useState({name: "", pass:""});
    const [status, setStatus]= useState();
    const navigate = useNavigate(); 

    useEffect(()=>{
        if(localStorage.getItem("isLogin") === "true"){
         navigate("/userPanel")   
        }
    })


    const send = ()=>{
        fetch('http://localhost:3001/login',{
            method:"POST",
            headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				login: test.name,
				password: test.pass
			}),
        })
            .then(res =>{
                if(res.status !== 200 ){
                    throw Error(res.status);
                }
                else{
                    return res.json();
                }
            })
            .then(json => {
                console.log(json.status)
                if(json.status === "OK"){                    
                    window.localStorage.setItem("isLogin", true)
                    window.localStorage.setItem("token", json.token)
                    window.localStorage.setItem("id", json.id)
                    navigate('/userPanel')     
                }
                else if(json.status === "firstlogin"){
                    navigate('/changeData')
                    window.localStorage.setItem("token", json.token)
                    window.localStorage.setItem("typeLogin", "firstLogin")
                    window.localStorage.setItem("id", json.id)
                }
                else{               
                    setStatus(json.error);
                    window.localStorage.setItem("isLogin", false)
                }
            })
            .catch(err =>console.log(err))
    }

    const submitHandler = e =>{
        e.preventDefault();
        if(test.name.length != 0){ 
            send();
            navigate('/')
        }
        else{
            setStatus("Empty login field")
        }
    }

    const hangeHendler = e =>{
        let {name, value} = e.target;
        setTest({...test, [name]:value});
    }

    

    return (
        <>
        <div>
            <img src={BCG} className = "App__Bcg" />
        </div>
        
        <div className="App__flex App__flex--Logo">
            <img src={Logo} className = "App__Logo" />
        </div>
        <form onSubmit={submitHandler} className= "App__flex App__flex--Form">
            <div className="container">
                <img src={Person} />
                <input className="App__Imput" type="text" name="name" onChange={hangeHendler} placeholder="Login" value = {test.name}/>
            </div>
            <div className="container">
                <img src={PasswordIcon} />
            <input className="App__Imput" type="password" name="pass" id="" placeholder="Hasło" onChange={hangeHendler}/>
            </div>
            {status ? <label className = "App__alert"><img src={AlertIcon}/>{status}</label>: <label> </label>}
            <input className="App__ImputButtom App__ImputButtom--Input" type="submit" value="Zaloguj" />
        </form>
        <div className = "App__containerJoin">
            <p className = "App__text">Napisz do nas aby uzyskać dostęp</p>
            <button className = "App__ImputButtom App__ImputButtom--Facebook"><img src= {FacebookIcon}/> Facebook</button>
        </div>
        </>
      );
}
export default Login;