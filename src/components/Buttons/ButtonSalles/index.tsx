import { Text, useTheme } from '@chakra-ui/react'

import { shade } from 'polished'
import { Button } from '../Button'

export function ButtonSalle() {
    const theme = useTheme()

    return (
        <Button
            w="100%"
            h="64px"
            isActive={true}
            colorScheme="oranger.900"
            _hover={{
                bg: shade(0.2, `${theme.colors.oranger[900]}`),
                textDecoration: 'none'
            }}
            _focus={{ boxShadow: 'outline' }}>
            <Text color="white.900" w="99%" fontSize="20px">
                Adicionar a cesta
            </Text>
        </Button>
    )
}
