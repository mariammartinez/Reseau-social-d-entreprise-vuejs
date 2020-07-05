const Sequelize = require('sequelize');
const { BelongsTo } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    let post = sequelize.define('Post', {
        // Model attributes are defined here
          text: {
              type: DataTypes.STRING
          },
          title: {
              type: DataTypes.STRING
          },
          date:{
              type: DataTypes.DATE,
              defaultValue: Sequelize.NOW
          },
          image: {
            type: DataTypes.STRING
        }
      }, {
        timestamps: false,
        tableName: 'post'
    });


    return post;
};
