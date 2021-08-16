const pedidosServicios = require('../services/orders.serv');
const { validateData, existePedido } = require('../middlewares/orders.midd.js');
const { Admin } = require('../middlewares/users.midd.js');
const { jwt, firm } = require("../config/config.js");

module.exports = (app) => {

    app.get("/v1/pedidos/", async (req, res) => {

        console.log("peticion GET a : /v1/pedidos/ ");

        console.log("Validando El tipo de Usuario");

        const token = req.headers.authorization.split(' ')[1];

        const verificar = jwt.verify(token, firm)

        if (verificar.admin == 1) { pedidos = await pedidosServicios.showOrder(req.body); }

        else { pedidos = await pedidosServicios.searchOrderForUser(verificar.id); }

        try {

            const listadoPedidos = await pedidosServicios.listadoPedidos(pedidos);

            res.status(200).json(listadoPedidos);

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/v1/pedidos/", validateData, async (req, res) => {

        console.log("peticion POST a : /v1/pedidos/ ");

        const crearPedido = await pedidosServicios.createOrder(req.body);

        if (crearPedido.length > 0) {

            const detallePedido = await pedidosServicios.orderDetails(req.body, crearPedido[0]);

            if (detallePedido.length > 0) {

                res.status(201).json({
                    mensaje: `Pedido creado correctamente! `
                });

            }

            else { res.status(400).json({ mensaje: "Error al Crear Pedido" }); }

        }

        else { res.status(400).json({ mensaje: "Error al Crear Pedido" }); }

    });

    app.put("/v1/pedidos/", Admin, existePedido, async (req, res) => {

        console.log("peticion PUT a : /v1/pedidos/ ");

        console.log("Validando datos para editar Pedido");

        const { estado, id_pedido } = req.body;

        if (!estado || !id_pedido) {

            res.status(400).json({ error: `Datos Incompletos!` });

        } else {

            const editarPedido = await pedidosServicios.editOrder(req.body);

            if (editarPedido.length > 0) {

                res.status(201).json({ mensaje: `Pedido editado correctamente!` });

            }

            else { res.status(400).json({ mensaje: "Error al editar pedido" }); }

        }

    });

    app.delete("/v1/pedidos/", Admin, existePedido, async (req, res) => {

        console.log("peticion DELETE a : /v1/pedidos/ ");

        console.log("Validando datos para eliminar pedido");

        const id_pedido = req.body.id_pedido;

        if (!id_pedido) {

            res.status(400).json({ error: `Datos Incompletos!` });

        } else {

            const eliminarPedido = await pedidosServicios.eliminateOrder(req.body);

            res.status(201).json({ mensaje: `Pedido Eliminado correctamente` });

        }

    });

}