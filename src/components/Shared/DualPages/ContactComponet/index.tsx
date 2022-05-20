import { Box, Heading, HStack, Text } from '@chakra-ui/react'

function ContactComponet() {
    return (
        <HStack spacing={8}>
            <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
                <Heading fontSize="xl">kjkljlkjlkjlj</Heading>
                <Text mt={4}>
                    The future can be even brighter but a goal without a plan is
                    just a wish
                </Text>
            </Box>
        </HStack>
    )
}

export { ContactComponet }
