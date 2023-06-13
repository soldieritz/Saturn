const app = require("./server/express");
const colors = require("colors")

require("./util/middleware/database")
app.listen(app.get("port"), () => {
  console.log("La pagina esta en funcionamiento".green);
  console.log("Esperando al bot....".yellow)
});