module.exports = (sequelize, dataTypes) => {

    const alias = "Cart"
    
    const cols = {
        user_id:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_color_id:{
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
    Cart.removeAttribute('id')


    return Cart
    };