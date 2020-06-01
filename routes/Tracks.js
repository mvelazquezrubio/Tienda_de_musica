const routes = require("express").Router();

module.exports = (models) => {
    //Obtiene todas las pistas del artista.
    routes.get("/", async(req, res)=> {
    const idArtist = req.query.artist;
    const Artist = await models.modelartists.findByPk(idArtist);
   // const albums = await Artist.getAlbums().getTracks();
    //const Tracks = await albums.getTracks();
    res.send(Artist);
});

    return routes;
}