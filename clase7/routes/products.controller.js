var express = require('express');
var router = express.Router();

const db_knex = require("../config/database");
const ProductServiceDB = require('../services/ProductsServiceDB');
const DB = new ProductServiceDB(db_knex,"productos")

router.get("/",async (req, res, next) => {
    try {
        let response = await DB.getAll();
        res.json(response);     
    } catch (error) {
        console.log(error)
    } 
});

router.get("/:id", async (req,res,next)=>{
    let id = req.params.id || {}
    try {
        let response = await DB.getById(id)
        if(response == ''){
            res.json({error: `El producto con id ${id} no se encuentra en la base de datos`});
        }else {
            res.json(response);
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res, next)=>{
    let product = req.body;
    let response = await DB.create(product);
    res.json(response);
});

router.put("/:id", async(req, res, next) => {
    let id = req.params.id || {};
    let body = req.body;
    let response = await DB.update(id,body);
    res.json(response);
});

router.delete("/:id", async (req, res, next) =>{
    let id = req.params.id || {};
    await DB.deleteById(id);
    res.send(`El archivo con id ${id} fue eliminado`)
});


module.exports = router;