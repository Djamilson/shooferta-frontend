import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

type IProps = {
    children: ReactNode
}

export function BackgroundHeader({ children }: IProps) {
    return (
        <Flex as="header" h="80px" bg="principal.900">
            <Flex
                align="center"
                color="white.900"
                w="100%"
                justifyContent="space-between"
                px="116px">
                {children}
            </Flex>
        </Flex>
    )
}
