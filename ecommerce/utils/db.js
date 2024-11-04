import mongoose from 'mongoose'

const connection={} //variable de control para saber si esta conectado o desconectado a la base de control

async function connect(){ //funcion para conectar la base de datos debe ser asincrona
    if (connection.isConnected){ //pregunto si la coneccion esta establecida a traves de la variable conection
        console.log('Conexion exitosa') //si la conexion esta ya establecida pongo que conexion exitosa
        return  // se corta el flujo de la ejecucion del codigo
    }
    if (mongoose.connection.leng >0) //preguntamos si mongoose.connection leng es mayor a cero es que ya hay una coneccion
        // si no es mayor a cero es que no hay conexion
        {connection.isConnected=mongoose.connection[0].readyState //  cuando la veriable mongoose.connection leng es mayor a cero
        // a la variable connection.isConnected se le asigna el valor
        // de mongoose.connection[0].readyState indicando que ya hay una coexion establecida
        if (connection.isConnected===1) //si la variable mongoose.connection.leng es gual a uno se indica que ya esta conectado
            {console.log ('Usuario ya esta conectado') // indicacion que ya esta conectado
            return //se corta el flujo de ejecucion  del codigo
        }
        await mongoose.disconnect() //se desconecta la base de datos si no se ha cortado el flujo de codigo
    }
    //conexion a la base de datos con variable de entorno
    const db =await mongoose.connect(process.env.MONGODB_URI); //estableceuna conexion a la base de datos
    console.log ('nueva conexion') // informa que se realizo una nueva conexion
    connection.isConnected=db.connections[0].readyState // asigna al avariable
    //connection.isConnected el valor de db.connection[0].readyState que debe ser uno indicando que ya se conecto a la base de datos
}

async function disconnect(){ // funcion para desconectar la base de datos, debe ser asimcrona
    if (process.env.NODE_ENV==='production') //si la variable process.env.NODE_ENV es igual a 'production'
    // indica qu la base esta conectada entonces 
    {await mongoose.disconnect()// si esta conectada entonces desconecta la base de datos
    connection.isConnected=false} //como desconecto entonces a la variable  connection.isConnected asiganle el valor 'false'
    else{ console.log('estas conectado')} // si no hizo la desconexion indicara que esta conectado (se brinco el paso anterior)
}
//esta funcion sirve como trasformador de documentos (registros) que es en lo que trabaja mongodb
//en objetos, esto sucede en el contexto de bases de datos
function convertDocToObj(doc){ 
    doc._id=doc._id.toString() //convirte un valor de la propiedad "id" a una cadena de caracteres para trabajarla mejor
    //el timeStamp de models/Products.j tambien lo convertimos para su uso en una cadena de caractres
    doc.createdAt=doc.createdAt.toString() //fech DE CREACION DE DOCUMENTO
    doc.updatedAt=doc.updatedAt.toString()//FECHA DE MODIFICACION DE DOCUMETO
    return doc //devuelve el objeto modificado

}

const db={connect, disconnect, convertDocToObj} //agrego el objeto para exportarlo
export default db