const Sequelize = require('sequelize');
const db =  new Sequelize('mysql://mariam:mariamtest@localhost:3306/groupomania' );

// add entities here
const Model = {
    sequelize: db,
    User: require('./user')(db, Sequelize.DataTypes),
    Post: require('./post')(db, Sequelize.DataTypes)
}

Model.Post.belongsTo(Model.User, {
    foreignKey: 'userId'
})
Model.User.hasMany(Model.Post,{
    foreignKey: 'userId'
})

module.exports = Model;
