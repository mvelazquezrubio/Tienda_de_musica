const Sequelize = require("sequelize");
const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'Tienda.sqlite'
});

(async()=>{
    class Customers extends Model {}
    Customers.init({
        CustomerId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FirstName: Sequelize.STRING,
        LastName: Sequelize.STRING,
        Company: Sequelize.STRING,
        Address: Sequelize.STRING,
        City: Sequelize.STRING,
        State: Sequelize.STRING,
        Country: Sequelize.STRING,
        PostalCode: Sequelize.STRING,
        Phone: Sequelize.STRING,
        Fax: Sequelize.STRING,
        Email: Sequelize.STRING,
        SupportRepId: Sequelize.INTEGER
    }, { sequelize, modelName:'Customers' });

    class Employees extends Model {}
    Employees.init({
        EmployeeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LastName: Sequelize.STRING,
        FirstName: Sequelize.STRING,
        Title: Sequelize.STRING,
        ReportsTo: Sequelize.INTEGER,
        BirthDate: Sequelize.DATE,
        HireDate: Sequelize.DATE,
        Address: Sequelize.STRING
    }, {sequelize, modelName:'Employees'});

    class Invoices extends Model {}
    Invoices.init({
        InvoiceId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CustomerId: Sequelize.INTEGER,
        InvoiceDate: Sequelize.DATE,
        BillingAdress: Sequelize.STRING,
        BillingCity: Sequelize.STRING
    }, {sequelize, modelName:'Invoices'});

    class Invoices_items extends Model {}
    Invoices_items.init({
        InvoiceItemId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        InvoiceId: Sequelize.INTEGER,
        TrackId: Sequelize.INTEGER,
        UnitPrice: Sequelize.DECIMAL,
        Quantity: Sequelize.INTEGER
    }, {sequelize, modelName:'Invoices_items'});

    class Albums extends Model {}
    Albums.init({
        AlbumId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Title: Sequelize.STRING,
        ArtistId: Sequelize.INTEGER
    }, {sequelize, modelName:'Albums'});

    class Playlists extends Model {}
    Playlists.init({
        PlaylistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: Sequelize.STRING
    }, {sequelize, modelName:'Playlists'});

    class Playlists_track extends Model {}
    Playlists_track.init({
        PlaylistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TrackId: Sequelize.INTEGER
    }, {sequelize, modelName:'Playlists_track'});

    class Tracks extends Model {}
    Tracks.init({
        TrackId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: Sequelize.STRING,
        AlbumId: Sequelize.INTEGER,
        MediaTypeId: Sequelize.INTEGER,
        GenreId: Sequelize.INTEGER,
        Composer: Sequelize.STRING,
        Milliseconds: Sequelize.INTEGER,
        Bytes: Sequelize.INTEGER,
        UnitPrice: Sequelize.DECIMAL
    }, {sequelize, modelName:'Tracks'});

    class Artists extends Model {}
    Artists.init({
        ArtistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: Sequelize.STRING
    }, {sequelize, modelName:'Artists'});

    class Media_types extends Model {}
    Media_types.init({
        MediaTypeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: Sequelize.STRING
    }, {sequelize, modelName:'Media_types'});

    class Genres extends Model {}
    Genres.init({
        GenreId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: Sequelize.STRING
    }, {sequelize, modelName:'Genres'});

    await sequelize.sync({force: true});

})();