const Sequelize = require("sequelize");
const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'Tienda.sqlite'
});

sequelize.authenticate()
    .then(()=> {
        console.log("La conexión con la base de datos establecida");
    })
    .error((error) => {
        console.error(error);
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
            type: Sequelize.STRING,
            allowNull: false
        },
        LastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Company: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        City: {
            type: Sequelize.STRING,
            allowNull: false
        },
        State: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Country: {
            type: Sequelize.STRING,
            allowNull: false
        },
        PostalCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Fax: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        SupportRepId: {
            type: Sequelize.INTEGER,
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
            type: Sequelize.STRING,
            allowNull: false
        },
        FirstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ReportsTo: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        BirthDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        HireDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Address: {
            type: Sequelize.STRING,
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
            type: Sequelize.INTEGER,
            allowNull: false
        },
        InvoiceDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        BillingAdress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        BillingCity: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Invoices'});

    class Invoices_items extends Model {}
    Invoices_items.init({
        InvoiceItemId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UnitPrice: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        Quantity: {
            type: Sequelize.INTEGER,
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
            type: Sequelize.STRING,
            allowNull: false
        },
        ArtistId: {
            type: Sequelize.INTEGER,
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
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Playlists'});

  class Playlists_track extends Model {}
    Playlists_track.init({}, {sequelize, modelName:'Playlists_track'});

    class Tracks extends Model {}
    Tracks.init({
        TrackId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        AlbumId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        MediaTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        GenreId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Composer: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Milliseconds: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Bytes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        UnitPrice: {
            type: Sequelize.DECIMAL,
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
            type: Sequelize.STRING,
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
            type: Sequelize.STRING,
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
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {sequelize, modelName:'Genres'});

    /*Pais.hasMany(Persona,{foreignKey:'paisId', as:'Personas'});
    Persona.belongsTo(Pais,{foreignKey:'paisId', as:'Pais'});
    Persona.belongsToMany(Persona,{through:'relations', as:'Amistades'});*/

    //Un album pertenece a un artista, un artista puede tener muchos albums
    Albums.belongsTo(Artists,{foreignKey:'ArtistId', as:'Artists'});
    Artists.hasMany(Albums,{foreignKey:'ArtistId', as:'Albums'});
    //Una factura pertenece a un cliente, un cliente puede tener muchas facturas.
    Invoices.belongsTo(Customers,{foreignKey:'CustomerId', as:'Customers'});
    Customers.hasMany(Invoices,{foreignKey:'CustomerId', as:'Customer_Invoice'});
    //un cliente tiene su respectivo vendedor, un vendedor puede tener muchos clientes.
    Customers.belongsTo(Employees,{foreignKey:'SupportRepId', as:'Employee'});
    Employees.hasMany(Customers,{foreignKey:'SupportRepId',as:'Customer_Employee'});
    //Un empleado puede tener varios subordinados, un empleado pertenece a un solo jefe.
    Employees.hasMany(Employees,{foreignKey:'ReportsTo', as:'Employee_Head'});
    Employees.belongsTo(Employees,{foreignKey:'ReportsTo', as:'Employees_Employee'});
    //Una cancion pertenece a un tipo de medio, pero un medio tiene muchas canciones.
    Tracks.belongsTo(Media_types,{foreignKey:'MediaTypeId', as:'Media_types'});
    Media_types.hasMany(Tracks,{foreignKey:'MediaTypeId', as:'Media_Tracks'});
    //una cancion pertenece a un genero, pero un genero puede tener muchas canciones.
    Tracks.belongsTo(Genres,{foreignKey:'GenreId', as:'Genres'});
    Genres.hasMany(Tracks,{foreignKey:'GenreId', as:'Gender_Track'});
    //una cancion pertenece a un solo album, pero un album tiene muchas canciones.
    Tracks.belongsTo(Albums,{foreignKey:'AlbumId', as:'Albums'});
    Albums.hasMany(Tracks,{foreignKey:'AlbumId', as:'Album_Track'});
    //Una cancion puede pertenecer a muchas playlist, una playlist puede tener muchas canciones.
    Tracks.belongsToMany(Playlists,{through:Playlists_track, as:'Playlist_track', foreignKey:'TrackId', otherKey:'PlaylistId'});
    //Playlists_track.hasMany(Tracks,{foreignKey:'TrackId', as:'Tracks_playlists'});
    //una cancion puede estar en muchas facturas, una factura puede tener muchas canciones.
    Tracks.belongsToMany(Invoices,{through:Invoices_items, as:'Invoices', foreignKey:'TrackId', otherKey:'InvoiceId'});
    //Invoices_items.hasMany(Tracks,{foreignKey:'TrackId', as:'Tracks_Invoices'});

    await sequelize.sync({force: true});

})();
