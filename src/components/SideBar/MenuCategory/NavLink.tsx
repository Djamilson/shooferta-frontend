import {
    Icon,
    Link as ChakraLink,
    Text,
    useTheme,
    LinkProps as ChakraLinkProps
} from '@chakra-ui/react'

import { ElementType } from 'react'
import { ActiveLink } from '../../ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
    icon?: ElementType
    children: string
    href: string
    colorIcon?: string
    colorText?: string
}

export function NavLink({
    icon,
    children,
    href,
    colorIcon,
    ...rest
}: NavLinkProps) {
    const theme = useTheme()
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink
                display="flex"
                _hover={{
                    textDecoration: 'none',
                    color: `${theme.colors.cinza[900]}`,
                    translate: `0 -5px`
                }}
                align="center"
                {...rest}>
                {icon && (
                    <Icon
                        mr="10px"
                        as={icon}
                        fontSize="20"
                        color={colorIcon ? { colorIcon } : 'white.900'}
                    />
                )}
                <Text fontWeight="700" fontFamily="inter" fontSize="14px">
                    {children}
                </Text>
            </ChakraLink>
        </ActiveLink>
    )
}
