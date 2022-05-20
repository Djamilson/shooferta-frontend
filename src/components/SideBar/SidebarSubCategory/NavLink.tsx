import {
    Icon,
    Link as ChakraLink,
    Text,
    useTheme,
    LinkProps as ChakraLinkProps,
    Box
} from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from '../../ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
    icon?: ElementType
    colorText?: string
    children: string
    href: string
}

export function NavLink({
    icon,
    children,
    colorText,
    href,
    ...rest
}: NavLinkProps) {
    const theme = useTheme()

    return (
        <ActiveLink href={href} passHref>
            <ChakraLink
                w="100%"
                display="flex"
                align="center"
                color="red"
                {...rest}>
                <Box
                    w="100%"
                    _hover={{ color: `${theme.colors.principal[900]}` }}
                    color={colorText ? colorText : 'cinza.875'}
                    display="flex">
                    {icon && <Icon mr="4" as={icon} fontSize="22" />}
                    <Text fontWeight="400" fontFamily="inter" fontSize="16px">
                        {children}
                    </Text>
                </Box>
            </ChakraLink>
        </ActiveLink>
    )
}
