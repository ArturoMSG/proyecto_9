import Head from 'next/head'
import { 
  Box,
  Flex,
  Text,
  Stack,
  Button, 
  useColorModeValue,    
  Center

} from '@chakra-ui/react'


const Layouts = () => {
  return (
    <div>
        <Head>
          <title>E-commerce App</title>
        </Head>

        <Box>
          <Flex
           gb={useColorModeValue('write', 'gray.600')}
           minH={'60px'}
           py={{base:2}}
           px={{base:4}}
           borderTop={1}
           borderBottom={1}
           borderStyle={'solid'}
           borderColor={useColorModeValue('gray.200', 'gray.700')}
           align={'Center'}
          > 
            <Flex
            flex={{base:1}}
            justify={{base:'center', md: 'start'}}
            >
             <text>Logo</text>
             </Flex>
            <Stack
            flex={{base:1, md: 0}}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
            >
              <Button 
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              href={'#'}
              >Sing In</Button>
              <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              variant={'link'}
              href={'#'}
              bg={'pink.400'}
              _hover={{ bg: "pink.300" }}
              >Sing up</Button>
            </Stack>

          </Flex>
        </Box>

    </div> 
  )
}

export default Layouts