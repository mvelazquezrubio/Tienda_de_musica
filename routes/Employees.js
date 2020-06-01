const routes = require("express").Router();

module.exports = (models) => {
    //Obtiene todos los empleados8
    routes.get("/", async (req, res)=> {
        let Employees = await models.modelemployees.findAll({
            attributes: ["EmployeeId", "LastName", "FirstName", "Title", "ReportsTo", "BirthDate", "HireDate", "Address"]
        });
        res.send(Employees);
    });

    //Dar de alta un empleado
    routes.post("/", async (req, res)=> {
        const empleado = req.body;
        await models.modelemployees.create(empleado);
        res.send({message: 'Empleado Registrado'});
    });

    //Retorna los subordinados del empleado con el id mandado.
    routes.get("/:id", async(req, res)=> {
        const idEmployee = req.params.id;
        const employee = await models.modelemployees.findAll({
            attributes: ["EmployeeId", "LastName", "FirstName", "Title", "ReportsTo", "BirthDate", "HireDate", "Address"],
            where: { ReportsTo: idEmployee}
        });

        res.send(employee);
    });

    //Actualiza los datos del empleado con el id mandado.
    routes.put("/:id", async (req, res)=> {
        const idEmployee = req.params.id;
        const employee = req.body;
        await models.modelemployees.update(employee, { where: {EmployeeId: idEmployee}});
        res.send({message: 'Empleado Actualizado.'});
    });

    return routes;
}