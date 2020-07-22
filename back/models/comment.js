const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    let comment = sequelize.define('comment', {
        // Model attributes are defined here
          text: {type: DataTypes.STRING},
          date: {type: DataTypes.DATE, 
          defaultValue: Sequelize.NOW},
    }, 
      {
        timestamps: false,
        tableName: 'comment'
    });


    return comment;
};
