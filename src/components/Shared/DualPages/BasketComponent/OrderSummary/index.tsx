import { AddIcon } from '@chakra-ui/icons'
import { Box, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { BsFillBasket2Fill } from 'react-icons/bs'
import { useAuth } from '../../../../../contexts/auth'
import { getPerson } from '../../../../../hooks/Entity/useUsers'
import { queryClient } from '../../../../../_services/queryClient'
import { Horizontal } from '../../../../Divider/Horizontal'
import { Title } from '../../../../Title'

type IProps = {
    handleConfirmation: () => void
    handleAddProduct: () => void
    total: string
    totalQt: number
    animation: string
    personId?: string
}

function OrderSummary({
    handleConfirmation,
    total,
    totalQt,
    animation,
    personId
}: IProps) {
    const router = useRouter()
    const { isAuthenticated } = useAuth()

    async function handlePrefetchPerson() {
        if (personId) {
            await queryClient.prefetchQuery(
                [`person-${personId}`, personId],
                async () => {
                    const data = await getPerson(personId)

                    console.log('Person::: ', data)
                    return data
                },
                {
                    staleTime: 100 * 60 * 10 // 10 min
                }
            )
        }
    }

    return (
        <Box
            mt={{ base: 4, md: 0 }}
            w={{ base: '100%', md: '360px' }}
            ml={{ md: 6 }}
            bg="white.900"
            borderRadius="none"
            animation={animation}>
            <Box pt="6" pb="3" px="6">
                <Title color="cinza.825"> resumo do pedido</Title>

                <Box
                    mt="6"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <Box as="span" color="gray.600" fontSize="sm">
                        {totalQt === 0 && `0`}
                        {totalQt === 1 && `${totalQt} produto`}
                        {totalQt > 1 && `${totalQt} produtos`}
                    </Box>
                    <Box
                        as="span"
                        color="gray.600"
                        textAlign="right"
                        fontSize="sm">
                        {total}
                    </Box>
                </Box>
                <Box
                    mt={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <Box as="span" color="green.900" fontSize="sm">
                        frete
                    </Box>
                    <Box
                        as="span"
                        color="green.900"
                        textAlign="right"
                        fontSize="sm">
                        gratis
                    </Box>
                </Box>
                <Horizontal />
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">
                    <Box
                        as="span"
                        color="black.900"
                        textAlign="right"
                        fontWeight="700"
                        fontSize="18px">
                        total
                    </Box>
                    <Box
                        as="span"
                        color="black.900"
                        textAlign="right"
                        fontWeight="700"
                        fontSize="18px">
                        {total}
                    </Box>
                </Box>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center">
                    <Box textAlign="right">
                        <Box
                            as="span"
                            color="gray.500"
                            fontWeight="400"
                            letterSpacing="wide"
                            fontSize="xs"
                            mt={2}>
                            em 1x no cartão
                        </Box>
                        <Box
                            color="gray.500"
                            fontWeight="400"
                            letterSpacing="wide"
                            fontSize="xs">
                            ou R$ 5.955,18 em até 10x
                        </Box>
                        <Box
                            mt={2}
                            color="gray.500"
                            fontWeight="400"
                            letterSpacing="wide"
                            fontSize="xs">
                            R$ 5.816,28 no boleto
                        </Box>
                        <Box
                            color="gray.500"
                            fontWeight="400"
                            letterSpacing="wide"
                            fontSize="xs">
                            R$ 5.816,28 no boleto
                        </Box>
                    </Box>
                </Box>

                <Horizontal />

                <Box>
                    <Button
                        mt="20px"
                        leftIcon={<BsFillBasket2Fill fontSize="22px" />}
                        justifyContent="center"
                        alignItems="center"
                        bg="principal.900"
                        w="100%"
                        h="48px"
                        _hover={{
                            opacity: 0.7,
                            textDecoration: 'none'
                        }}
                        _focus={{ boxShadow: 'outline' }}
                        onMouseEnter={() => handlePrefetchPerson()}
                        onClick={handleConfirmation}
                        borderRadius="none">
                        <Box
                            as="span"
                            fontSize="20px"
                            fontFamily="Inter"
                            lineHeight="18px"
                            fontWeight="500"
                            color="white.900">
                            comprar
                        </Box>
                    </Button>

                    <Button
                        mt={10}
                        leftIcon={<AddIcon fontSize="18px" />}
                        justifyContent="center"
                        alignItems="center"
                        bg="none"
                        w="100%"
                        h="48px"
                        _hover={{
                            opacity: 0.7,
                            textDecoration: 'none'
                        }}
                        _focus={{ boxShadow: 'outline' }}
                        onClick={() =>
                            router.push(isAuthenticated ? '/home' : '/')
                        }
                        borderRadius="none"
                        variant="link">
                        <Box
                            as="span"
                            fontSize="20px"
                            fontFamily="Inter"
                            lineHeight="18px"
                            fontWeight="500"
                            color="cinza.900">
                            adicionar mais produtos
                        </Box>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export { OrderSummary }
