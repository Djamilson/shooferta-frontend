import { ReactNode } from 'react'

import { Text } from '@chakra-ui/react'

type IProps = {
    children: ReactNode
}

export function SubTitle({ children }: IProps) {
    return (
        <Text
            mt={2}
            letterSpacing="wide"
            fontSize={{
                base: '14px',
                md: '16px',
                lg: '18px'
            }}>
            {children}
        </Text>
    )
}
