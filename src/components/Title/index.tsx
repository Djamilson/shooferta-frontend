import { ReactNode } from 'react'

import { Text, TextProps } from '@chakra-ui/react'

interface IProps extends TextProps {
    children: ReactNode
}

export function Title({ children, ...rest }: IProps) {
    return (
        <Text
            fontWeight="bold"
            letterSpacing="wide"
            fontFamily="inter"
            fontSize={{
                base: '18px',
                md: '20px',
                lg: '24px'
            }}
            {...rest}>
            {children}
        </Text>
    )
}
