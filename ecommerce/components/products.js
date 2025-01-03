import React from 'react'
//import {data} from '../utils/data' // se cometa por que ya estoy usando la base de datos
import { Image } from '@chakra-ui/react'
import {
  Grid,
  GridItem,
  Card,
  Box
} from '@chakra-ui/react'
import  Link  from 'next/link'
// import Image from 'next/image' otra forma de hacerlo

const Products = ({data}) => {
  return (
    <div>
      <Grid 
      templateColumns={{base: "1fr", lg:"repeat(4, 1fr)"}} 
      gap={6}
      >
        {data.map((products) => (
          <GridItem
          key={products.id}
          colSpan={1}
          >
            <Card>
              <Link href={`/product/${products.id}`}>
                <Image
                  key={products._id}
                  src={`/images${products.image}`}
                  alt={products.title}
                  width={230}
                  height={230}
                  style={{ objectFit: "cover" }}
                />
                <Box py={1} px={1}> 
                  <h3>{products.title}</h3>
                  <div>{products.description}</div>
                  <div>${products.price}.00</div>
                </Box>
              </Link>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
}

export default Products