module.exports = (sequelize, dataTypes) => {

    const alias = "products"
    
    const cols = {
       id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       name:{
        type: dataTypes.STRING(50),
        allowNull: false
       },
    //    category_id: {
    //     type: dataTypes.INTEGER,
    //     allowNull: false
    //    },
       description:{
        type: dataTypes.STRING(128),
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
        //tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    
    
    
    
    const Products = sequelize.define(alias, cols, config);
    
    Products.associate = function(models) {
        Products.belongsTo(models.categories, {
            as: 'categories',
            foreignKey: "category_id",
            timestamps: false,
            through: {attributes: []}
        })
        Products.belongsToMany(models.colors, {
            as: 'colors',
            through: models.product_colors,
            foreignKey: 'product_id',
            otherKey: 'color_id',
        })
        Products.hasMany(models.product_colors, {
            as: 'product_colors',
            foreignKey: 'product_id'
        })
        Products.belongsToMany(models.images,{
            as: 'images',
            through: models.prod_images,
            foreignKey: 'product_id',
            otherKey: 'image_id'
        })
    }
    
    return Products
    } ;