const routes = require("express").Router();
const Sequelize = require("sequelize");
const Filtro = Sequelize.Op;

module.exports = (models) => {
    //Obtiene todas las playlists donde esta el track.
    routes.get("/:track", async(req, res)=> {
    const idTrack = req.params.track;
    const playlists = await models.modelplaylist_tracks.findAll({
        attributes: ["PlaylistId"],
        where: { TrackId: idTrack},
        raw: true
    });
    const nombres = await models.modelplaylists.findAll({
        attributes: ["PlaylistId", "Name"],
        where: {
            [Filtro.or] : playlists
        }
    });
    res.send(nombres);
});

    return routes;
}