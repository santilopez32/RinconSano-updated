const express = require("express")
const app = express()
const path = require("path")
const session = require('express-session');
const recordameMiddleware = require("./middlewares/recordameMiddleware")
const cookieParser = require('cookie-parser');


app.use(recordameMiddleware)
app.use(cookieParser())
app.use(session( {secret: "Nuestro mensaje secreto"}));
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, '..', 'public')))
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
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/', mainRoutes);
app.use("/administrar", adminRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

//app.use("/", mainRoutes)
//app.use("/user", userRoutes)





