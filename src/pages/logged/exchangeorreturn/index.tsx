import {
    Box,
    Flex,
    SimpleGrid,
    Text,
    usePrefersReducedMotion
} from '@chakra-ui/react'
import React from 'react'
import { Header } from '../../../components/Header'
import { SideBar } from '../../../components/logged/Sidebar'
import { itemAnimationLeft } from '../../../styles/animation'
import { withSSRAuth } from '../../../utils/withSSRAuth'

export default function ExchangeOrReturn() {
    const prefersReducedMotion = usePrefersReducedMotion()

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationLeft} 1s`
    return (
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <SideBar animationLeft={animationLeft} />

                <Box flex="1">
                    <SimpleGrid flex="1" gap="4" minChildWidth="320px">
                        <Box
                            p={['6', '8']}
                            bg="gray.800"
                            borderRadius={8}
                            pb="4">
                            <Text fontSize="lg" mb="4">
                                trocae e devolução
                            </Text>
                        </Box>
                        <Box
                            p={['6', '8']}
                            bg="gray.800"
                            borderRadius={8}
                            //pb="4"
                        >
                            <Text fontSize="lg" mb="4">
                                devolver pedido 02-784846424voltar
                            </Text>
                        </Box>
                    </SimpleGrid>
                    <SimpleGrid
                        flex="1"
                        mt={10}
                        gap="4"
                        minChildWidth="220px"></SimpleGrid>
                </Box>
            </Flex>
        </Flex>
    )
}

/*
export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx)

  //const cookies = parseCookies(ctx)
  ///const token = cookies[logado.nameToken]
  // const user_id = decode<{ sub: string }>(token)

  //console.log('ServerSide', ctx.req.cookies)

  try {
    //const res = await apiClient.get(`users/me/${user_id}`)
  } catch (err) {
    /*return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
})*/
/*
export const getServerSideProps = withSSRAuth(
    async ctx => {
        return {
            props: {}
        }
    },
    {
        roles: ['Administrador']
    }
)
*/

export const getServerSideProps = withSSRAuth(
    async ctx => {
        return {
            props: {}
        }
    },
    {
        roles: ['Colaborador']
    }
)
