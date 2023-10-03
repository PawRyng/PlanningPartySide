const User = require('../model/register');

module.exports = {
    register: async (req, res) => {
        
        try{
            await User.create({
                login: req.body.login,
            })
            res.json(req.body)
        } catch (err) {
            res.json({ status: 'error', error: 'Duplicate email' })
        }
    },
    login:async (req, res) => {
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
    }
}