const SeqLibrary = require("sequelize");

const connect =

{
    DATABASE: 'delilah',
    DIALECT: 'mysql',
    HOST: 'localhost',
    PASSWORD: '',
    USERNAME: 'root'
}


const sequelize = new SeqLibrary(connect.DATABASE, connect.USERNAME, connect.PASSWORD, {
    host: connect.HOST,
    dialect: connect.DIALECT,
});

sequelize.authenticate().then(() => {
    console.log("Conectado a la base de datos");
}).catch(err => {
    console.error("Error de conexion" + err);
});

const jwt = require('jsonwebtoken');
const firm = "MyFirm1234";

const DMY = new Date();
const currentDate = DMY.getUTCFullYear() +"/"+ (DMY.getUTCMonth()+1) +"/"+ DMY.getUTCDate() + " " + DMY.getUTCHours() + ":" + DMY.getUTCMinutes() + ":" + DMY.getUTCSeconds();


module.exports = { sequelize, jwt, firm, currentDate };
