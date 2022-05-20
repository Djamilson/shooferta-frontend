import { ReactElement, cloneElement } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

interface ActiveButtonProps extends ButtonProps {
    children: ReactElement
    shouldMatchExactHref?: boolean
    isActive: boolean
}

export function ActiveButton({
    children,
    shouldMatchExactHref = false,
    isActive,
    ...rest
}: ActiveButtonProps) {
    return (
        <Button
            {...rest}
            borderBottom={isActive ? '2px solid #DC1637' : 'gray.50'}>
            {cloneElement(children, {
                color: isActive ? 'pink.400' : 'gray.50'
            })}
        </Button>
    )
}
