import { Box, CircularProgress } from '@chakra-ui/react'
import React from 'react'

function ChakraLoading() {
    return (
        <Box
            flex="1"
            display="flex"
            w="100%"
            justifyContent="center"
            alignItems="center">
            <CircularProgress isIndeterminate color="principal.900" />
        </Box>
    )
}
export { ChakraLoading }
