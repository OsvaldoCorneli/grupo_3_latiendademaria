module.exports = (sequelize, dataTypes) => {

    const alias = "payment"
    
    const cols = {
       id:{
        type: dataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
        user_id:{
        type: dataTypes.INTEGER,
        allowNull: false,
       },
        total:{
        type: dataTypes.DECIMAL(10,2),
        allowNull: false,
       },
        status:{
            type: DataTypes.ENUM('cancelado', 'completado', 'en_proceso', 'rechazado'),
        allowNull: false,
    }
   
    }
    
    const config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    
    
    
    
    const Payment = sequelize.define(alias, cols, config);
    
    
    return Payment
    };