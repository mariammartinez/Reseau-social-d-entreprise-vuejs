const Sequelize = require('sequelize');
const config =  require('./config.json');

const db =  new Sequelize('mysql://'+config.user+':'+config.password+'@localhost:3306/groupomania' );

// add entities here
const Model = {
    sequelize: db,
    User: require('./user')(db, Sequelize.DataTypes),
    Post: require('./post')(db, Sequelize.DataTypes),
    Comment: require('./comment')(db, Sequelize.DataTypes)
}

Model.Post.belongsTo(Model.User, {
    foreignKey: 'userId'
})
Model.User.hasMany(Model.Post,{
    foreignKey: 'userId',
    onDelete: 'cascade'
})
Model.Comment.belongsTo(Model.Post, {
    foreignKey: 'postId'
})
Model.Post.hasMany(Model.Comment,{
    foreignKey: 'postId',
    onDelete: 'cascade'
})
Model.Comment.belongsTo(Model.User, {
    foreignKey: 'userId'
})
Model.User.hasMany(Model.Comment,{
    foreignKey: 'userId',
    onDelete: 'cascade'

})

module.exports = Model;
