
const express = require("express");
const app = express();
const models = require("./configuracion-db");
const EmployeesApi = require("./routes/Employees")(models);
const CustomersApi = require("./routes/Customers")(models);

app.use("/api/employees", EmployeesApi);
app.use("/api/customers", CustomersApi);


const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`El servidor está ejecutandose en el puerto ${port}`);
});

