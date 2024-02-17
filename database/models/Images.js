module.exports = (sequelize, dataTypes) => {

    const alias = "images"
    
    const cols = {
       id:{
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       pathName:{
        type: dataTypes.STRING(255),
        allowNull: true,
       }
    }
    
    const config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    
    
    const Images = sequelize.define(alias, cols, config);
    
    Images.associate = function (models) {
        Images.belongsToMany(models.products, {
            as: 'products',
            through: models.prod_images,
            foreignKey: 'image_id',
            otherKey: 'product_id'
        })
    }
    
    return Images
    };