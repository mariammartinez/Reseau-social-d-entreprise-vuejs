const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');



exports.signup = (req, res, next) =>{
 
 bcrypt.hash(req.body.password, 10)
    .then(hash => {
     const user = new req.model.User({
         name: req.body.name,
         lastName: req.body.lastName,
         email: req.body.email,
         password: hash
     })

    user.save()
        .then(()=> res.status(201).json({message:"Utilisateur crée!"}))
        .catch(error => {res.status(500).json({error})   
     });
     
    })
    .catch(error => {res.status(500).json({error});
    })  
};


exports.login = (req, res, next) =>{
    req.model.User.findOne({where: {email: req.body.email}})
    .then(user => {
        if(!user){
            return res.status(401).json({ error:'utilisateur non trouvé' })
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid){
                    return res.status(401).json({ error:'mot de passe non trouvé' })
                }
                res.status(200).json({
                    userId:user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}))};


    exports.deleteUser = (req, res, next) =>{
        req.model.User.findOne({where:{id: req.params.id}})
            .then((user) => { 
                if(req.userId == req.params.id){
                    user.destroy() 
                    .then(() => res.status(200).json({ message: 'user supprimé'}))
                    .catch(error => res.status(400).json({ error }));
                }else{
                    res.status(400).json({ message: 'error' })
                }
            })
    };