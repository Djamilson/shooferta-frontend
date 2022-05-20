import {
    Icon,
    Link as ChakraLink,
    Text,
    LinkProps as ChakraLinkProps,
    useTheme
} from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from '../../ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType
    children: string
    href: string
}

export function NavLinkFooter({ icon, children, href, ...rest }: NavLinkProps) {
    const theme = useTheme()
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink
                display="flex"
                lineHeight="35px"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                    color: `${theme.colors.cinza[900]}`,
                    translate: `0 -5px`
                }}
                {...rest}>
                <Icon
                    as={icon}
                    fontSize="20"
                    lineHeight="35px"
                    color="cinza.850"
                />
                <Text
                    ml="10px"
                    fontWeight="500"
                    fontFamily="inter"
                    fontSize="14px"
                    color="cinza.850">
                    {children}
                </Text>
            </ChakraLink>
        </ActiveLink>
    )
}
