const express = require('express');
const { type } = require('os');
const app = express();
const router = express.Router();

var cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const User = require('./model/register');

const path = require('path');
const config = require('./config.json');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const ACCRESS_TOCKEN = config.JsonWebToken;



const authorisatiomMid = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.json({status:"brak tokenu", error: token});
    }
    
    jwt.verify(token, ACCRESS_TOCKEN, (err, data)=>{
        if(err){
            return res.json({status:"No access", tocken:token});
        }
        // console.log('autoryzacja')
        req.user = data;       

        next();

    })

}




app.use(cors());
app.use(express.json());

mongoose.connect(config.db);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once('open', function (){
    console.log("db connected");
});
   
//regiser
    app.post("/register", async (req, res) => {
        
        try{
            await User.create({
                login: req.body.login,
            })
            res.json(req.body)
        } catch (err) {
            res.json({ status: 'error', error: 'Duplicate email' })
        }
    });

   //login 
    app.post("/login", async (req, res) => {
        const {login, password} = req.body;
        const userLogin = await User.findOne({login})
        const userPassword = await User.findOne({login, password})
        if(userLogin){
            const token = jwt.sign(login, ACCRESS_TOCKEN); 
            if(userLogin.password === "firstLogin"){
                res.json({ status: 'firstlogin',id: userLogin.id, token})
            }
            else if(userPassword){
                res.json({status:"OK", id: userLogin.id, token});

            }
            else if(userPassword === null || userPassword === undefined){
                res.json({ status: 'error', error: 'Złe hasło' })
            }
            res.json({status: userPassword.password , id: userLogin.id, token});
        }
        else{
            res.json({ status: login, error: 'Zły login'  })
            
        }
    });

    //panel
    app.post("/admin", authorisatiomMid, async (req, res) => {
        const {id} = req.body;
        
        try{
            const userData = await User.findById(id)
            console.log(userData)
            userData ? res.json({status: "OK" , userData}) : res.json({status: "error"});
        }
        catch{
            res.json({ status: 'Bad ID' })
        }
    });
    app.post("/auth", authorisatiomMid, async (req, res) => {
        res.json({status:"OK"})        
    });

    app.post("/searchData", async (req, res) => {
        const data = await User.findById(req.body.id);
        const datas = await User.find(date);
        switch(req.body.type){
            case "date":
                res.json({result: data.date});
            case "time":
                res.json({result: data.time});
            case "dates":
                res.json({status: datas})
                

        }
        if(req.body.typeSerch){

        }

    });

    
    app.post("/changeData", authorisatiomMid ,async (req, res) => {
        const {id, password, date, time, name, type} = req.body
        if(password){
            await User.findByIdAndUpdate(id, { password}) 
            res.json({status:"OK" })
        }
        else if(date)
        {             

            if(await User.findOne({date})){
                res.json({status: 'BUSY' })
            }
            else{
                await User.findByIdAndUpdate(id, { date}) 
                res.json({status:"OK" })
            }
            // // res.json({status:"OK" })
        }
        else if(time){
            await User.findByIdAndUpdate(id, { time}) 
            res.json({status:"OK" })
        }
        else if(name){
            await User.findByIdAndUpdate(id, { name}) 
            res.json({status:"OK" })
        }
        else if(type){
            await User.findByIdAndUpdate(id, { type}) 
            res.json({status:"OK" })
        }

    });

    

    
  app.listen("3001", ()=>{
      console.log("3001")
  })