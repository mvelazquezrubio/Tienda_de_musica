const routes = require("express").Router();

module.exports = (models) => {
    //Obtiene los albums del artista.
    routes.get("/", async(req, res)=> {
        const idArtist = req.query.artistId;
        const Albums = await models.modelalbums.findAll({
            attributes: ["AlbumId", "Title", "ArtistId"],
            where: { ArtistId: idArtist}
        });

        res.send(Albums);
    });

    return routes;
}