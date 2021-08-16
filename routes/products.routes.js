const { validateData, validateExistence, validateEditData } = require('../middlewares/products.midd.js');
const { Admin } = require('../middlewares/users.midd.js');
const productosServicios = require('../services/products.services.js');

module.exports = (app) => {

    app.get("/v1/productos/", async (req, res) => {

        console.log("peticion GET a : /v1/productos/ ");

        try {

            const consultaProductos = await productosServicios.searchProduct(req.body);

            if (consultaProductos.length > 0) { res.status(200).json(consultaProductos); }

            else { res.status(404).json("El producto buscado no existe"); }

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/v1/productos/", Admin, validateData, validateExistence, async (req, res) => {

        console.log("peticion POST a : /v1/productos/ ");

        const crearProducto = await productosServicios.createProduct(req.body);

        if (crearProducto.length > 0) {
            res.status(201).json({
                mensaje: `Producto ${req.body.nombre} creado exitosamente.`
            });
        }

        else { res.status(400).json({ mensaje: "Error al crear Producto" }); }

    });


    app.put("/v1/productos/", Admin, validateEditData, async (req, res) => {

        console.log("peticion PUT a : /v1/productos/ ");

        console.log("Validando Producto");

        const consultaProducto = await productosServicios.searchProductById(req.body);

        if (consultaProducto.length > 0) {

            const editarProducto = await productosServicios.editProduct(req.body);

            if (editarProducto.length > 0) {
                res.status(201).json({
                    mensaje: `Producto ${req.body.nombre} editado correctamente.`
                });
            }

        }

        else { res.status(400).json({ mensaje: "Error al editar Producto" }); }

    });

    app.delete("/v1/productos/", Admin, validateData, async (req, res) => {

        console.log("peticion DELETE a : /v1/productos/ ");

        console.log("Validando Producto");

        const consultaProducto = await productosServicios.searchProductById(req.body);

        if (consultaProducto.length > 0) {

            const eliminarProducto = await productosServicios.eliminateProduct(req.body);

            res.status(201).json({
                mensaje: `Producto ${req.body.nombre} eliminado correctamente.`
            });

        }

        else { res.status(400).json({ mensaje: "Error al eliminar Producto" }); }

    });


}