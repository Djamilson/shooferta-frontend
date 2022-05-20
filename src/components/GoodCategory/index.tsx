import { Box, Flex, Text } from '@chakra-ui/react'

export function GoodCategory() {
    return (
        <Flex w="1440px" maxWidth="1400px" h="160px" mb="80px">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flex="1"
                maxWidth="1440px"
                h="160px"
                maxHeight="160px"
                bg="cinza.350"
                color="principal.900"
                flexDir="column">
                <Text
                    as="span"
                    fontSize="18px"
                    fontWeight="bold"
                    fontFamily="inter">
                    🖤 ATENDIMENTO DE SEG. A SEX. DAS 09:00 ÀS 17:00 VIA
                    WHATISAP (63) 9 9254-6761
                </Text>
                <Text
                    as="span"
                    fontSize="14px"
                    fontWeight="500"
                    fontFamily="inter">
                    🖤 ENTREGA GARANTIDA EM TODOS OS PRODUTOS | VEJA NOSSAS
                    COLEÇÕES
                </Text>
            </Box>
        </Flex>
    )
}
