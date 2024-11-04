import React from 'react'
import { useRouter } from 'next/router'
// import { data } from '../../utils/data' // esto se quita cuendo ya no estamos usando los datos de data,json,
// por que nos conectamos a la base de datos. por eso ya no es nevesario
import db from '../../utils/db'
import {
    Container,
    SimpleGrid,
    Flex,
    Image,
    Heading,
    Stack,
    Box,
    Text,
    useColorModeValue,
    Button
} from '@chakra-ui/react'
import Product from '../../models/Products'// se tiene que importar el archivo donde esta
import Products from '../../components/Products'
// el modelo ya que se usa la api o base de datos


const ProductPage = (props) => {
    const router = useRouter() // es un hook de next, me va permitir a mi moverme entre rutas
    const {id} = router.query
    const {product} = props
    if (!product) {
        return <div>Product not found</div>
    }
  return (
    <Container maxW={'container.xl'} mt={2}>
        <SimpleGrid columns={[1,2]} spacing={2}>

            <Flex>
                <Image
                 src={`/images/${product.image}`}
                 rounded={'md'}
                 alt={product.title}
                 fit={'cover'}
                 align={'center'}
                 h={'100%'}
                 w={{base: '100%', sm:'400px', md:'500px', lg:'600px'}}
                />
            </Flex>

            <Stack spacing={{base: 6, md:10}}>
                <Box>
                    <Heading
                    fontWeight={600}
                    fontSize={{base: '2xl', sm: '4xl', lg:'3xl'}}
                    >
                        {product.title}
                    </Heading>
                    <Text 
                    color={useColorModeValue('gray.900' , 'gray.400')}
                    fontWeight={300}
                    fontSize={'2xl'}
                    >
                        {`$  ${product.price} USD`}
                    </Text>
                </Box>

                <Text
                 color={useColorModeValue('gray.500' , 'gray.300')}
                 fontSize={'lg'}
                 mb={'10'}
                >{product.description}
                </Text>
                
                <Flex alignItems={'end'}>
                    <Button
                    rounded={'md'} w={'full'} size={'lg'} py={'3'}
                    bg={useColorModeValue('gray.900' , 'gray.50')}
                    color={useColorModeValue('white' , 'gray.900')}
                    textTransform={'uppercase'}
                    _hover={{bg: 'green.400'}}
                    _focus={{boxShadow: 'outline'}}
                    >
                        Add to cart
                    </Button>
                </Flex>
            </Stack>


        </SimpleGrid>
    </Container>
  )
}



//se crea un server-side proxi , es proxi del lado del servidor, podemos 
//modificar solicitudes y respuesta conforme nuestra aplicacion lo requiera.
//intermediaro entre las solicitudes del cliente y el servidor destino
//el puede filtar contenido malisioso y no mostrar ip, mantener datos mas solicitados para mejor respuesta
//para nosotros es para renviar solicitudes del cliente a la servidores correspondientes y devolver las respuestas
//Server-side proxy
// reenviar las solicitudes del cliente a los servidores correspondientes
// y luego devolver las respuestas de esos servidores al cliente.
export async function getServerSideProps(context){

    //este server estare los datos o parametros de la url desde el contexto
    const{params}= context; //se tiene que crear!!!!
    const{id}=params

    //conexion a la base de datos por que ya no los estoy consumiendo de  import { data } from '../../utils/data'
    //linea que comente
    await db.connect()

    //si quiero hacer la busqueda de un solo producto 
    //busco un producto en la base de datos con id proporcionado y lo convierte a objeto de javascript
    //Busca un producto en la base de datos con el id proporcionado y lo convierte a un objeto de Javascript
    const product = await Product.findOne({id}).lean()

    //desconexion a la base de datos
    await db.disconnect()

    return{
        //devuelve el producto encontrado como props para ser usado en el componente de la pagina (url)
        //en este caso en components/P{roducts
        props:{
            product:db.convertDocToObj(product) //es la funcion que cree en db.js y como ya esta
            // importado este archivo no requiero hacerlo nuevamente
        }
    }
}

export default ProductPage