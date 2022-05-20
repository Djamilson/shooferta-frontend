import {
    Icon,
    Link as ChakraLink,
    LinkProps as ChakraLinkProps
} from '@chakra-ui/react'
import { ElementType, ReactNode } from 'react'

import { NormalLink } from '../NormalLink'
interface NavLinkProps extends ChakraLinkProps {
    icon?: ElementType
    colorIcon?: String
    children: ReactNode
    href: string
}

export function NavLinkPage({
    icon,
    children,
    href,
    colorIcon,
    ...rest
}: NavLinkProps) {
    return (
        <NormalLink href={href} passHref>
            <ChakraLink
                display="flex"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                {...rest}>
                {icon && (
                    <Icon
                        as={icon}
                        fontSize="25"
                        color={`${colorIcon}`}
                        mr={6}
                    />
                )}
                {children}
            </ChakraLink>
        </NormalLink>
    )
}
