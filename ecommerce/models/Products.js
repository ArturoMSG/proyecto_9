import mongoose from "mongoose";  //se importa por que trabajarenos con este entorno para basr de datos mongo


//este es el formato, plantilla o esquema que va atener los objetos de la base de datos, es como estructuro 
//los datos que voy a almacenar en la base de daos
const productSchema = new mongoose.Schema(
    {
    id: {type: String, require: true, unique: true},   // es tipo texto, es requerido a fuerzas y es unico no puede repetirse
    title: {type: String, require: true},
    image: {type: String, require: true},
    price: {type: Number, require: true}, //tipo numero y es requerido a fuerzas
    description: {type: String, require: true}
    },
    {
        timestamps: true
    } // sirve para saber cuando un producto (dato) fue creado y pone la fecha en forma automatica

)
// el producto se le asigna el valor de mongoos,carpeta.archivo o  models como se llama la carpeta
const Product = mongoose.models.Product || mongoose.models('Product', productSchema)
export default Product  //exporto la variable  como modelo