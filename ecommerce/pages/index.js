import Layout from "../components/Layout"
import Products  from "../components/Products"
import { useState, useEffect } from "react" //importacion de hooks de react



export default function Home() {
// voy a tener tres estados
  const[products, setProducts]=useState([])//estado de los productos
  const[loading, setLoading]=useState(false) //aparece cargando cuando se estan cargando los productos antes de mostrarlos
  const[error, setError]=useState(false) // caso de error por que no se cargaron los productos


  useEffect(()=>{
    fetchProducts()
  },[])

  async function fetchProducts() {
    try{
      setLoading(true)  //primero indicar que mis productos se estan cargando
      setError(false) //no muestra error
      const response =await fetch('/api/products')
      const newProducts =await response.json() 
      setProducts(newProducts)
    }
    catch (err){    
     setError(true) //si no se cargo mis productos ira a esta parte indicando el reeor
    }
    setLoading(false) //si mis productos se cargaron pondra el cargando en falso y mostrata mis produtos, 
      //se ejecuta despues de try y espues de catch
  }

  if (error){
   return<div> error al cargar</div> //si error es verdadero mostrara esto
  }

  if(loading){
   return <div> cargando. .. ... .. . . .</div> //si loading es verdadero mostrara
  }


  return (
    <>
    <Layout>
      <Products data={products}/> {/* esto por que tya esta consumiendo una api, paso props llamada tada, 
      con el valos de mis productos*/}
    </Layout>
                 
    </>
  )
}
