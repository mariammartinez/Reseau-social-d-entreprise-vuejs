const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');



exports.signup = (req, res, next) =>{
    console.log(req.body);
 bcrypt.hash(req.body.password, 10)
 .then(hash => {
     const user = new req.model.User({
         name: req.body.name,
         lastName: req.body.lastName,
         email: req.body.email,
         password: hash
     })
     console.log(user);
     user.save()
     .then(()=> res.status(201).json({message:"Utilisateur crée!"}))
     .catch(error => {
         console.log(error);
        res.status(500).json({error})   
     });
     
 })
 .catch(error => {
     console.log(error);
    res.status(500).json({error});
 })
    
    
};


exports.login = (req, res, next) =>{
    User.findOne({email: req.body.email})
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
                    userId:user._id,
                    token : 'TOKEN'
                });
            })
            .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}))};