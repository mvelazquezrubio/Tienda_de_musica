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
            allowNull: true
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
            allowNull: true
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
        BillingAddress: {
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
    Albums.hasMany(Tracks,{foreignKey:'AlbumId', as:'Tracks'});
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
        {Title:'Nevermind', ArtistId:4},
        {Title:'Master Of Puppets', ArtistId:5},
        {Title:'Killers', ArtistId:6},
        {Title:'Paranoid', ArtistId:7},
        {Title:'Love Gun', ArtistId:8},
        {Title:'Kind Of Blue', ArtistId:9},
        {Title:'Ella And Louis', ArtistId:10},
        {Title:'Blue Train', ArtistId:11},
        {Title:'Money Jungle', ArtistId:12},
        {Title:'Rebel Bass', ArtistId:13},
        {Title:'Tim', ArtistId:14},
        {Title:'Listen Again', ArtistId:15},
        {Title:'Bylaw', ArtistId:16},
        {Title:'Hombre', ArtistId:17},
        {Title:'Este Soy Yo', ArtistId:18},
        {Title:'Con Todas Las Fuerzas', ArtistId:19},
        {Title:'Haciendo Historia', ArtistId:20}
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
        {Name:'Breed',AlbumId:4,MediaTypeId:4,GenreId:1,Composer:'Nirvana',Milliseconds:294738,Bytes:740243,UnitPrice:1.50},
        {Name:'Polly',AlbumId:4,MediaTypeId:3,GenreId:1,Composer:'Nirvana',Milliseconds:573948,Bytes:927493,UnitPrice:1.50},
        {Name:'On A Plain',AlbumId:4,MediaTypeId:5,GenreId:1,Composer:'Nirvana',Milliseconds:849375,Bytes:832483,UnitPrice:1.50},
        {Name:'Drain You',AlbumId:4,MediaTypeId:2,GenreId:1,Composer:'Nirvana',Milliseconds:739202,Bytes:432234,UnitPrice:1.50},
        {Name:'Come As You Are',AlbumId:4,MediaTypeId:2,GenreId:1,Composer:'Nirvana',Milliseconds:843948,Bytes:2323254,UnitPrice:1.50},
        {Name:'Battery',AlbumId:5,MediaTypeId:1,GenreId:2,Composer:'Metallica',Milliseconds:236588,Bytes:948372,UnitPrice:1.50},
        {Name:'Orion',AlbumId:5,MediaTypeId:3,GenreId:2,Composer:'Metallica',Milliseconds:783373,Bytes:892472,UnitPrice:1.50},
        {Name:'Disposable Heroes',AlbumId:5,MediaTypeId:1,GenreId:2,Composer:'Metallica',Milliseconds:738832,Bytes:928423,UnitPrice:1.50},
        {Name:'Leper Messiah',AlbumId:5,MediaTypeId:4,GenreId:2,Composer:'Metallica',Milliseconds:839293,Bytes:436511,UnitPrice:1.50},
        {Name:'Master Of Puppets',AlbumId:5,MediaTypeId:1,GenreId:2,Composer:'Metallica',Milliseconds:454365,Bytes:849384,UnitPrice:1.50},
        {Name:'Drifter',AlbumId:6,MediaTypeId:2,GenreId:2,Composer:'Iron Maiden',Milliseconds:342256,Bytes:234543,UnitPrice:1.50},
        {Name:'Killers',AlbumId:6,MediaTypeId:1,GenreId:2,Composer:'Iron Maiden',Milliseconds:345654,Bytes:123445,UnitPrice:1.50},
        {Name:'The Ides Of March',AlbumId:6,MediaTypeId:4,GenreId:2,Composer:'Iron Maiden',Milliseconds:543765,Bytes:324654,UnitPrice:1.50},
        {Name:'Purgatory',AlbumId:6,MediaTypeId:4,GenreId:2,Composer:'Iron Maiden',Milliseconds:123665,Bytes:928921,UnitPrice:1.50},
        {Name:'Another Life',AlbumId:6,MediaTypeId:1,GenreId:2,Composer:'Iron Maiden',Milliseconds:935638,Bytes:297483,UnitPrice:1.50},
        {Name:'War Pigs',AlbumId:7,MediaTypeId:2,GenreId:2,Composer:'Black Sabbath',Milliseconds:294738,Bytes:927483,UnitPrice:1.50},
        {Name:'Rat Salads',AlbumId:7,MediaTypeId:2,GenreId:2,Composer:'Black Sabbath',Milliseconds:837483,Bytes:924783,UnitPrice:1.50},
        {Name:'Hand Of Doom',AlbumId:7,MediaTypeId:3,GenreId:2,Composer:'Black Sabbath',Milliseconds:381947,Bytes:925673,UnitPrice:1.50},
        {Name:'Iron Man',AlbumId:7,MediaTypeId:4,GenreId:2,Composer:'Black Sabbath',Milliseconds:925621,Bytes:731924,UnitPrice:1.50},
        {Name:'Planet Caravan',AlbumId:7,MediaTypeId:1,GenreId:2,Composer:'Black Sabbath',Milliseconds:342898,Bytes:342865,UnitPrice:1.50},
        {Name:'Shock Me',AlbumId:8,MediaTypeId:4,GenreId:2,Composer:'KISS',Milliseconds:342256,Bytes:947583,UnitPrice:1.50},
        {Name:'Hooligan',AlbumId:8,MediaTypeId:3,GenreId:2,Composer:'KISS',Milliseconds:945729,Bytes:955734,UnitPrice:1.50},
        {Name:'Almost Human',AlbumId:8,MediaTypeId:3,GenreId:2,Composer:'KISS',Milliseconds:857922,Bytes:956327,UnitPrice:1.50},
        {Name:'Plaster Caster',AlbumId:8,MediaTypeId:2,GenreId:2,Composer:'KISS',Milliseconds:896723,Bytes:658922,UnitPrice:1.50},
        {Name:'Love Gun',AlbumId:8,MediaTypeId:3,GenreId:2,Composer:'KISS',Milliseconds:645327,Bytes:892375,UnitPrice:1.50},
        {Name:'So What',AlbumId:9,MediaTypeId:2,GenreId:3,Composer:'Miles Davis',Milliseconds:845736,Bytes:947583,UnitPrice:1.50},
        {Name:'All Blues',AlbumId:9,MediaTypeId:1,GenreId:3,Composer:'Miles Davis',Milliseconds:759374,Bytes:397528,UnitPrice:1.50},
        {Name:'Blue In Green',AlbumId:9,MediaTypeId:2,GenreId:3,Composer:'Miles Davis',Milliseconds:74926,Bytes:825637,UnitPrice:1.50},
        {Name:'Freddie Freeloader',AlbumId:9,MediaTypeId:2,GenreId:3,Composer:'Miles Davis',Milliseconds:927583,Bytes:924621,UnitPrice:1.50},
        {Name:'Flamenco Sketches',AlbumId:9,MediaTypeId:2,GenreId:3,Composer:'Miles Davis',Milliseconds:842398,Bytes:926482,UnitPrice:1.50},
        {Name:'Tenderly',AlbumId:10,MediaTypeId:1,GenreId:3,Composer:'Louis Amstrong',Milliseconds:934792,Bytes:916483,UnitPrice:1.50},
        {Name:'A Foggy Day',AlbumId:10,MediaTypeId:1,GenreId:3,Composer:'Louis Amstrong',Milliseconds:953285,Bytes:934623,UnitPrice:1.50},
        {Name:'April In Paris',AlbumId:10,MediaTypeId:2,GenreId:3,Composer:'Louis Amstrong',Milliseconds:947382,Bytes:850312,UnitPrice:1.50},
        {Name:'Cheek To Cheek',AlbumId:10,MediaTypeId:2,GenreId:3,Composer:'Louis Amstrong',Milliseconds:764822,Bytes:955723,UnitPrice:1.50},
        {Name:'Stars Fell On Alabama',AlbumId:10,MediaTypeId:3,GenreId:3,Composer:'Louis Amstrong',Milliseconds:926573,Bytes:846573,UnitPrice:1.50},
        {Name:'Blue Train',AlbumId:11,MediaTypeId:3,GenreId:3,Composer:'John Coltrane',Milliseconds:939242,Bytes:859373,UnitPrice:1.50},
        {Name:'Moments Notice',AlbumId:11,MediaTypeId:1,GenreId:3,Composer:'John Coltrane',Milliseconds:956823,Bytes:947593,UnitPrice:1.50},
        {Name:'Locomotion',AlbumId:11,MediaTypeId:2,GenreId:3,Composer:'John Coltrane',Milliseconds:946922,Bytes:946582,UnitPrice:1.50},
        {Name:'Lazy Bird',AlbumId:11,MediaTypeId:2,GenreId:3,Composer:'John Coltrane',Milliseconds:947392,Bytes:94027,UnitPrice:1.50},
        {Name:'Im Old Fashioned',AlbumId:11,MediaTypeId:3,GenreId:3,Composer:'John Coltrane',Milliseconds:856332,Bytes:975637,UnitPrice:1.50},
        {Name:'Very Special',AlbumId:12,MediaTypeId:5,GenreId:3,Composer:'Duke Ellington',Milliseconds:235933,Bytes:947483,UnitPrice:1.50},
        {Name:'Warm Valley',AlbumId:12,MediaTypeId:3,GenreId:3,Composer:'Duke Ellington',Milliseconds:846483,Bytes:927498,UnitPrice:1.50},
        {Name:'Wig Wise',AlbumId:12,MediaTypeId:2,GenreId:3,Composer:'Duke Ellington',Milliseconds:653632,Bytes:827363,UnitPrice:1.50},
        {Name:'Caravan',AlbumId:12,MediaTypeId:1,GenreId:3,Composer:'Duke Ellington',Milliseconds:928282,Bytes:746463,UnitPrice:1.50},
        {Name:'Solitude',AlbumId:12,MediaTypeId:1,GenreId:3,Composer:'Duke Ellington',Milliseconds:901222,Bytes:829292,UnitPrice:1.50},
        {Name:'Dawn',AlbumId:13,MediaTypeId:3,GenreId:4,Composer:'Skrillex',Milliseconds:7474632,Bytes:234323,UnitPrice:1.50},
        {Name:'Get Low',AlbumId:13,MediaTypeId:2,GenreId:4,Composer:'Skrillex',Milliseconds:97463,Bytes:928463,UnitPrice:1.50},
        {Name:'So Sweet',AlbumId:13,MediaTypeId:3,GenreId:4,Composer:'Skrillex',Milliseconds:288645,Bytes:292763,UnitPrice:1.50},
        {Name:'Hoping',AlbumId:13,MediaTypeId:2,GenreId:4,Composer:'Skrillex',Milliseconds:726453,Bytes:92836,UnitPrice:1.50},
        {Name:'The One',AlbumId:13,MediaTypeId:1,GenreId:4,Composer:'Skrillex',Milliseconds:738263,Bytes:837543,UnitPrice:1.50},
        {Name:'Heaven',AlbumId:14,MediaTypeId:5,GenreId:4,Composer:'Avicii',Milliseconds:746574,Bytes:937574,UnitPrice:1.50},
        {Name:'SOS',AlbumId:14,MediaTypeId:5,GenreId:4,Composer:'Avicii',Milliseconds:93756,Bytes:94756,UnitPrice:1.50},
        {Name:'Hold The Line',AlbumId:14,MediaTypeId:5,GenreId:4,Composer:'Avicii',Milliseconds:32467,Bytes:298732,UnitPrice:1.50},
        {Name:'Freak',AlbumId:14,MediaTypeId:5,GenreId:4,Composer:'Avicii',Milliseconds:234976,Bytes:9794233,UnitPrice:1.50},
        {Name:'Fades Away',AlbumId:14,MediaTypeId:5,GenreId:4,Composer:'Avicii',Milliseconds:6872364,Bytes:6862343,UnitPrice:1.50},
        {Name:'Dangerous',AlbumId:15,MediaTypeId:3,GenreId:4,Composer:'David Guetta',Milliseconds:837483,Bytes:937463,UnitPrice:1.50},
        {Name:'Goodbye Friend',AlbumId:15,MediaTypeId:2,GenreId:4,Composer:'David Guetta',Milliseconds:937563,Bytes:937463,UnitPrice:1.50},
        {Name:'Yesterday',AlbumId:15,MediaTypeId:2,GenreId:4,Composer:'David Guetta',Milliseconds:836353,Bytes:297353,UnitPrice:1.50},
        {Name:'Rise',AlbumId:15,MediaTypeId:3,GenreId:4,Composer:'David Guetta',Milliseconds:938362,Bytes:746533,UnitPrice:1.50},
        {Name:'No Money No Love',AlbumId:15,MediaTypeId:1,GenreId:4,Composer:'David Guetta',Milliseconds:827652,Bytes:730276,UnitPrice:1.50},
        {Name:'Breach',AlbumId:16,MediaTypeId:3,GenreId:4,Composer:'Martin Garrix',Milliseconds:739223,Bytes:746352,UnitPrice:1.50},
        {Name:'Yottabyte',AlbumId:16,MediaTypeId:2,GenreId:4,Composer:'Martin Garrix',Milliseconds:837623,Bytes:736533,UnitPrice:1.50},
        {Name:'Latency',AlbumId:16,MediaTypeId:2,GenreId:4,Composer:'Martin Garrix',Milliseconds:763425,Bytes:908276,UnitPrice:1.50},
        {Name:'Access',AlbumId:16,MediaTypeId:1,GenreId:4,Composer:'Martin Garrix',Milliseconds:562543,Bytes:627934,UnitPrice:1.50},
        {Name:'Waiting For Tomorrow',AlbumId:16,MediaTypeId:4,GenreId:4,Composer:'Martin Garrix',Milliseconds:672832,Bytes:673943,UnitPrice:1.50},
        {Name:'Fue Positivo',AlbumId:17,MediaTypeId:5,GenreId:5,Composer:'Espinoza Paz',Milliseconds:647039,Bytes:938736,UnitPrice:1.50},
        {Name:'He Bebido',AlbumId:17,MediaTypeId:1,GenreId:5,Composer:'Espinoza Paz',Milliseconds:93836,Bytes:93476,UnitPrice:1.50},
        {Name:'Belleza Pura',AlbumId:17,MediaTypeId:2,GenreId:5,Composer:'Espinoza Paz',Milliseconds:73635,Bytes:83473,UnitPrice:1.50},
        {Name:'Se Te Va Notar',AlbumId:17,MediaTypeId:3,GenreId:5,Composer:'Espinoza Paz',Milliseconds:92234,Bytes:73246,UnitPrice:1.50},
        {Name:'De Mi Cuenta Corre',AlbumId:17,MediaTypeId:4,GenreId:5,Composer:'Espinoza Paz',Milliseconds:234876,Bytes:868634,UnitPrice:1.50},
        {Name:'Sin Memoria',AlbumId:18,MediaTypeId:5,GenreId:5,Composer:'Julion Alvarez',Milliseconds:738493,Bytes:736439,UnitPrice:1.50},
        {Name:'Soñe',AlbumId:18,MediaTypeId:3,GenreId:5,Composer:'Julion Alvarez',Milliseconds:837536,Bytes:67354,UnitPrice:1.50},
        {Name:'Juntos Los Dos',AlbumId:18,MediaTypeId:3,GenreId:5,Composer:'Julion Alvarez',Milliseconds:837643,Bytes:783654,UnitPrice:1.50},
        {Name:'Decide Tu',AlbumId:18,MediaTypeId:2,GenreId:5,Composer:'Julion Alvarez',Milliseconds:673543,Bytes:786432,UnitPrice:1.50},
        {Name:'Tal Vez No',AlbumId:18,MediaTypeId:2,GenreId:5,Composer:'Julion Alvarez',Milliseconds:765432,Bytes:786234,UnitPrice:1.50},
        {Name:'De Una Vez',AlbumId:19,MediaTypeId:4,GenreId:5,Composer:'Banda MS',Milliseconds:736843,Bytes:823652,UnitPrice:1.50},
        {Name:'Mejor Me Alejo',AlbumId:19,MediaTypeId:3,GenreId:5,Composer:'Banda MS',Milliseconds:783562,Bytes:748323,UnitPrice:1.50},
        {Name:'Se Podria Decir',AlbumId:19,MediaTypeId:3,GenreId:5,Composer:'Banda MS',Milliseconds:648023,Bytes:829386,UnitPrice:1.50},
        {Name:'No Te Imaginas',AlbumId:19,MediaTypeId:5,GenreId:5,Composer:'Banda MS',Milliseconds:923722,Bytes:346372,UnitPrice:1.50},
        {Name:'Prefiero Perderte',AlbumId:19,MediaTypeId:1,GenreId:5,Composer:'Banda MS',Milliseconds:834937,Bytes:623724,UnitPrice:1.50},
        {Name:'Ni Caso Tiene',AlbumId:20,MediaTypeId:4,GenreId:5,Composer:'Banda El Recodo',Milliseconds:834923,Bytes:789065,UnitPrice:1.50},
        {Name:'Crei',AlbumId:20,MediaTypeId:3,GenreId:5,Composer:'Banda El Recodo',Milliseconds:634202,Bytes:892362,UnitPrice:1.50},
        {Name:'Somos Ajenos',AlbumId:20,MediaTypeId:3,GenreId:5,Composer:'Banda El Recodo',Milliseconds:823492,Bytes:903123,UnitPrice:1.50},
        {Name:'Llegaste',AlbumId:20,MediaTypeId:1,GenreId:5,Composer:'Banda El Recodo',Milliseconds:843212,Bytes:612371,UnitPrice:1.50},
        {Name:'Haciendo Historia',AlbumId:20,MediaTypeId:1,GenreId:5,Composer:'Banda El Recodo',Milliseconds:902376,Bytes:812372,UnitPrice:1.50}
    ]);

    const empleados = await Employees.bulkCreate([
        {LastName:'Velazquez', FirstName:'Manuel', Title:'Gerente General', ReportsTo:null, BirthDate:'1998-03-24', HireDate:'2015-08-12', Address:'Fracc. Valle Alto'},
        {LastName:'Ochoa', FirstName:'Jessica', Title:'Gerente', ReportsTo:1, BirthDate:'1994-02-18', HireDate:'2016-11-21', Address:'Fracc. Valles Del Sol'},
        {LastName:'Ramirez', FirstName:'Alejandro', Title:'Gerente', ReportsTo:1, BirthDate:'1990-12-13', HireDate:'2008-11-07', Address:'Fracc. Francisco I Madero'},
        {LastName:'Sanchez', FirstName:'Jose', Title:'Jefe', ReportsTo:2, BirthDate:'1980-05-12', HireDate:'1998-03-22', Address:'Fracc. Benito Juarez'},
        {LastName:'Aguilar', FirstName:'Pedro', Title:'Empleado General', ReportsTo:4, BirthDate:'1990-09-12', HireDate:'2003-06-23', Address:'Fracc. La Conquista'},
        {LastName:'Perez', FirstName:'Paola', Title:'Jefe', ReportsTo:3, BirthDate:'1987-12-12', HireDate:'2002-07-01', Address:'Fracc. Valle Alto'},
        {LastName:'Acosta', FirstName:'Antonio', Title:'Empleado General', ReportsTo:6, BirthDate:'1995-11-04', HireDate:'2015-04-08', Address:'Col. Angeles'},
        {LastName:'Meza', FirstName:'Jesus', Title:'Empleado General', ReportsTo:6, BirthDate:'1995-01-29', HireDate:'2017-07-18', Address:'Col. Libertad'}
    ]);

    const clientes = await Customers.bulkCreate([
        {FirstName:'Marco', LastName:'Bolaños', Company:'Coppel', Address:'Fracc. Valle Alto', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:'80050', Phone:'6673034587', Fax:'NA', Email:'Marco@gmail.com', SupportRepId:5},
        {FirstName:'Maria', LastName:'Valenzuela', Company:'', Address:'Fracc. Villas Del Rio', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:'101019', Phone:'6672234321', Fax:'NA', Email:'Maria@gmail.com', SupportRepId:5},
        {FirstName:'Mauricio', LastName:'Felix', Company:'', Address:'Col. Valles Del Rey', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:'12896', Phone:'667793082', Fax:'NA', Email:'Mauricio@gmail.com', SupportRepId:7},
        {FirstName:'Luis', LastName:'Ibarra', Company:'Neoris', Address:'Col. Centro', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:'891651', Phone:'667289376', Fax:'NA', Email:'Luis@gmail.com', SupportRepId:8},
        {FirstName:'Silvia', LastName:'Lopez', Company:'', Address:'Fracc. Las Quintas', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:'907642', Phone:'6677899889', Fax:'NA', Email:'Silvia@gmail.com', SupportRepId:8},
        {FirstName:'Francisco', LastName:'Gastelum', Company:'Telmex', Address:'Fracc. Terranova', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:'12647', Phone:'6678546565', Fax:'NA', Email:'Francisco@gmail.com', SupportRepId:7},
        {FirstName:'Ulises', LastName:'Calderon', Company:'', Address:'Col. Bachigualato', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:'475342', Phone:'6677239087', Fax:'NA', Email:'Ulises@gmail.com', SupportRepId:7},
        {FirstName:'Adan', LastName:'Luna', Company:'Famsa', Address:'Col. Lomas', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:'12343', Phone:'6678989898', Fax:'NA', Email:'Adan@gmail.com', SupportRepId:8},
        {FirstName:'Humberto', LastName:'Ramirez', Company:'Telcel', Address:'Fracc. perisur', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:'4563', Phone:'6678986543', Fax:'NA', Email:'Humberto@gmail.com', SupportRepId:5},
        {FirstName:'Rodrigo', LastName:'Rochin', Company:'Ley', Address:'Fracc. Las Torres', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:'6532', Phone:'667630489', Fax:'NA', Email:'Rodrigo@gmail.com', SupportRepId:5}
    ]);

    const listas = await Playlists.bulkCreate([
        {Name:'Favoritos'},
        {Name:'De Todo Un Poco'},
        {Name:'Banda y Rock'},
        {Name:'Rock y Electronica'},
        {Name:'Jazz con Metal'},
        {Name:'Las Mas Escuchadas'},
        {Name:'Las Mas Populares'},
        {Name:'Mejores Exitos'},
        {Name:'Las 10 Mejores'},
        {Name:'Lo Mas Nuevo'}, 
        {Name:'Para El Recuerdo'},
        {Name:'Top 10 Mexico'},
        {Name:'Top 10 Global'},
        {Name:'Nuevos Lanzamientos'},
        {Name:'Banda y Jazz'},
        {Name:'Rock y Metal'},
        {Name:'Metal y Electronica'},
        {Name:'Entrenamiento'},
        {Name:'Para Dormir'},
        {Name:'Para Fiestas'}
    ]);

    const Listas_elementos = await Playlists_track.bulkCreate([
        {PlaylistId:1, TrackId:3},{PlaylistId:1, TrackId:6},{PlaylistId:1, TrackId:23},{PlaylistId:1, TrackId:32},{PlaylistId:1, TrackId:65},
        {PlaylistId:1, TrackId:2},{PlaylistId:1, TrackId:89},{PlaylistId:1, TrackId:63},{PlaylistId:1, TrackId:90},{PlaylistId:1, TrackId:98},
        {PlaylistId:2, TrackId:43},{PlaylistId:2, TrackId:11},{PlaylistId:2, TrackId:98},{PlaylistId:2, TrackId:1},{PlaylistId:2, TrackId:45},
        {PlaylistId:2, TrackId:34},{PlaylistId:2, TrackId:90},{PlaylistId:2, TrackId:66},{PlaylistId:2, TrackId:22},{PlaylistId:2, TrackId:29},
        {PlaylistId:3, TrackId:95},{PlaylistId:3, TrackId:1},{PlaylistId:3, TrackId:5},{PlaylistId:3, TrackId:99},{PlaylistId:3, TrackId:100},
        {PlaylistId:3, TrackId:2},{PlaylistId:3, TrackId:4},{PlaylistId:3, TrackId:98},{PlaylistId:3, TrackId:3},{PlaylistId:3, TrackId:97},
        {PlaylistId:4, TrackId:61},{PlaylistId:4, TrackId:15},{PlaylistId:4, TrackId:78},{PlaylistId:4, TrackId:11},{PlaylistId:4, TrackId:66},
        {PlaylistId:4, TrackId:3},{PlaylistId:4, TrackId:80},{PlaylistId:4, TrackId:19},{PlaylistId:4, TrackId:12},{PlaylistId:4, TrackId:70},
        {PlaylistId:5, TrackId:21},{PlaylistId:5, TrackId:33},{PlaylistId:5, TrackId:45},{PlaylistId:5, TrackId:56},{PlaylistId:5, TrackId:47},
        {PlaylistId:5, TrackId:22},{PlaylistId:5, TrackId:34},{PlaylistId:5, TrackId:28},{PlaylistId:5, TrackId:35},{PlaylistId:5, TrackId:57},
        {PlaylistId:6, TrackId:32},{PlaylistId:6, TrackId:34},{PlaylistId:6, TrackId:57},{PlaylistId:6, TrackId:89},{PlaylistId:6, TrackId:99},
        {PlaylistId:6, TrackId:43},{PlaylistId:6, TrackId:2},{PlaylistId:6, TrackId:1},{PlaylistId:6, TrackId:98},{PlaylistId:6, TrackId:65},
        {PlaylistId:7, TrackId:12},{PlaylistId:7, TrackId:11},{PlaylistId:7, TrackId:95},{PlaylistId:7, TrackId:23},{PlaylistId:7, TrackId:34},
        {PlaylistId:7, TrackId:41},{PlaylistId:7, TrackId:50},{PlaylistId:7, TrackId:67},{PlaylistId:7, TrackId:75},{PlaylistId:7, TrackId:82},
        {PlaylistId:8, TrackId:6},{PlaylistId:8, TrackId:14},{PlaylistId:8, TrackId:25},{PlaylistId:8, TrackId:37},{PlaylistId:8, TrackId:48},
        {PlaylistId:8, TrackId:52},{PlaylistId:8, TrackId:66},{PlaylistId:8, TrackId:78},{PlaylistId:8, TrackId:82},{PlaylistId:8, TrackId:100},
        {PlaylistId:9, TrackId:100},{PlaylistId:9, TrackId:98},{PlaylistId:9, TrackId:67},{PlaylistId:9, TrackId:37},{PlaylistId:9, TrackId:12},
        {PlaylistId:9, TrackId:11},{PlaylistId:9, TrackId:8},{PlaylistId:9, TrackId:1},{PlaylistId:9, TrackId:63},{PlaylistId:9, TrackId:88},
        {PlaylistId:10, TrackId:12},{PlaylistId:10, TrackId:90},{PlaylistId:10, TrackId:99},{PlaylistId:10, TrackId:88},{PlaylistId:10, TrackId:77},
        {PlaylistId:10, TrackId:65},{PlaylistId:10, TrackId:34},{PlaylistId:10, TrackId:22},{PlaylistId:10, TrackId:11},{PlaylistId:10, TrackId:74},
        {PlaylistId:11, TrackId:90},{PlaylistId:11, TrackId:81},{PlaylistId:11, TrackId:100},{PlaylistId:11, TrackId:86},{PlaylistId:11, TrackId:97},
        {PlaylistId:11, TrackId:84},{PlaylistId:11, TrackId:88},{PlaylistId:11, TrackId:99},{PlaylistId:11, TrackId:80},{PlaylistId:11, TrackId:89},
        {PlaylistId:12, TrackId:1},{PlaylistId:12, TrackId:100},{PlaylistId:12, TrackId:13},{PlaylistId:12, TrackId:16},{PlaylistId:12, TrackId:54},
        {PlaylistId:12, TrackId:44},{PlaylistId:12, TrackId:78},{PlaylistId:12, TrackId:94},{PlaylistId:12, TrackId:84},{PlaylistId:12, TrackId:92},
        {PlaylistId:13, TrackId:85},{PlaylistId:13, TrackId:23},{PlaylistId:13, TrackId:53},{PlaylistId:13, TrackId:8},{PlaylistId:13, TrackId:1},
        {PlaylistId:13, TrackId:2},{PlaylistId:13, TrackId:6},{PlaylistId:13, TrackId:86},{PlaylistId:13, TrackId:56},{PlaylistId:13, TrackId:89},
        {PlaylistId:14, TrackId:43},{PlaylistId:14, TrackId:34},{PlaylistId:14, TrackId:14},{PlaylistId:14, TrackId:1},{PlaylistId:14, TrackId:3},
        {PlaylistId:14, TrackId:67},{PlaylistId:14, TrackId:89},{PlaylistId:14, TrackId:98},{PlaylistId:14, TrackId:23},{PlaylistId:14, TrackId:22},
        {PlaylistId:15, TrackId:40},{PlaylistId:15, TrackId:45},{PlaylistId:15, TrackId:50},{PlaylistId:15, TrackId:55},{PlaylistId:15, TrackId:60},
        {PlaylistId:15, TrackId:80},{PlaylistId:15, TrackId:85},{PlaylistId:15, TrackId:90},{PlaylistId:15, TrackId:95},{PlaylistId:15, TrackId:100},
        {PlaylistId:16, TrackId:1},{PlaylistId:16, TrackId:7},{PlaylistId:16, TrackId:9},{PlaylistId:16, TrackId:15},{PlaylistId:16, TrackId:19},
        {PlaylistId:16, TrackId:21},{PlaylistId:16, TrackId:23},{PlaylistId:16, TrackId:28},{PlaylistId:16, TrackId:35},{PlaylistId:16, TrackId:39},
        {PlaylistId:17, TrackId:20},{PlaylistId:17, TrackId:22},{PlaylistId:17, TrackId:26},{PlaylistId:17, TrackId:30},{PlaylistId:17, TrackId:37},
        {PlaylistId:17, TrackId:40},{PlaylistId:17, TrackId:62},{PlaylistId:17, TrackId:65},{PlaylistId:17, TrackId:69},{PlaylistId:17, TrackId:78},
        {PlaylistId:18, TrackId:1},{PlaylistId:18, TrackId:2},{PlaylistId:18, TrackId:5},{PlaylistId:18, TrackId:7},{PlaylistId:18, TrackId:9},
        {PlaylistId:18, TrackId:10},{PlaylistId:18, TrackId:66},{PlaylistId:18, TrackId:77},{PlaylistId:18, TrackId:79},{PlaylistId:18, TrackId:80},
        {PlaylistId:19, TrackId:44},{PlaylistId:19, TrackId:47},{PlaylistId:19, TrackId:49},{PlaylistId:19, TrackId:51},{PlaylistId:19, TrackId:42},
        {PlaylistId:19, TrackId:54},{PlaylistId:19, TrackId:57},{PlaylistId:19, TrackId:59},{PlaylistId:19, TrackId:60},{PlaylistId:19, TrackId:45},
        {PlaylistId:20, TrackId:100},{PlaylistId:20, TrackId:1},{PlaylistId:20, TrackId:23},{PlaylistId:20, TrackId:46},{PlaylistId:20, TrackId:67},
        {PlaylistId:20, TrackId:89},{PlaylistId:20, TrackId:24},{PlaylistId:20, TrackId:56},{PlaylistId:20, TrackId:57},{PlaylistId:20, TrackId:6}
    ]);

    const facturas = await Invoices.bulkCreate([
        {CustomerId:1, InvoiceDate:'2020-05-12', BillingAddress:'Col. Guadalupe', BillingCity:'Culiacan'},
        {CustomerId:3, InvoiceDate:'2020-02-26', BillingAddress:'Col. Victoria', BillingCity:'Culiacan'},
        {CustomerId:4, InvoiceDate:'2020-01-06', BillingAddress:'Col. Centro', BillingCity:'Culiacan'},
        {CustomerId:1, InvoiceDate:'2020-03-11', BillingAddress:'Col. Guadalupe', BillingCity:'Culiacan'},
        {CustomerId:5, InvoiceDate:'2020-04-30', BillingAddress:'Col. Hidalgo', BillingCity:'Culiacan'},
        {CustomerId:2, InvoiceDate:'2020-01-30', BillingAddress:'Col. Hidalgo', BillingCity:'Culiacan'},
        {CustomerId:6, InvoiceDate:'2020-02-27', BillingAddress:'Col. Angeles', BillingCity:'Culiacan'},
        {CustomerId:6, InvoiceDate:'2020-04-12', BillingAddress:'Col. Angeles', BillingCity:'Culiacan'},
        {CustomerId:7, InvoiceDate:'2020-02-12', BillingAddress:'Fracc. Conquista', BillingCity:'Culiacan'},
        {CustomerId:8, InvoiceDate:'2020-05-01', BillingAddress:'Fracc. Terranova', BillingCity:'Culiacan'},
        {CustomerId:9, InvoiceDate:'2020-01-01', BillingAddress:'Fracc. Senderos', BillingCity:'Culiacan'},
        {CustomerId:9, InvoiceDate:'2020-03-24', BillingAddress:'Fracc. Senderos', BillingCity:'Culiacan'},
        {CustomerId:10, InvoiceDate:'2020-05-27', BillingAddress:'Col. Juarez', BillingCity:'Culiacan'},
        {CustomerId:10, InvoiceDate:'2020-03-12', BillingAddress:'Col. Juarez', BillingCity:'Culiacan'},
        {CustomerId:1, InvoiceDate:'2020-02-11', BillingAddress:'Col. Guadalupe', BillingCity:'Culiacan'},
        {CustomerId:3, InvoiceDate:'2020-05-11', BillingAddress:'Col. Victoria', BillingCity:'Culiacan'},
        {CustomerId:4, InvoiceDate:'2020-03-26', BillingAddress:'Col. Centro', BillingCity:'Culiacan'},
        {CustomerId:5, InvoiceDate:'2020-01-01', BillingAddress:'Col. Hidalgo', BillingCity:'Culiacan'},
        {CustomerId:7, InvoiceDate:'2020-04-21', BillingAddress:'Fracc. Conquista', BillingCity:'Culiacan'},
        {CustomerId:8, InvoiceDate:'2020-03-25', BillingAddress:'Fracc. Terranova', BillingCity:'Culiacan'}
    ]);
    
    const facturas_elementos = await Invoices_items.bulkCreate([
       {InvoiceId:1, TrackId:12, UnitPrice:1.50, Quantity:1},
       {InvoiceId:1, TrackId:8, UnitPrice:1.50, Quantity:1},
       {InvoiceId:1, TrackId:44, UnitPrice:1.50, Quantity:1},
       {InvoiceId:1, TrackId:89, UnitPrice:1.50, Quantity:1},
       {InvoiceId:1, TrackId:57, UnitPrice:1.50, Quantity:1}, 
       {InvoiceId:2, TrackId:32, UnitPrice:1.50, Quantity:1},
       {InvoiceId:2, TrackId:100, UnitPrice:1.50, Quantity:1},
       {InvoiceId:2, TrackId:1, UnitPrice:1.50, Quantity:1},
       {InvoiceId:2, TrackId:23, UnitPrice:1.50, Quantity:1},
       {InvoiceId:2, TrackId:10, UnitPrice:1.50, Quantity:1},
       {InvoiceId:3, TrackId:54, UnitPrice:1.50, Quantity:1},
       {InvoiceId:3, TrackId:76, UnitPrice:1.50, Quantity:1},
       {InvoiceId:3, TrackId:23, UnitPrice:1.50, Quantity:1},
       {InvoiceId:3, TrackId:1, UnitPrice:1.50, Quantity:1},
       {InvoiceId:3, TrackId:78, UnitPrice:1.50, Quantity:1},
       {InvoiceId:4, TrackId:11, UnitPrice:1.50, Quantity:1},
       {InvoiceId:4, TrackId:7, UnitPrice:1.50, Quantity:1},
       {InvoiceId:4, TrackId:40, UnitPrice:1.50, Quantity:1},
       {InvoiceId:4, TrackId:65, UnitPrice:1.50, Quantity:1},
       {InvoiceId:4, TrackId:50, UnitPrice:1.50, Quantity:1},
       {InvoiceId:5, TrackId:23, UnitPrice:1.50, Quantity:1},
       {InvoiceId:5, TrackId:65, UnitPrice:1.50, Quantity:1},
       {InvoiceId:5, TrackId:89, UnitPrice:1.50, Quantity:1},
       {InvoiceId:5, TrackId:90, UnitPrice:1.50, Quantity:1},
       {InvoiceId:5, TrackId:12, UnitPrice:1.50, Quantity:1},
       {InvoiceId:6, TrackId:24, UnitPrice:1.50, Quantity:1},
       {InvoiceId:6, TrackId:66, UnitPrice:1.50, Quantity:1},
       {InvoiceId:6, TrackId:90, UnitPrice:1.50, Quantity:1},
       {InvoiceId:6, TrackId:91, UnitPrice:1.50, Quantity:1},
       {InvoiceId:6, TrackId:13, UnitPrice:1.50, Quantity:1},
       {InvoiceId:7, TrackId:34, UnitPrice:1.50, Quantity:1},
       {InvoiceId:7, TrackId:56, UnitPrice:1.50, Quantity:1},
       {InvoiceId:7, TrackId:76, UnitPrice:1.50, Quantity:1},
       {InvoiceId:7, TrackId:67, UnitPrice:1.50, Quantity:1},
       {InvoiceId:7, TrackId:77, UnitPrice:1.50, Quantity:1},
       {InvoiceId:8, TrackId:12, UnitPrice:1.50, Quantity:1},
       {InvoiceId:8, TrackId:54, UnitPrice:1.50, Quantity:1},
       {InvoiceId:8, TrackId:23, UnitPrice:1.50, Quantity:1},
       {InvoiceId:8, TrackId:1, UnitPrice:1.50, Quantity:1},
       {InvoiceId:8, TrackId:90, UnitPrice:1.50, Quantity:1},
       {InvoiceId:9, TrackId:76, UnitPrice:1.50, Quantity:1},
       {InvoiceId:9, TrackId:78, UnitPrice:1.50, Quantity:1},
       {InvoiceId:9, TrackId:67, UnitPrice:1.50, Quantity:1},
       {InvoiceId:9, TrackId:79, UnitPrice:1.50, Quantity:1},
       {InvoiceId:9, TrackId:2, UnitPrice:1.50, Quantity:1},
       {InvoiceId:10, TrackId:23, UnitPrice:1.50, Quantity:1},
       {InvoiceId:10, TrackId:21, UnitPrice:1.50, Quantity:1},
       {InvoiceId:10, TrackId:54, UnitPrice:1.50, Quantity:1},
       {InvoiceId:10, TrackId:18, UnitPrice:1.50, Quantity:1},
       {InvoiceId:10, TrackId:100, UnitPrice:1.50, Quantity:1},
       {InvoiceId:11, TrackId:76, UnitPrice:1.50, Quantity:1},
       {InvoiceId:11, TrackId:78, UnitPrice:1.50, Quantity:1},
       {InvoiceId:11, TrackId:98, UnitPrice:1.50, Quantity:1},
       {InvoiceId:11, TrackId:12, UnitPrice:1.50, Quantity:1},
       {InvoiceId:11, TrackId:11, UnitPrice:1.50, Quantity:1},
       {InvoiceId:12, TrackId:1, UnitPrice:1.50, Quantity:1},
       {InvoiceId:12, TrackId:3, UnitPrice:1.50, Quantity:1},
       {InvoiceId:12, TrackId:87, UnitPrice:1.50, Quantity:1},
       {InvoiceId:12, TrackId:14, UnitPrice:1.50, Quantity:1},
       {InvoiceId:12, TrackId:57, UnitPrice:1.50, Quantity:1},
       {InvoiceId:13, TrackId:9, UnitPrice:1.50, Quantity:1},
       {InvoiceId:13, TrackId:10, UnitPrice:1.50, Quantity:1},
       {InvoiceId:13, TrackId:90, UnitPrice:1.50, Quantity:1},
       {InvoiceId:13, TrackId:4, UnitPrice:1.50, Quantity:1},
       {InvoiceId:13, TrackId:65, UnitPrice:1.50, Quantity:1},
       {InvoiceId:14, TrackId:10, UnitPrice:1.50, Quantity:1},
       {InvoiceId:14, TrackId:15, UnitPrice:1.50, Quantity:1},
       {InvoiceId:14, TrackId:6, UnitPrice:1.50, Quantity:1},
       {InvoiceId:14, TrackId:85, UnitPrice:1.50, Quantity:1},
       {InvoiceId:14, TrackId:23, UnitPrice:1.50, Quantity:1},
       {InvoiceId:15, TrackId:43, UnitPrice:1.50, Quantity:1},
       {InvoiceId:15, TrackId:2, UnitPrice:1.50, Quantity:1},
       {InvoiceId:15, TrackId:56, UnitPrice:1.50, Quantity:1},
       {InvoiceId:15, TrackId:87, UnitPrice:1.50, Quantity:1},
       {InvoiceId:15, TrackId:89, UnitPrice:1.50, Quantity:1},
       {InvoiceId:16, TrackId:89, UnitPrice:1.50, Quantity:1},
       {InvoiceId:16, TrackId:45, UnitPrice:1.50, Quantity:1},
       {InvoiceId:16, TrackId:23, UnitPrice:1.50, Quantity:1},
       {InvoiceId:16, TrackId:67, UnitPrice:1.50, Quantity:1},
       {InvoiceId:16, TrackId:12, UnitPrice:1.50, Quantity:1},
       {InvoiceId:17, TrackId:1, UnitPrice:1.50, Quantity:1},
       {InvoiceId:17, TrackId:32, UnitPrice:1.50, Quantity:1},
       {InvoiceId:17, TrackId:45, UnitPrice:1.50, Quantity:1},
       {InvoiceId:17, TrackId:67, UnitPrice:1.50, Quantity:1},
       {InvoiceId:17, TrackId:3, UnitPrice:1.50, Quantity:1},
       {InvoiceId:18, TrackId:34, UnitPrice:1.50, Quantity:1},
       {InvoiceId:18, TrackId:54, UnitPrice:1.50, Quantity:1},
       {InvoiceId:18, TrackId:38, UnitPrice:1.50, Quantity:1},
       {InvoiceId:18, TrackId:59, UnitPrice:1.50, Quantity:1},
       {InvoiceId:18, TrackId:39, UnitPrice:1.50, Quantity:1},
       {InvoiceId:19, TrackId:2, UnitPrice:1.50, Quantity:1},
       {InvoiceId:19, TrackId:5, UnitPrice:1.50, Quantity:1},
       {InvoiceId:19, TrackId:7, UnitPrice:1.50, Quantity:1},
       {InvoiceId:19, TrackId:14, UnitPrice:1.50, Quantity:1},
       {InvoiceId:19, TrackId:78, UnitPrice:1.50, Quantity:1},
       {InvoiceId:20, TrackId:32, UnitPrice:1.50, Quantity:1},
       {InvoiceId:20, TrackId:84, UnitPrice:1.50, Quantity:1},
       {InvoiceId:20, TrackId:39, UnitPrice:1.50, Quantity:1},
       {InvoiceId:20, TrackId:96, UnitPrice:1.50, Quantity:1},
       {InvoiceId:20, TrackId:2, UnitPrice:1.50, Quantity:1}
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
