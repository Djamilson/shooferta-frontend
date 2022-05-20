import { Box, Flex, Image, Text } from '@chakra-ui/react'
import Router from 'next/router'
import React from 'react'
import { Button } from '../components/Buttons/Button'
import { SubTitle } from '../components/SubTitle'
import { Title } from '../components/Title'
export default function Index() {
    return (
        <Flex
            display="flex"
            justifyContent="space-between"
            overflowX="hidden"
            flexDir="column"
            bg="cinza.400"
            p="0"
            m="0">
            <Box
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                m={10}>
                <Box p={4} display={{ md: 'flex' }}>
                    <Box flexShrink={0}>
                        <Image
                            borderRadius="lg"
                            width={{ md: 40 }}
                            src="https://bit.ly/2jYM25F"
                            alt="Woman paying for a purchase"
                        />
                    </Box>
                    <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                        <Text
                            fontWeight="bold"
                            textTransform="uppercase"
                            fontSize="sm"
                            letterSpacing="wide"
                            color="teal.600">
                            Marketing
                        </Text>
                        <Button
                            type="button"
                            mt="30px"
                            w="100%"
                            h="64px"
                            isActive={true}
                            colorScheme="principal.900"
                            color="white.900"
                            onClick={() => Router.push('/')}
                            _hover={{
                                opacity: 0.6
                            }}>
                            <Text fontSize="20px" fontFamily="inter">
                                voltar para o site principal
                            </Text>
                        </Button>
                        <Text mt={2} color="gray.500">
                            Getting a new business off the ground is a lot of
                            hard work. Here are five ideas you can use to find
                            your first customers.
                        </Text>
                    </Box>
                </Box>

                <Title>404</Title>

                <SubTitle>Ops, a página não foi encontrada.</SubTitle>

                <Text
                    textAlign="center"
                    fontSize="14px"
                    color="cinza.650"
                    marginTop={6}>
                    Você pode tentar encontrar no nosso site principal.
                </Text>

                <Button
                    type="button"
                    mt="30px"
                    w="100%"
                    h="64px"
                    isActive={true}
                    colorScheme="principal.900"
                    color="white.900"
                    onClick={() => Router.push('/')}
                    _hover={{
                        opacity: 0.6
                    }}>
                    <Text fontSize="20px" fontFamily="inter">
                        voltar para o site principal
                    </Text>
                </Button>
            </Box>
        </Flex>
    )
}

export { Index }
