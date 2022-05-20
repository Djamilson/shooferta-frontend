import { Box, Flex, Text } from '@chakra-ui/react'

export function MessageCategory() {
    return (
        <Flex w="1440px" maxWidth="1400px" h="80px" my="40px">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="1440px"
                maxWidth="1440px"
                h="80px"
                maxHeight="80px"
                bg="black.500"
                flexDir="column">
                <Text>
                    🖤 DE UM PRESENTE PARA A QUEM VOCÊ AMA | VEJA NOSSAS
                    COLEÇÕES
                </Text>
            </Box>
        </Flex>
    )
}
