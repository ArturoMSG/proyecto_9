// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//archivo para probar la conexion a la base de datos mongo que esta en el archivo /ecommerce/utils/db.js

import db from '../../utils/db' // se importa el archivo donde esta la configuracion de conexion

export default async function handler(req, res) { //la funcion debe ser asincrona
  //se pone las funciones exportadas del archivo de conexion
  await db.connect() //funcion  connect
  await db.disconnect() // funcion disconect
  res.status(200).json({ name: 'prueba', descripcion: 'probando la conexion' }) //esta es la respuesta a laconexion a la base de datos
}
