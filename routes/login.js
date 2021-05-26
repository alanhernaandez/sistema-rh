const express = require("express");
const jwt = require("jsonwebtoken");
const login = express.Router();
const db = require("../config/database");

login.post("/", async (req,res) => {
    const {correo, contraseña} = req.body;

    const query = `SELECT * FROM usuario WHERE correo = "${correo}" and contraseña = "${contraseña}"`;
    const rows = await db.query(query);
    if(rows[0]){
        const token = jwt.sign({
            id: rows[0].id,
            correo: rows[0].correo
        }, "debugkey");
        res.status(200).json({code: 200, message: token});
    }
    else{
        res.status(200).json({code: 401, message: "Correo y/o contraseña incorrectos"});
    }
})

module.exports = login;
