//convertir un objet DATE en string (dd/mm/yyyy hh/mm) 
function converDateToStr(d){
    let day = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    if(minutes < 10 ){
        minutes = '0' + minutes        
    }
    if(hour < 10 ){
        hour = '0' + hour        
    }
    if(month < 10 ){
        month = '0' + month        
    }   
    if(day < 10 ){
        day = '0' + day        
    }
    return day+'/'+month+ '/'+year+' '+hour+':'+minutes;
}
//convertir un objet DATE en string (dd/mm/yyyy hh/mm) 
function converDateToStr(d){
    let day = d.getDate();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    if(minutes < 10 ){
        minutes = '0' + minutes        
    }
    if(hour < 10 ){
        hour = '0' + hour        
    }
    if(month < 10 ){
        month = '0' + month        
    }   
    if(day < 10 ){
        day = '0' + day        
    }
    return day+'/'+month+ '/'+year+' '+hour+':'+minutes;
}

exports.createComment = (req,res,next) => {
 
      const comment = new req.model.Comment({
        ...req.body
      });
      comment.userId = req.userId
      comment.save()
        .then(() => res.status(201).json({ message: 'commentaire enregistré!'}))
        .catch(error => res.status(400).json({ error }));
  };

  exports.deleteComment = (req, res, next) =>{ console.log('coco');
      
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

exports.getAllComment = (req, res, next) => {console.log("req.params.postId");
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
                date : converDateToStr(comment.date),
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