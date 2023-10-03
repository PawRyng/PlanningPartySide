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
const { $where, findByIdAndUpdate } = require('./model/register');

//env

require('dotenv').config({ path: './Config/.env' });

//Middleware

const authorizationMid = require('./Middleware/authorization');
const {mongoConnection, mongoDisconnect} = require('./Middleware/db-connection');

app.use(mongoConnection);
app.use(cors());
app.use(express.json());
   


//routery

const userRouter = require('./Routers/userRouter')
const userPanelRouter = require('./Routers/userPanelRouter')
const adminPanelRouter = require('./Routers/adminPanelRouter')

app.use('/', userRouter);
app.use('/admin', authorizationMid, adminPanelRouter);
app.use('/user', authorizationMid, userPanelRouter);


    

    app.post("/searchData", async (req, res) => {
        const {id, type} = req.body;


        const query = await User.findById(id, type)
        
        console.log(query)
        
        if(type == "dates"){
            const datas = await User.find(date);
            res.json({result: datas})
        }
        else{
            res.json({result: query.length})
            
        }

    });
//db close
app.use(mongoDisconnect);
    
  app.listen("3001", ()=>{
      console.log("3001")
  })