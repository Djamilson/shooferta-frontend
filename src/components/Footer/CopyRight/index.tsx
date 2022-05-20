import { Box, Flex, Text } from '@chakra-ui/react'

export function CopyRight() {
    return (
        <Flex w="1440px" maxWidth="1440px" h="80px">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="1440px"
                maxWidth="1440px"
                h="80px"
                maxHeight="80px"
                bg="cinza.500"
                color="cinza.850"
                flexDir="column">
                <Text> Copyright © 2022, SHOOFERTA</Text>
            </Box>
        </Flex>
    )
}
