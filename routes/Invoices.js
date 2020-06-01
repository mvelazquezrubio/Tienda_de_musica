const routes = require("express").Router();

module.exports = (models) => {
    //Retorna las facturas de un cliente.
    routes.get("/:id", async(req, res)=> {
        const idCustomer = req.params.id;
        const Invoice = await models.modelinvoices.findAll({
            attributes: ["InvoiceId", "CustomerId", "InvoiceDate", "BillingAddress", "BillingCity"],
            where: { CustomerId: idCustomer}
        });

        res.send(Invoice);
    });

    //Da de alta una factura
    routes.post("/", async (req, res)=> {
        const Factura = req.body;
        await models.modelinvoices.create(Factura);
        res.send({message: 'Factura Registrada.'});
    });

    //Retorna los items de una factura.
    routes.get("/", async(req, res)=> {
    const idInvoice = req.query.invoiceId;
    const InvoiceItems = await models.modelinvoices_items.findAll({
        attributes: ["InvoiceItemId", "InvoiceId", "TrackId", "UnitPrice", "Quantity"],
        where: { InvoiceId: idInvoice}
    });

    res.send(InvoiceItems);
});

    return routes;
}