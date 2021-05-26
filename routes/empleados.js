const express = require('express');
const empleados = express.Router();
const db = require("../config/database");

//Crear empleado
empleados.post("/", async (req, res) => {
    let idEmpleado= await db.query("SELECT COUNT(*) from empleado");
    idEmpleado = idEmpleado[0]['COUNT (*)'] + 1;
    const {nombre, apellido, telefono, email, direccion} = req.body;

    if(nombre && apellido && telefono && email && direccion){
        let query = "INSERT INTO empleado (id, nombre, apellido, telefono, email, direccion)";
        query += ` VALUES ('${idEmpleado}', '${nombre}', '${apellido}', '${telefono}', '${email}', '${direccion}')`;
        let rows = await db.query(query);
        
        if(rows.affectedRows == 1){
            res.status(200).json({code: 1, message: "Empleado registrado con éxito"});
        }
        else{
            res.status(200).json({code: 4, message: "Ocurrio un error al crear al Empleado"});
        }   
    }
    else{
        res.status(200).json({code: 3, message: "Faltan campos por llenar"});
    }
})

//Buscar empleado por su nombre
empleados.get("/:nombre([A-Za-z]+)", async (req, res) => {
    const nombre = req.params.nombre.toLowerCase();

    let query = `SELECT * FROM empleado WHERE nombre = "${nombre}"`;

    const rows = await db.query(query);

    (rows[0]) ? res.status(200).json({code: 1, message: rows[0]}): res.status(200).json({code: 2, message: "No hay empleados con ese nombre"});
})

//modificar empleado por su id
empleados.patch("/:id([0-9]{1,3})",  async (req, res) =>{
    let query = `UPDATE empleado SET id = id`;

    const {nombre, apellido, telefono, email, direccion} = req.body;

    if(nombre) query += `, nombre = "${nombre}"`;
    if(apellido) query += `, apellido = "${apellido}"`;
    if(telefono) query += `, telefono = "${telefono}"`;
    if(email) query += `, email = "${email}"`;
    if(direccion) query += `, direccion = "${direccion}"`;
    query += ` where id = ${req.params.id}`;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        res.status(200).json({code: 1, message: "Se actualizó el empleado correctamente"});
    }
    else{
        res.status(200).json({code: 2, message: "No se encontró ningun empleado con ese id"});
    }
})
//Borrar un empleado por su id
empleados.delete("/:id([0-9]{1,3})", async (req, res) => {
    let query = "DELETE FROM empleado WHERE id = ";
    query += req.params.id;

    const rows = await db.query(query);

    if(rows.affectedRows == 1){
        res.status(200).json({code: 1, message: "Empleado borrado con éxito"});
    }
    else{
        res.status(200).json({code: 2, message: "No se encontró ningun empleado con ese id"});
    }
})

module.exports = empleados;