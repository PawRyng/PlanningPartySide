
const jwt = require('jsonwebtoken');

const authorizationMid = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.json({status:"brak tokenu", error: token});
    }
    jwt.verify(token, process.env.ACCRESS_TOCKEN , (err, data)=>{
        if(err){
            return res.json({status:"No access", tocken:token});
        }
        req.user = data;       

        next();

    });

}
module.exports = authorizationMid