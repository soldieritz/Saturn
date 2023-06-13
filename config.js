module.exports = {
    url: "http://127.0.0.1:3000",
    client: {
        id: "1117114618331009144",
        token: process.env.token,
        callbackURL: "https://saturnlist.onrender.com/login",
        scope: ["identify", "guilds.join"],
        secret: "MK8LEn6ioGob2XwCc2VB2sMSMnPibtV6"
    },
    channels: {
        accepted: "1117442170564120579",
        newbot: "1117442170564120579",
        denied: "1117442170564120579",
        certified: "1117442170564120579",
        verify: "1117442170564120579",
        deleted: "1117442170564120579",
        edited: "1117442170564120579",
        resend: "1117442170564120579",
        staff: {
            newbot: "1117880020824768565",
            resend: "1117880020824768565",
            edit: "1117880020824768565"
        }
    },
    user: {
        mongo: "mongodb+srv://soldieritzdev:soldieritzdev@cluster0.ervygsm.mongodb.net/?retryWrites=true&w=majority",
        tags: [
            { name: "Utilidad", value: "utilidad"}, { name: "Diversion", value: "diversion"},
            { name: "Configuracion", value: "configuracion"}, { name: "Bienvenidas", value: "bienvenidas"},
            { name: "Imagenes", value: "imagenes"}, { name: "Invitaciones", value: "invitaciones"},
            { name: "Moderacion", value: "moderacion"}, { name: "Multi-funcion", value: "multi funcion"},
            { name: "Niveles", value: "leveling"}, { name: "Autoroles", value: "autoroles"},
            { name: "Juegos", value: "juegos"}, { name: "Proteccion", value: "proteccion"},
            { name: "Anti-raid", value: "anti raid"}, { name: "Musica", value: "musica"},
            { name: "Memes", value: "memes"}, { name: "Verificacion", value: "verificacion"},
            { name: "Reaccion de roles", value: "Reaccion Roles"}, { name: "24/7 Soporte", value: "24-7 soporte"},
            { name: "Sorteos", value: "sorteos"}, { name: "General", value: "general"},
            { name: "Anime", value: "anime"}, { name: "Media", value: "media"},
        ]
    }
}
