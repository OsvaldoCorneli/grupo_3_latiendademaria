module.exports = (sequelize, dataTypes) => {

    const alias = "product"
    
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
        type: DataTypes.ENUM('artesanal', 'sublimada'),
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
    
    
    
    
    const Product = sequelize.define(alias, cols, config);
    
    
    return Product
    } ;