module.exports = (req, res) => {
    res.status(404).json({code: 404, message: "Error, ruta no encontrada"});
    
}