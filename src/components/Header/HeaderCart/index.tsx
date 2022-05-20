import Link from 'next/link'
import { BsFillBasket2Fill } from 'react-icons/bs'

import { Link as ChakraLink, HStack, Box, Badge, Tag } from '@chakra-ui/react'
import { useMemo } from 'react'

import { useCart } from '../../../hooks/useCart'
import { useAuth } from '../../../contexts/auth'

interface ProfileProps {
    showProfileData?: boolean
}

export function HeaderCart({ showProfileData = true }: ProfileProps) {
    const { cart } = useCart()
    const cartSize = useMemo(() => cart?.length, [cart])

    const { isAuthenticated } = useAuth()

    return (
        <HStack display="flex" justifyContent="flex-end">
            <Link href={isAuthenticated ? '/baskets' : '/basket'} passHref>
                <ChakraLink>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        ml="20px"
                        as="span"
                        zIndex="1">
                        <BsFillBasket2Fill
                            color="cinza.700"
                            fontSize="1.5rem"
                        />
                        <Box ml={-2} mt={-6}>
                            <Badge
                                variant="subtle"
                                bg="red"
                                colorScheme="principal.800"
                                borderRadius="50%">
                                {cartSize === 0 && `0`}
                                {cartSize === 1 && `${cartSize} item`}
                                {cartSize > 1 && `${cartSize} itens`}
                            </Badge>
                        </Box>
                    </Box>
                </ChakraLink>
            </Link>
        </HStack>
    )
}
