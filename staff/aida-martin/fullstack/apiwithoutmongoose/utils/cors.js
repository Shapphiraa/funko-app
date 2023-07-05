module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')

  next()
}

//Esto se hace para evitar error de conexión CORS (conflicto de acceso por llamar datos desde fuera del dominio del servidor, así con estas cabeceras acepta otros dominios/puertos). El next es para que siga después del use a donde toque
