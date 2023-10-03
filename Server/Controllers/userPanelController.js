module.exports = {
    addLoveSong:  async (req, res) => {
        const {IdUser, TitleNewSong, LinkNewSong} = req.body;

        const {_id, LoveSong} = await User.findById(IdUser, "LoveSong")

        let flag = false;
        LoveSong.map(Song =>{

            let {Title, Link} = Song
            console.log(Title)

            if(Title == TitleNewSong || flag){
                flag = true;
            } 
            
        })

        if(flag){
            res.json({status: "This song is in DB"})
        }
        else{
            User.findByIdAndUpdate(IdUser, {$push: {LoveSong: [{
                Title: TitleNewSong,
                Link: LinkNewSong
            }]}}, err => console.log(err))
            const LoveSongs = await User.findById(IdUser, "LoveSong")
            res.json({status: "OK", LoveSongs});
        }


    },
    addBadSong: async (req, res) => {
        const {IdUser, TitleNewSong, LinkNewSong} = req.body;

        const {_id, BadSong} = await User.findById(IdUser, "BadSong")
        let flag = false;
        BadSong.map(Song =>{
            
            let {Title, Link} = Song
            console.log(Title)
            
            if(Title == TitleNewSong || flag){
                flag = true;
            } 
            
        })
        
        if(flag){
            res.json({status: "This song is in DB"})
        }
        else{
            User.findByIdAndUpdate(IdUser, {$push: {BadSong: [{
                Title: TitleNewSong,
                Link: LinkNewSong
            }]}}, err => console.log(err))
            const BadSongs = await User.findById(IdUser, "BadSong")
            res.json({status: "OK", BadSongs});
        }


    },
    removeLoveSong: async (req,res) =>{
        const {IdUser, titleSong} = req.body;
        let newArray = []
        const LoveSongs = await User.findById(IdUser)
        LoveSongs.LoveSong.filter(title => {
            if(title.Title !== titleSong){
                newArray.push(title)
            }
            
        });

        if(LoveSongs.LoveSong.length === newArray.length){
            res.json({status:"This song is not in db"});
        }
        else{
            User.findByIdAndUpdate(IdUser, {$set: {LoveSong : newArray}}, err =>{
                err ? res.json({status:"Error in update array to db"}).status(500) : res.status(200).json({status:"OK"});
            })
        }
                
    
        },
       removeBadSong: async (req,res) =>{
            const {IdUser, titleSong} = req.body;
            let newArray = []
            const BadSongs = await User.findById(IdUser)
            BadSongs.BadSong.filter(title => {
                if(title.Title !== titleSong){
                    newArray.push(title)
                }
                
            });
    
            if(BadSongs.BadSong.length === newArray.length){
                res.json({status:"This song is not in db"});
            }
            else{
                User.findByIdAndUpdate(IdUser, {$set: {BadSong : newArray}}, err =>{
                    err ? res.json({status:"Error in update array to db"}).status(500) : res.status(200).json({status:"OK"});
                })
            }
        },
        changeData:  async (req, res) => {
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
    
        },
        auth: async (req, res) => {
            res.json({status:"OK"})        
        }
        
}