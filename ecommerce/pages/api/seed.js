//se crea un router
import { createRouter } from 'next-connect'
import db from '../../utils/db'
import { data } from '../../utils/data'


const router = createRouter();

router
  .get((req, res) => {
  
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