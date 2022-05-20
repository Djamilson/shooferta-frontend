import React from 'react'

import { Flex, Box, Text, usePrefersReducedMotion } from '@chakra-ui/react'

import { Header } from '../../../components/Header'
import { SideBar } from '../../../components/logged/Sidebar'
import { Request as MyRequest } from '../../../components/Request'
import { withSSRGuest } from '../../../utils/withSSRGuest'
import { Title } from '../../../components/Title'
import { SubTitle } from '../../../components/SubTitle'
import { withSSRAuth } from '../../../utils/withSSRAuth'
import { itemAnimationLeft } from '../../../styles/animation'

export default function Requests() {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animationLeft = prefersReducedMotion
      ? undefined
      : `${itemAnimationLeft} 1s`
    return (
        <Flex direction="column" flex="1" bg="cinza.400">
            <Header />
            <Flex w="100%" my="6" maxWidth={1440} mx="auto" px="6">
                <SideBar animationLeft={animationLeft} />

                <Box flex="1" bg="white.900" p={6}>
                    <Box
                        mt={{ base: 4, md: 0 }}
                        color="cinza.650"
                        ml={{ md: 6 }}>
                        <Title> último pedido</Title>

                        <SubTitle>
                            aqui tá seu pedido mais recente, acompanhe todos
                            pelo menu lateral meus pedidos
                        </SubTitle>
                    </Box>
                    <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                        <MyRequest />
                        <MyRequest />
                        <MyRequest />
                        <MyRequest />
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}

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
