import { Box, Button, Slide, Text, useDisclosure } from '@chakra-ui/react'


export function SlideEx() {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <>
            <Button onClick={onToggle}>
                <Text fontSize={{ base: '24px', md: '40px', lg: '56px' }}>
                    cookies
                </Text>
            </Button>
            <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
                <Box
                    p="40px"
                    color="white"
                    mt="4"
                    bg="teal.500"
                    rounded="md"
                    shadow="md">
                    <Text fontSize={{ base: '24px', md: '40px', lg: '56px' }}>
                        cookies
                    </Text>
                </Box>
            </Slide>
        </>
    )
}
