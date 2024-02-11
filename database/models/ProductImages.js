module.exports = (sequelize, dataTypes) => {

    const alias = "product_colors"
    
    const cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        color_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    
    const config = {
        tableName: 'product_colors',
        timestamps: false,
    }
    
    const ProductColors = sequelize.define(alias, cols, config);
    
    ProductColors.associate = function(models) {
        ProductColors.belongsTo(models.products, {
            as: "products",
            foreignKey: "product_id"
        })
        ProductColors.belongsTo(models.colors, {
            as: "color",
            foreignKey: "color_id"
        })
    }

    return ProductColors
    };