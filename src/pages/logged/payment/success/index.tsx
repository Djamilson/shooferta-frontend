import React, { useRef } from 'react'

import { Flex, Box } from '@chakra-ui/react'
import { Player } from '@lottiefiles/react-lottie-player'

import { withSSRAuth } from '../../../../utils/withSSRAuth'
import successAnimation from '../../../../../public/85744-success.json'
import personAnimation from '../../../../../public/lf20_qvuvdhap.json'

import { ButtonLink } from '../../../../components/ButtonLink'

export default function Success() {
    const ref = useRef(null)
    return (
        <Flex direction="column" flex="1" bg="white.900">
            <Flex
                w="100%"
                h="120vh"
                mb={50}
                maxWidth={1440}
                flexDir="column"
                mx="auto"
                px="6"
                color="cinza.825"
                justifyContent="center"
                textAlign="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Player
                        id="firstLottie"
                        ref={ref}
                        autoplay
                        controls
                        loop
                        src={successAnimation}
                        style={{ width: '30%' }}>
                        <Player
                            id="gif"
                            ref={ref}
                            autoplay
                            controls
                            loop
                            src={personAnimation}
                            style={{ width: '30%' }}></Player>
                    </Player>
                </Box>

                <Box
                    as="span"
                    fontFamily="inter"
                    fontSize={34}
                    lineHeight={1}
                    fontWeight="600">
                    Compra
                </Box>
                <Box
                    as="span"
                    fontFamily="inter"
                    fontSize={34}
                    lineHeight={2}
                    fontWeight="600">
                    realizada com sucesso!
                </Box>
                <Box
                    mt={6}
                    as="span"
                    fontFamily="inter"
                    fontSize={18}
                    fontWeight="400">
                    Para acompanhar o seu pedido acessa o menu
                </Box>
                <Box
                    as="span"
                    fontFamily="inter"
                    fontSize={24}
                    fontWeight="400">
                    Meus Pedidos
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    mt={6}
                    justifyContent="center">
                    <ButtonLink
                        maxW={100}
                        h="54px"
                        mt={{ base: 5, md: 0 }}
                        mx={{ base: 0, md: 10 }}
                        bg="principal.900"
                        colorText="white.900"
                        _hover={{ background: 'principal.800' }}
                        href="/home">
                        OK
                    </ButtonLink>
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
