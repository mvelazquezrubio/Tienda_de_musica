const routes = require("express").Router();
const Sequelize = require("sequelize");
const Filtro = Sequelize.Op;

module.exports = (models) => {
    //Da de alta un customer
    routes.post("/", async (req, res)=> {
        const cliente = req.body;
        await models.modelcustomers.create(cliente);
        res.send({message: 'Cliente Registrado.'});
    });
    //Retorna los clientes atendidos por el empleado mandado.
    routes.get("/", async(req, res)=> {
        const idEmployee = req.query.employee;
        const customer = await models.modelcustomers.findAll({
            attributes: ["CustomerId", "FirstName", "LastName", "Company", "Address", "City", "State", "Country", "PostalCode", "Phone", "Fax", "Email", "SupportRepId"],
            where: { SupportRepId: idEmployee}
        });

        res.send(customer);
    });

    //Retorna los tracks comprados por el cliente
    routes.get("/:cliente/tracks", async(req, res)=> {
        const idcliente = req.params.cliente;
        const invoices = await models.modelinvoices.findAll({
            attributes: ["InvoiceId"],
            where: { CustomerId: idcliente},
            raw: true
        });
        /*const nombres = await models.modelplaylists.findAll({
            attributes: ["PlaylistId", "Name"],
            where: {
                [Filtro.or] : playlists
            }
        });*/
        res.send(invoices);
    });

    return routes;
}