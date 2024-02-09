module.exports = (sequelize, dataTypes) => {

    const alias = "cart"
    
    const cols = {
       id:{
        type: dataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       user_id:{
        type: dataTypes.INTEGER,
        allowNull: true,
    
       },
       total:{
        type: dataTypes.DECIMAL(10,2),
        allowNull: true,
       }
   
    }
    
    const config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    
    
    
    
    const Cart = sequelize.define(alias, cols, config);
    
    
    return Cart
    } ;