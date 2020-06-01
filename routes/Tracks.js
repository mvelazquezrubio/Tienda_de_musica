const routes = require("express").Router();
const Sequelize = require("sequelize");
const Filtro = Sequelize.Op;

module.exports = (models) => {
    //Obtiene todas las pistas del artista.
    routes.get("/", async(req, res)=> {
    const idArtist = req.query.artist;
    const albums = await models.modelalbums.findAll({
        attributes: ["AlbumId"],
        where: { ArtistId: idArtist},
        raw: true
    });
    const Tracks = await models.modeltracks.findAll({
        attributes: ["TrackId", "Name", "AlbumId", "MediaTypeId", "GenreId", "Composer", "Milliseconds", "Bytes", "UnitPrice"],
        where: {
            [Filtro.or] : albums  
        },
        raw: true
    });
    res.send(Tracks);
});

    return routes;
}