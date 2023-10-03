module.exports = {
    admin:  async (req, res) => {
        const {id} = req.body;
        
        try{
            const userData = await User.findById(id)
            userData ? res.json({status: "OK" , userData}) : res.json({status: "error"});
        }
        catch{
            res.json({ status: 'Bad ID' })
        }
    }
}