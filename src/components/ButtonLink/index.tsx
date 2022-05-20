import Link from 'next/link'

import {
    Icon,
    Link as ChakraLink,
    Text,
    LinkProps as ChakraLinkProps,
    Box
} from '@chakra-ui/react'
import { ElementType } from 'react'

interface NavLinkProps extends ChakraLinkProps {
    icon?: ElementType
    colorText?: string
    children: string
    href: string
}

export function ButtonLink({
    icon,
    children,
    colorText,
    href,
    ...rest
}: NavLinkProps) {
    return (
        <Link href={href} passHref>
            <ChakraLink
                w="100%"
                display="flex"
                align="center"
                color={colorText ? colorText : 'cinza.875'}
                {...rest}>
                <Box
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    {icon && <Icon mr="4" as={icon} fontSize="22" />}
                    <Text fontWeight="400" fontFamily="inter" fontSize="16px">
                        {children}
                    </Text>
                </Box>
            </ChakraLink>
        </Link>
    )
}
