module.exports = (sequelize, dataTypes) => {

    const alias = "Cart"
    
    const cols = {
        user_id:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        color_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity:{
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        }
    }
    
    const config = {
        timestamps: false,
        tableName: 'cart',
    }
    
    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(models) {
        Cart.belongsTo(models.Products, {
            as: 'product',
            foreignKey: 'product_id'
            //otherKey: 'product_id'
        }),
        Cart.belongsTo(models.Colors, {
            as: 'color',
            foreignKey: 'color_id',
        })
    }
    return Cart
    };