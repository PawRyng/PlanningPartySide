import { useState, useEffect } from "react";
import { NavLink, Routes , Route, useNavigate} from "react-router-dom";




const ChangeData = () =>{
    
    const [status, setStatus] = useState();
    const navigate = useNavigate();
    const [newDate, setNewDate] = useState();
    const data = new Date();

    
  const test = () => {
    fetch("http://localhost:3001/searchData", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: localStorage.getItem('id'),
          type: "date"
        })
    })
    console.log(test)
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
      setNewDate(json.result)
      console.log("here")
    }
    
    })
    .catch(err =>console.log(err))
  } 
  

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
        if(newDate.length === 10)
        {
            fetch('http://localhost:3001/changeData',{
              method:"POST",
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${localStorage.getItem('token')}`, 
              },
              body: JSON.stringify({
                id: window.localStorage.getItem('id'),
                date: newDate,
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
                    navigate("/changeTime")
                  }
                  else{
                    navigate("/userPanel")
                  }

                  alert(json.status)
                }
                else if(json.status === "BUSY"){
                  setStatus(true)
                }
                else{
                  alert(json.status)
                  console.log("nie ok")
                  navigate("/")
                  sessionStorage.clear();
                  localStorage.clear()

                }

              })
              .catch(err =>console.log(err))

            }
            

}



   
            
        

    
  



const hange = e => {
  e.preventDefault();
  setNewDate(e.target.value)
}




    return (
        <>
        <form onSubmit={sendData}>
          <input type="date" min = {data.toISOString().split('T')[0]} value={data.toISOString().split('T')[0]}  onChange={hange} name="date" value={newDate} />
          {status && <label className = "App__alert">termin zajęty</label>}
        <input type="submit" value="Dalej" />
        </form>
        </>
      );
}
export default ChangeData