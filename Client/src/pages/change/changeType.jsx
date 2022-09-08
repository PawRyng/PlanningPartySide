
import { useState, useEffect } from "react";
import { NavLink, Routes , Route, useNavigate} from "react-router-dom";




const ChangeType = () =>{
    const [type, setType] = useState("");
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
    e.preventDefault()       
        if(type.length != 0)
        {
            fetch('http://localhost:3001/changeData',{
              method:"POST",
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${localStorage.getItem('token')}`, 
              },
              body: JSON.stringify({
                id: window.localStorage.getItem('id'),
                type
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
                  if(localStorage.getItem("typeLogin")){
                    navigate("/changePass")
                  }
                  else{
                    navigate("/userPanel")
                  }

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
        else{
            console.log("brak")
        }
            

}

  
    
    
    
    const hangeType = e => {
      e.preventDefault();
      setType(e.target.value)
}




    return (
        <>
        <form onSubmit={sendData}>
          
          <p>typ imprezy</p>
          <input type="text" name="type" onChange={hangeType} value={type}/>
        <input type="submit" value="Dalej" />
        </form>
        </>
      );
}
export default ChangeType