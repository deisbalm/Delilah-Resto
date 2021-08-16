const pedidosServicios = require('../services/orders.serv.js');

function validateData(req, res, next) {

    console.log("Validando Datos del Pedido");

    const { total, id_usuario, productos } = req.body;

    if (!total || !id_usuario || !productos) {

        res.status(400).json({
            error: `Datos Incompletos!`
        });

    } else {

        next();

    }

}

async function existePedido(req, res, next) {

    console.log("Validando Existencia del Pedido");

    const id_pedido = req.body.id_pedido

    const existe = await pedidosServicios.existingOrder(id_pedido);
    console.log("existe :", existe.length)
    if (existe.length == 0) {

        res.status(400).json({
            error: `El Pedido No existe!`
        });

    } else {

        next();

    }

}


module.exports = { validateData, existePedido};