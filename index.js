
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

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`El servidor está ejecutandose en el puerto ${port}`);
});

