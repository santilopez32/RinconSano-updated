const express = require("express")
const app = express()
const path = require("path")
const session = require('express-session');
const recordameMiddleware = require("./middlewares/recordameMiddleware")
const cookieParser = require('cookie-parser');
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")



app.use(recordameMiddleware)
app.use(cookieParser())
app.use(session( {
    secret: "Nuestro mensaje secreto",
    resave: false,
    saveUninitialized: false,
}));
app.use(userLoggedMiddleware)

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
const productsApiRoutes = require('./routes/apis/productsApiRoutes');
const usersApiRoutes = require('./routes/apis/usersApiRoutes');

app.use('/', mainRoutes);
app.use("/administrar", adminRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.use('/api',productsApiRoutes);
app.use('/api',usersApiRoutes);

//app.use("/", mainRoutes)
//app.use("/user", userRoutes)





