module.exports = (sequelize, dataTypes) => {

    const alias = "colors"
    
    const cols = {
       id:{
        type: dataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       name:{
        type: dataTypes.STRING(30),
        allowNull: true,
       },
       hex:{
        type: dataTypes.STRING(6),
        allowNull: true,
       }
   
    }
    
    const config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    
    
    
    
    const Colors = sequelize.define(alias, cols, config);
    
    
    return Colors
    };