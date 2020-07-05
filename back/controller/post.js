exports.createPost = (req,res,next) => {
    const post = new req.model.Post({
      ...req.body
    });
    post.setUser(1)
    post.save()
      .then(() => res.status(201).json({ message: 'Post enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) =>{
    req.model.Post.findOne({_id: req.params.id})
    .then((post) => {
        console.log(post)
        post.title = req.body.title
        console.log(post)
        post.save()
        .then(() => res.status(200).json({ message: 'Post modifié !'}))
        .catch(error => res.status(400).json({ error }));
    })
};

exports.deletePost = (req, res, next) =>{
    req.model.Post.findOne({_id: req.params.id})
    .then((post) => {
         post.destroy()
        .then(() => res.status(200).json({ message: 'Post supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    })
};
 

exports.getAllPost = (req, res, next) => {
    req.model.Post.findAll()
    .then(data => {
        data[0].getUser()
            .then(user => {
                res.status(200).send({msg:'ok'})
                console.log(user);
            }) 
            .catch(error => res.status(404).json({ error }));
    });
}
//demander a matthias
exports.getOnePost = (req, res, next) => {
    req.model.Post.findOne({ _id: req.params.id })
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}