const Utils = require('../helpers/utils');
const utils = new Utils();

exports.createComment = (req,res,next) => {
 
      const comment = new req.model.Comment({
        ...req.body
      });
      comment.userId = req.userId
      comment.save()
        .then(() => {
            res.status(201).json({
                message: 'commentaire enregistré!',
                comment: {
                    id: comment.id,
                    date : utils.converDateToStr(comment.date),
                    text: comment.text,
                    userName: req.user.name + ' ' +  req.user.lastName,
                    userId: req.userId
                }
            })
        })
        .catch(error => res.status(400).json({ error }));
  };

  exports.deleteComment = (req, res, next) =>{ 
    req.model.Comment.findOne({
        where:{id: req.params.id},
        include: req.model.Post
    })
        .then((comment) => {
            if(comment.userId == req.userId || comment.Post.userId == req.userId){ 
                comment.destroy()
                .then(() => res.status(200).json({ message: ' ok '}))
                .catch(error => res.status(400).json({ error }));
            }else{
                res.status(400).json({ message: 'error' })
            }
        })
};

exports.getAllComment = (req, res, next) => {
    req.model.Comment.findAll({ 
        //reparer le where, chercher l'id du post
        where:{postId: req.params.id}, 
        order:[
            ['date', 'DESC']
        ], include: [req.model.User]
    })
    .then(data => {
        let allComments = []

        for(let comment of data){
            
            let returnComment ={
                id: comment.id,
                date : utils.converDateToStr(comment.date),
                text: comment.text,
                userName: comment.User.name + ' ' +  comment.User.lastName,
                userId: comment.userId
            } 
          allComments.push(returnComment);
        }
        res.status(200).send({comments:allComments})
    })
    .catch(error => res.status(400).json({ error }));
}