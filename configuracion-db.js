const Sequelize = require("sequelize");
const Model = Sequelize.Model;
let modelcustomers="", modelemployees="",modelalbums="",modelinvoices="",modelinvoices_items="",modelartists="";
let modeltracks="",modelplaylists="",modelplaylist_tracks="",modelgenres="",modelmedia_types="";
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
    modelcustomers=Customers.init({
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
    modelemployees=Employees.init({
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
    modelinvoices=Invoices.init({
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
    modelinvoices_items=Invoices_items.init({
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
    modelalbums=Albums.init({
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
    modelplaylists=Playlists.init({
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
    modelplaylist_tracks=Playlists_track.init({}, {sequelize, modelName:'Playlists_track'});

    class Tracks extends Model {}
    modeltracks=Tracks.init({
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
    modelartists=Artists.init({
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
    modelmedia_types= Media_types.init({
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
    modelgenres=Genres.init({
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
    //Employees.belongsTo(Employees,{foreignKey:'ReportsTo', as:'Employees_Employee'});
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
    Playlists.belongsToMany(Tracks,{through:Playlists_track, as:'Playlist_tracks', foreignKey:'PlaylistId', otherKey:'TrackId'});
    //Playlists_track.hasMany(Tracks,{foreignKey:'TrackId', as:'Tracks_playlists'});
    //una cancion puede estar en muchas facturas, una factura puede tener muchas canciones.
    Tracks.belongsToMany(Invoices,{through:Invoices_items, as:'Tracks_Invoices', foreignKey:'TrackId', otherKey:'InvoiceId'});
    Invoices.belongsToMany(Tracks,{through:Invoices_items, as:'Invoices_Tracks', foreignKey:'InvoiceId', otherKey:'TrackId'});
    //Invoices_items.hasMany(Tracks,{foreignKey:'TrackId', as:'Tracks_Invoices'});

    await sequelize.sync({force: true});

    const artistas = await Artists.bulkCreate([
        //ROCK
        { Name: 'The Beatles' },
        { Name: 'The Rolling Stones' },
        { Name: 'Queen' },
        { Name: 'Nirvana' },
        //METAL
        { Name: 'Metallica' },
        { Name: 'Iron Maiden' },
        { Name: 'Black Sabbath' },
        { Name: 'KISS' },
        //JAZZ
        { Name: 'Miles Davis' },
        { Name: 'Louis Armstrong' },
        { Name: 'John Coltrane' },
        { Name: 'Duke Ellingston' },
        //ELECTRONICA
        { Name: 'Skrillex' },
        { Name: 'Avicii' },
        { Name: 'David Guetta' },
        { Name: 'Martin Garrix' },
        //BANDA
        { Name: 'Espinoza Paz' },
        { Name: 'Julion Alvarez' },
        { Name: 'Banda MS' },
        { Name: 'Banda El Recodo' },

    ]);

    const medios = await Media_types.bulkCreate([
        {Name:'Protected AAC audio file'},
        {Name:'Purchased AAC audio file'},
        {Name:'MPEG audio file'},
        {Name:'AAC audio file'},
        {Name:'Protected MPEG-4 video file'}
    ]);

    const generos = await Genres.bulkCreate([
        {Name:'Rock'},
        {Name:'Metal'},
        {Name:'Jazz'},
        {Name:'Electronica'},
        {Name:'Banda'}
    ]);
    
    const albumes = await Albums.bulkCreate([
        {Title:'Abbey Road', ArtistId:1},
        {Title:'Sticky Fingers', ArtistId:2},
        {Title:'News Of The World', ArtistId:3},
        {Title:'', ArtistId:4},
        {Title:'', ArtistId:5},
        {Title:'', ArtistId:6},
        {Title:'', ArtistId:7},
        {Title:'', ArtistId:8},
        {Title:'', ArtistId:9},
        {Title:'', ArtistId:10},
        {Title:'', ArtistId:11},
        {Title:'', ArtistId:12},
        {Title:'', ArtistId:13},
        {Title:'', ArtistId:14},
        {Title:'', ArtistId:15},
        {Title:'', ArtistId:16},
        {Title:'', ArtistId:17},
        {Title:'', ArtistId:18},
        {Title:'', ArtistId:19},
        {Title:'', ArtistId:20}
    ]);

    const canciones = await Tracks.bulkCreate([
        {Name:'Come Together',AlbumId:1,MediaTypeId:1,GenreId:1,Composer:'The Beatles',Milliseconds:243675,Bytes:1210965,UnitPrice:1.50},
        {Name:'Something',AlbumId:1,MediaTypeId:3,GenreId:1,Composer:'The Beatles',Milliseconds:657039,Bytes:7649307,UnitPrice:1.50},
        {Name:'Sun King',AlbumId:1,MediaTypeId:3,GenreId:1,Composer:'The Beatles',Milliseconds:938087,Bytes:7493086,UnitPrice:1.50},
        {Name:'Because',AlbumId:1,MediaTypeId:1,GenreId:1,Composer:'The Beatles',Milliseconds:234768,Bytes:4938392,UnitPrice:1.50},
        {Name:'The End',AlbumId:1,MediaTypeId:2,GenreId:1,Composer:'The Beatles',Milliseconds:123098,Bytes:9820398,UnitPrice:1.50},
        {Name:'Brown Sugar',AlbumId:2,MediaTypeId:5,GenreId:1,Composer:'The Rolling Stones',Milliseconds:347644,Bytes:9823032,UnitPrice:1.50},
        {Name:'Sway',AlbumId:2,MediaTypeId:4,GenreId:1,Composer:'The Rolling Stones',Milliseconds:493023,Bytes:9403213,UnitPrice:1.50},
        {Name:'Bitch',AlbumId:2,MediaTypeId:4,GenreId:1,Composer:'The Rolling Stones',Milliseconds:840385,Bytes:850302,UnitPrice:1.50},
        {Name:'Dead Flowers',AlbumId:2,MediaTypeId:2,GenreId:1,Composer:'The Rolling Stones',Milliseconds:1375343,Bytes:764930,UnitPrice:1.50},
        {Name:'Wild Horses',AlbumId:2,MediaTypeId:1,GenreId:1,Composer:'The Rolling Stones',Milliseconds:758493,Bytes:234654,UnitPrice:1.50},
        {Name:'We Are The Champions',AlbumId:3,MediaTypeId:2,GenreId:1,Composer:'Queen',Milliseconds:437527,Bytes:742467,UnitPrice:1.50},
        {Name:'Spread Your Wings',AlbumId:3,MediaTypeId:1,GenreId:1,Composer:'Queen',Milliseconds:964235,Bytes:975323,UnitPrice:1.50},
        {Name:'Get Down, Make Love',AlbumId:3,MediaTypeId:3,GenreId:1,Composer:'Queen',Milliseconds:829382,Bytes:927439,UnitPrice:1.50},
        {Name:'All Dead, All Dead',AlbumId:3,MediaTypeId:3,GenreId:1,Composer:'Queen',Milliseconds:903582,Bytes:749365,UnitPrice:1.50},
        {Name:'Who Needs You',AlbumId:3,MediaTypeId:1,GenreId:1,Composer:'Queen',Milliseconds:643829,Bytes:675849,UnitPrice:1.50},

    ]);
    
})();

module.exports = {
    sequelize,
    modelcustomers,
    modelemployees,
    modelalbums,
    modelinvoices,
    modelinvoices_items,
    modelartists,
    modeltracks,
    modelplaylist_tracks,
    modelplaylists,
    modelgenres,
    modelmedia_types
}
