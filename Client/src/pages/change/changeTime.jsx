import { useState, useEffect } from "react";
import { NavLink, Routes , Route, useNavigate} from "react-router-dom";




const ChangeTime = () =>{
    const [time, setTime] = useState();
    const navigate = useNavigate();
    
    const data = new Date();

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

          fetch("http://localhost:3001/searchData", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: localStorage.getItem('id'),
          type: "time"
        })
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
    if(!localStorage.getItem("typeLogin")){
      setTime(json.result)
    }
    
  })
  .catch(err =>console.log(err))



  })

  const sendData = e=>{
    e.preventDefault()       
        if(time)
        {
            fetch('http://localhost:3001/changeData',{
              method:"POST",
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${localStorage.getItem('token')}`, 
              },
              body: JSON.stringify({
                id: window.localStorage.getItem('id'),
                time
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
                    navigate("/changeName")
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



   
            
        

    
  



const hange = e => {
  e.preventDefault();
  setTime(e.target.value)
}




    return (
        <>
        <form onSubmit={sendData}>
          <input type="time" onChange={hange} name="date" value={time} />
        <input type="submit" value="Dalej" />
        </form>
        </>
      );
}
export default ChangeTime