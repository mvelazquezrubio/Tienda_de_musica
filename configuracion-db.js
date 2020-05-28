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
        FirstName: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        LastName: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        Company: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        Address: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        City: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        State: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        Country: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        PostalCode: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        Phone: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        Fax: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        Email: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        SupportRepId: {
            Type: Sequelize.INTEGER,
            allowNull: false
        }
    }, { sequelize, modelName:'Customers' });

    class Employees extends Model {}
    Employees.init({
        EmployeeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        LastName: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        FirstName: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        Title: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        ReportsTo: {
            Type: Sequelize.INTEGER,
            allowNull: false
        },
        BirthDate: {
            Type: Sequelize.DATE,
            allowNull: false
        },
        HireDate: {
            Type: Sequelize.DATE,
            allowNull: false
        },
        Address: {
            Type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Employees'});

    class Invoices extends Model {}
    Invoices.init({
        InvoiceId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CustomerId: {
            Type: Sequelize.INTEGER,
            allowNull: false
        },
        InvoiceDate: {
            Type: Sequelize.DATE,
            allowNull: false
        },
        BillingAdress: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        BillingCity: {
            Type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Invoices'});

    class Invoices_items extends Model {}
    Invoices_items.init({
        InvoiceItemId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        InvoiceId: {
            Type: Sequelize.INTEGER,
            allowNull: false
        },
        TrackId: {
            Type: Sequelize.INTEGER,
            allowNull: false
        },
        UnitPrice: {
            Type: Sequelize.DECIMAL,
            allowNull: false
        },
        Quantity: {
            Type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {sequelize, modelName:'Invoices_items'});

    class Albums extends Model {}
    Albums.init({
        AlbumId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Title: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        ArtistId: {
            Type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {sequelize, modelName:'Albums'});

    class Playlists extends Model {}
    Playlists.init({
        PlaylistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            Type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Playlists'});

    class Playlists_track extends Model {}
    Playlists_track.init({
        PlaylistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        TrackId: {
            Type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Playlists_track'});

    class Tracks extends Model {}
    Tracks.init({
        TrackId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        AlbumId: {
            Type: Sequelize.INTEGER,
            allowNull: false
        },
        MediaTypeId: {
            Type: Sequelize.INTEGER,
            allowNull: false
        },
        GenreId: {
            Type: Sequelize.INTEGER,
            allowNull: false
        },
        Composer: {
            Type: Sequelize.STRING,
            allowNull: false
        },
        Milliseconds: {
            Type: Sequelize.INTEGER,
            allowNull: false
        },
        Bytes: {
            Type: Sequelize.INTEGER,
            allowNull: false
        },
        UnitPrice: {
            Type: Sequelize.DECIMAL,
            allowNull: false
        }
    }, {sequelize, modelName:'Tracks'});

    class Artists extends Model {}
    Artists.init({
        ArtistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            Type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Artists'});

    class Media_types extends Model {}
    Media_types.init({
        MediaTypeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            Type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Media_types'});

    class Genres extends Model {}
    Genres.init({
        GenreId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            Type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Genres'});

    await sequelize.sync({force: true});

})();