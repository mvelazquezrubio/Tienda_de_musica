
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require("./configuracion-db");
const EmployeesApi = require("./routes/Employees")(models);
const CustomersApi = require("./routes/Customers")(models);
const InvoicesApi = require("./routes/Invoices")(models);
const TracksApi = require("./routes/Tracks")(models);
const AlbumsApi = require("./routes/Albums")(models);
const PlaylistsApi = require("./routes/Playlists")(models);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use("/api/customers", CustomersApi);
app.use("/api/employees", EmployeesApi);
app.use("/api/invoices", InvoicesApi);
app.use("/api/tracks", TracksApi);
app.use("/api/albums", AlbumsApi);
app.use("/api/playlists", PlaylistsApi);

app.all("/", (req, res)=>{
    res.send({
        Api: 'Tienda de musica',
        Autor: 'Manuel Velazquez'
    });
});
app.all("/api", (req, res)=>{
    res.send({
        message:'La API esta compuesta por las siguientes tablas:',
        tabla_1:'Employees',
        tabla_2:'Customers',
        tabla_3:'Invoices',
        tabla_4:'Invoices_Items',
        tabla_5:'Genres',
        tabla_6:'Media_Types',
        tabla_7:'Artists',
        tabla_8:'Albums',
        tabla_9:'Tracks',
        tabla_10:'Playlists',
        tabla_11:'Playlists_Items'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`El servidor está ejecutandose en el puerto ${port}`);
});

