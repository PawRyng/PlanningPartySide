import { useState, useEffect } from "react";
import { NavLink, Routes , Route, useNavigate} from "react-router-dom";
import Login from "./login";
import UserPanel from "./UserPanel";
import ChangePass from './change/changePass';
import ChangeData from './change/changeData';
import ChangeName from './change/changeName';
import ChangeTime from './change/changeTime';
import ChangeType from './change/changeType';
 


const Test = () =>{
    const [isLogin, setIsLogin] = useState();
    const navigate = useNavigate();
    
  useEffect(()=>{
    // setIsLogin(window.localStorage.getItem("isLogin"))
  })
  const logOutHandler = ()=>{
    window.localStorage.clear()
    window.localStorage.setItem("isLogin", false)
    navigate('/')
  }

    return (
        <div className="App">
          
          {(isLogin === "true") && 
          <div>
          <button onClick={logOutHandler}>LogOut</button>
          </div>
          
          } 
          
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/userPanel" element={<UserPanel />} />
            <Route path="/changePass" element={<ChangePass />} />
            <Route path="/changeName" element={<ChangeName />} />
            <Route path="/changeData" element={<ChangeData />} />
            <Route path="/changeTime" element={<ChangeTime />} />
            <Route path="/changeType" element={<ChangeType />} />
          </Routes>
    </div>
      );
}
export default Test;