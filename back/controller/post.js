const Utils = require('../helpers/utils')();

exports.createPost = (req,res,next) => { 
    const post = new req.model.Post({   
      ...req.body,
    });
    if(typeof req.file != "undefined"){
        post.image= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    post.setUser(req.userId)
    post.save()
    .then(() => { 
        res.status(201).json({
            message: 'Post enregistré !',
            post: {
                id: post.id,
                date : Utils.converDateToStr(post.date),
                title : post.title,
                text: post.text,
                img: post.image,
                userName: req.user.name + ' ' +  req.user.lastName,
                userId: req.userId
            }
        })
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error })
    });
};
//a enlever
exports.modifyPost = (req, res, next) =>{
 
    req.model.Post.findOne({where:{id: req.params.id}})
    .then((post) => { console.log(post)
        post.title = req.body.postTitle;
        post.text = req.body.postText;
        post.save()
        .then(() => res.status(200).json({ message: 'Post modifié !'}))
        .catch(error => res.status(400).json({ error }));
    }) 
};

exports.deletePost = (req, res, next) =>{
    req.model.Post.findOne({where:{id: req.params.id}})
        .then((post) => {     
            if(req.userId == post.userId || req.user.isAdmin == "1"){
                req.model.Comment.findAll({where:{postId: req.params.id}})
                .then((comments) => {
                    for ( let comment of comments){
                        comment.destroy()
                    }
                })
                post.destroy() 
                .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            }else{
                res.status(400).json({ message: 'error' })
            }
        })
};
 

exports.getAllPost = (req, res, next) => {
   
    req.model.Post.findAll({
        order:[
            ['date', 'DESC']
        ], include: [req.model.User]
    })
    .then(data => {
        let allPosts = []

        for(let post of data){
            console.log(post.isAdmin); 
            let returnPost ={
                id: post.id,
                date : converDateToStr(post.date),
                title : post.title,
                text: post.text,
                img: post.image,
                userName: post.User.name + ' ' +  post.User.lastName,
                userId: post.userId,
                isAdmin: post.isAdmin,  
            } 
          allPosts.push(returnPost);
        }
        res.status(200).send({posts:allPosts})
    });
}
//tester
exports.getOnePost = (req, res, next) => {
    req.model.Post.findOne({where: { _id: req.params.id }})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }));
}