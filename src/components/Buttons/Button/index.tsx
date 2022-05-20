import React from 'react'

import { ReactElement} from 'react'

import { Button as ChackraButton, ButtonProps } from '@chakra-ui/react'

interface IProps extends ButtonProps {
    children: ReactElement
    shouldMatchExactHref?: boolean
    isActive: boolean
    colorScheme?: string
    colorTitle?: string
}

export function Button({
    children,
    shouldMatchExactHref = false,
    isActive,
    colorScheme,
    colorTitle,
    ...rest
}: IProps) {
    return (
        <ChackraButton
            borderRadius="none"
            bg={colorScheme ? colorScheme : 'principal.900'}
            {...rest}>
            {children}
        </ChackraButton>
    )
}
