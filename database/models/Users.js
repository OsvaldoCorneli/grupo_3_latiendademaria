module.exports = (sequelize, dataTypes) => {

const alias = "users"

const cols = {
   id:{
    type: dataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
   },
   nombre:{
    type: dataTypes.STRING(30),
    allowNull: false,

   },
   apellido:{
    type: dataTypes.STRING(30),
    allowNull: false,
   },
   provincia:{
    type: dataTypes.STRING(128),
    allowNull: true,
   },
   localidad:{
    type: dataTypes.STRING(128),
    allowNull: true,
   },
   codigoPostal:{
    type: dataTypes.INTEGER,
    allowNull: true,
   },
   calle:{
    type: dataTypes.STRING(50),
    allowNull: true,
   },
   calleNumero:{
    type: dataTypes.INTEGER,
    allowNull: true,
   },
   imagen:{
    type: dataTypes.STRING(255),
    allowNull: true,
   },
   piso:{
    type: dataTypes.STRING(10),
    allowNull: true,
   },
   departamento:{
    type: dataTypes.STRING(10),
    allowNull: true,
   },
   userName:{
    type: dataTypes.STRING(20),
    allowNull: false,
    unique: true,
   },
   email:{
    type: dataTypes.STRING(60),
    allowNull: false,
    unique: true,
   },
   password:{
    type: dataTypes.STRING(128),
    allowNull: false,
   },
   fechaNacimiento:{
    type: dataTypes.DATE,
    allowNull: true,
   },
   admin:{
    type: dataTypes.BOOLEAN,
    allowNull: true,
   }


   
}

const config = {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: false
}

const User = sequelize.define(alias, cols, config);


return User
} ;