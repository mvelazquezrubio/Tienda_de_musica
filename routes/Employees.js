const routes = require("express").Router();

module.exports = (models) => {
    
    routes.get("/", async (req, res)=> {
        let Employees = await models.modelemployees.findAll({
            attributes: ["EmployeeId", "LastName", "FirstName", "Title", "ReportsTo", "BirthDate", "HireDate", "Address"]
        });
        res.send(Employees);
    });

    return routes;
}