import { Box, Flex, Text } from '@chakra-ui/react'

export function HeaderMessage() {
    return (
        <Flex w="100%" maxWidth={1440} mx="auto" h="50px" px="6" bg="white.900">
            <Box
                flex="1"
                display={{ base: 'flex', md: 'flex' }}
                alignItems="center"
                mt={{ base: 2, md: 2 }}
                mb={{ base: 2, md: 2 }}
                justifyContent="center">
                <Box
                    as="h3"
                    fontSize={{ base: '1xl', md: '2xl', lg: '3xl' }}
                    fontWeight="bold"
                    letterSpacing="tight"
                    color="principal.900">
                    Tudo pro seu verão?
                    <Box as="span" ml="4" color="pink.500">
                        relaxa, na SHOOFERTA você acha {`:)`}
                        <Text as="span" ml="1" color="red">
                            . queeero
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Flex>
    )
}
