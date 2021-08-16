const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require("express-jwt");
const puerto = 3000;
const { firm } = require('./confi/config.js');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressJwt({ secret: firm, algorithms: ["HS512"] })
	.unless({
		path: [{ url: '/v1/ingreso/', methods: ['POST'] },
		{ url: '/v1/usuarios/', methods: ['POST'] }]
	})
);


const usuariosRutas = require('./routes/usuarios.rutas.js');
const productosRutas = require('./routes/products.routes.js');
const pedidosRutas = require('./routes/orders.routes.js');


usuariosRutas(app);
productosRutas(app);
pedidosRutas(app);

app.listen(puerto, () => {
	console.clear();
	console.log(`Servidor Inicializado en el puerto :  ${puerto}`)
});
