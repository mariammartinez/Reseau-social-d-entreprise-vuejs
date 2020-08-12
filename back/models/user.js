
module.exports = (sequelize, DataTypes) => {

    let user = sequelize.define('User', {
        // Model attributes are defined here
          name: {type: DataTypes.STRING},
          lastName: {type: DataTypes.STRING},
          email: {type: DataTypes.STRING, unique: true},
          password:{type: DataTypes.STRING},
          isAdmin:{type: DataTypes.NUMBER}
    }, 
      {
        timestamps: false,
        tableName: 'user'
    });

    return user;
};

