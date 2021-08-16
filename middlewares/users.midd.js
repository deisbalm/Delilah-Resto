const userServices = require('../services/users.services');
const { jwt, firm } = require("../config/config.js");

function validateData(req, res, next) {

    console.log("Validando Datos Completos del Usuario");

    const { usuario, nombre, apellido, email, contrasena, telefono, domicilio } = req.body;

    if (!usuario || !nombre || !apellido || !email || !contrasena || !telefono || !domicilio) {

        res.status(400).json({
            error: `Datos Incompletos !`
        });

    } else {

        next();

    }

}


async function validateExistingUser(req, res, next) {

    const userServices = require('../services/users.services');

    console.log("Validando Usuario");

    const consultaUsuario = await userServices.buscarUsuario(req.body);

    console.log("Usuario encontrado : ", consultaUsuario);

    if (consultaUsuario.length > 0) { res.status(409).json(`El usuario ${req.body.usuario} ya existe en la base de datos`); }

    else { next(); }

}


function Admin(req, res, next) {

    const { jwt, firm } = require("../config/config.js");

    console.log("Validando si el usuario es Administrador");

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {

        res.status(401).json({ Error: "Token Invalido" });


    } else {

        const verificar = jwt.verify(token, firm)

        if (verificar.admin == 1) { next(); }
        else { res.status(401).json({ Error: "Token Invalido" }); }

    }


}

module.exports = { validateData, validateExistingUser, Admin };
