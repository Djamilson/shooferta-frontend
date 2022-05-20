import { useState } from 'react'

import { Box, Text, useClipboard, Input, useTheme } from '@chakra-ui/react'
import { RiFileCopyFill } from 'react-icons/ri'

import { Button } from '../Buttons/Button'

type IProps = {
    handleConfirmation: (id: string) => void
}

export function Coupon({ handleConfirmation }: IProps) {
    const address_id = '98iuoio'

    const [value, setValue] = useState('UUID do vale presente')
    const { hasCopied, onCopy } = useClipboard(value)
    const theme = useTheme()

    return (
        <Box
            p={['6', '8']}
            bg="white.900"
            borderRadius="none"
            color="cinza.650"
            pb="4">
            <Text
                fontSize="lg"
                mb="4"
                borderBottom="1px solid"
                borderColor="cinza.750"
                py={2}>
                djamilson alves da costa
            </Text>
            <Text fontSize="lg" mb="4">
                Dados do vale presente
            </Text>

            <Input
                value={value}
                isReadOnly
                placeholder="Welcome"
                border="none"
            />

            <Box display={{ md: 'flex' }} mt={{ md: 10 }}>
                <Button
                    leftIcon={<RiFileCopyFill />}
                    colorScheme="principal.900"
                    w="100%"
                    h="48px"
                    mt={{ base: 5, md: 0 }}
                    isActive={true}
                    onClick={onCopy}
                    color="white.900"
                    _hover={{
                        bg: 'principal.800'
                    }}>
                    <Text>
                        {hasCopied ? 'vale copiado com sucesso!' : 'copiar'}
                    </Text>
                </Button>
            </Box>
        </Box>
    )
}
