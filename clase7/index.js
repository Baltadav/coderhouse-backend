const express = require('express');
let {config} = require("./config");
let cors = require("cors");
const app = express();
const PORT = config.port;
const productos = require("./routes/products.controller")

//Middlewares
app.use(cors("*"));

//Settings
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('json spaces', 2)

//Routes
app.use('/api/productos', productos)

app.listen(PORT, (err) => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
