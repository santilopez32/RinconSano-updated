const express = require("express")
const app = express()
const path = require("path")
const session = require('express-session');

app.use(session( {secret: "Nuestro mensaje secreto"}));
app.use(express.urlencoded({ extended: false }))
app.use(express.static("./public"))
app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo puerto 3000');
})

// Template engine
app.set("view engine", "ejs")

//Routers
//const mainRoutes = require("./routes/mainRoutes")
//const userRoutes = require("./routes/userRoutes")
//Rutas
const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

//app.use("/", mainRoutes)
//app.use("/user", userRoutes)





