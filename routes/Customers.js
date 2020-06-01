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
    routes.get("/:id/tracks", async(req, res)=> {
        const idcliente = req.params.id;
        const invoices = await models.modelinvoices.findAll({
            attributes: ["InvoiceId"],
            where: { CustomerId: idcliente},
            raw: true
        });
        const tracksIds = await models.modelinvoices_items.findAll({
            attributes: ["TrackId"],
            where: {
                [Filtro.or] : invoices  
            },
            raw: true
        });
        const nombresTrack = await models.modeltracks.findAll({
            attributes: ["TrackId", "Name", "AlbumId", "MediaTypeId", "GenreId", "Composer", "Milliseconds", "Bytes", "UnitPrice"],
            where: {
                [Filtro.or] : tracksIds
            },
            raw: true
        });
        res.send(nombresTrack);
    });

    //Retorna los generos de musica de el cliente
    routes.get("/:id/genres", async(req, res)=> {
        const idcliente = req.params.id;
        const invoices = await models.modelinvoices.findAll({
            attributes: ["InvoiceId"],
            where: { CustomerId: idcliente},
            raw: true
        });
        const tracksIds = await models.modelinvoices_items.findAll({
            attributes: ["TrackId"],
            where: {
                [Filtro.or] : invoices  
            },
            raw: true
        });
        const generosId = await models.modeltracks.findAll({
            attributes: ["GenreId"],
            where: {
                [Filtro.or] : tracksIds
            },
            raw: true
        });
        const generos = await models.modelgenres.findAll({
            attributes: ["GenreId", "Name"],
            where: {
                [Filtro.or] : generosId
            },
            raw: true
        });
        res.send(generos);
    });

    return routes;
}