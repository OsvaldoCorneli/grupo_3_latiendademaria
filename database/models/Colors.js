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
 
    Colors.associate = function(models) {
        Colors.belongsToMany(models.products, {
            as: 'products',
            through: models.product_colors,
            foreignKey: 'color_id',
            otherKey: 'product_id'
        })
        Colors.hasMany(models.product_colors, {
            as: 'product_color',
            foreignKey: 'color_id'
        })
    }
    
    
    return Colors
    };