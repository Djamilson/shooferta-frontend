import { Box, CloseButton, Text, useTheme } from '@chakra-ui/react'

import { useState } from 'react'
import { shade } from 'polished'

export function MessageToastPersonality() {
    const [isActive, setIsActive] = useState<boolean>(true)
    const theme = useTheme()

    function handleCloseButton() {
        setIsActive(false)
    }

    return (
        isActive && (
            <Box
                w="100%"
                h="64px"
                bg="oranger.900"
                _hover={{
                    bg: shade(0.2, `${theme.colors.oranger[900]}`),
                    textDecoration: 'none'
                }}
                _focus={{ boxShadow: 'outline' }}
                display={{ md: 'flex' }}
                justifyContent={{ md: 'center' }}
                alignItems="center">
                <Text
                    as="span"
                    color="white.900"
                    w="99%"
                    fontSize="20px"
                    textAlign="center">
                    FRETE GRÁTIS PARA TODO O BRASIL. PAGUE EM ATÉ 12X!
                </Text>
                <CloseButton
                    onClick={handleCloseButton}
                    size="md"
                    ml="auto"
                    mr={2}
                />
            </Box>
        )
    )
}
