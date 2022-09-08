
import { useState, useEffect } from "react";
import { NavLink, Routes , Route, useNavigate} from "react-router-dom";




const ChangePass = () =>{
    const [newPass, setNewPass] = useState("");
    const navigate = useNavigate();
    const [status, setStatus] = useState();

    useEffect( ()=>{        
      fetch('http://localhost:3001/auth',{
          method:"POST",
          headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${localStorage.getItem('token')}`, 
    },
    body: JSON.stringify({
      id: localStorage.getItem('id'),
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
            if(json.status != "OK"){
              navigate('/')
            }
          })
          .catch(err =>console.log(err))
  })


  const sendData = e=>{
    e.preventDefault();
    if(newPass.length <= 4)
    {
      sessionStorage.setItem("newError", true)
    }
    else{
      sessionStorage.removeItem("newError");
      
      fetch('http://localhost:3001/changeData',{
              method:"POST",
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${localStorage.getItem('token')}`, 
              },
              body: JSON.stringify({
                id: window.localStorage.getItem('id'),
                password:newPass
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
                if(json.status === "OK"){
                  console.log(json)
                  localStorage.removeItem("typeLogin")
                  navigate("/userPanel")
                  alert(json.status)
                }
                else if(json.status != "OK"){
                  alert(json.status)
                  console.log("nie ok")
                  navigate("/")
                  sessionStorage.clear();
                }

              })
              .catch(err =>console.log(err))
    }
      
  }
    
    
    
    const hangePass = e => {
      e.preventDefault();
      setNewPass(e.target.value)
}




    return (
        <>
        <form onSubmit={sendData}>
          <p>hasło</p>
          <input type="text" name="pass" onChange={hangePass} value={newPass}/>
          {sessionStorage.getItem("newError") && <p>za krókie</p>}
        <input type="submit" value="Dalej" />
        </form>
        </>
      );
}
export default ChangePass