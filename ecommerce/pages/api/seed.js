//se crea un router
import { createRouter } from 'next-connect' // para crear el router
import db from '../../utils/db' // se importa porque aqui se tienen la conexion y desconexion  a la base de datos
import { data } from '../../utils/data' //importo los datos que voy a utilizar para mi base de datos
import Product from '../../models/Products'; // se importa el modelo que se acaba de crear 
//modelo para los objetos de la base datos



const router = createRouter(); // creacion del router

router //menejdor de la ruta
  .get(async(req, res) => {
    await db.connect() //conecta a la base de datos
    await Product.deleteMany()//elimina todos los documentos en la colexion de productos
    await Product.insertMany(data.products)//inserta los productos que vienen desde data
    await db.disconnect() //desconecta la base de datos
    res.send('FUNCIONA!!!!!') // enviar una respuesta indicando que funciona mi router
  })

  //  manejador de errores y rutas no encontradas
export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack); //imprimo el error en la consola
    res.status(err.statusCode || 500).end(err.message); // envia una respuesta de error
  },
  onNoMatch: (req, res) => {
    // enviar una respuesta 404 si la ruta no coincide
    res.status(404).end('Page is not Found!')
  }
});