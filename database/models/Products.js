module.exports = (sequelize, dataTypes) => {

    const alias = "Products"
    
    const cols = {
       id:{
        type: dataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       name:{
        type: dataTypes.STRING(50),
        allowNull: false,
    
       },
       description:{
        type: dataTypes.STRING(128),
        allowNull: true,
       },
       category_id:{
        type: dataTypes.INTEGER,
        allowNull: true,
       },
       line:{
        type: dataTypes.ENUM('artesanal', 'sublimada'),
        allowNull: false,
       },
       price:{
        type: dataTypes.DECIMAL(10,2),
        allowNull: false,
       }
   
    }
    
    const config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    
    
    
    
    const Products = sequelize.define(alias, cols, config);
    
    
    return Products
    } ;