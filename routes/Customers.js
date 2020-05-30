const routes = require("express").Router();

module.exports = (models) => {
    
    routes.get("/", async (req, res)=> {
        let Customers = await models.modelmedia_types.findAll();
        res.send(Customers);
    });

    return routes;
}