
const express = require("express");
const app = express();
const models = require("./configuracion-db");
const CustomersApi = require("./routes/Customers")(models);

app.use("/api/customers", CustomersApi);


const port = process.env.PORT || 3000;

app.get("/medios", async (req, res)=>{
    let Medios = await models.modelmedia_types.findAll({});
    res.send(Medios);
});

app.listen(port, ()=> {
    console.log(`El servidor está ejecutandose en el puerto ${port}`);
});

