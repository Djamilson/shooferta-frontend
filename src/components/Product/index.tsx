import { StarIcon } from '@chakra-ui/icons'
import { Badge, Box, Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { FiPackage } from 'react-icons/fi'
import IProduct from '../../@model/product/product'
import { useAuth } from '../../contexts/auth'
import { PhotoComponent } from './Photo'

interface IProps extends LinkProps {
    product: IProduct
}

export function Product({ product, ...rest }: IProps) {
    const property = {
        beds: 3,
        baths: 2,
        reviewCount: 34,
        rating: 4
    }

    const { isAuthenticated } = useAuth()

    return (
        <Link
            href={
                isAuthenticated
                    ? `/productdetails/${product?.id}`
                    : `/productdetail/${product?.id}`
            }
            passHref>
            <ChakraLink
                bg="white.900"
                overflow="hidden"
                borderRadius="none"
                maxWidth="297px"
                _hover={{
                    borderBottom: '2px solid',
                    textDecoration: 'none',
                    borderBottomColor: 'red',
                    transform: 'translateY(-25px)'
                }}
                {...rest}>
                <Box
                    flex="1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={['4', '6']}>
                    {product?.subcategory && (
                        <PhotoComponent
                            h="200px"
                            photoUrl={product?.thumbnail_url}
                            name={product.subcategory.name}
                            icon={FiPackage}
                            iconColor="red.500"
                            iconDimension="200"
                        />
                    )}
                </Box>

                <Box pb="3" px="6">
                    <Box display="flex" alignItems="baseline">
                        <Box
                            color="cinza.800"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="14"
                            noOfLines={[1, 3]}>
                            {product?.subcategory.name}
                        </Box>
                    </Box>

                    <Box display="flex" mt="6" alignItems="center">
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                                <StarIcon
                                    key={i}
                                    color={
                                        i < property.rating
                                            ? 'reviews.900'
                                            : 'reviews.800'
                                    }
                                />
                            ))}
                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                            {product?.total_reviews} reviews
                        </Box>
                    </Box>

                    <Box
                        color={
                            product?.price.price_promotion !== '0.00'
                                ? 'gray.500'
                                : 'white.900'
                        }
                        fontWeight="400"
                        letterSpacing="wide"
                        fontSize="xs"
                        textDecoration="line-through"
                        mt="4">
                        {product?.price.price_format}
                    </Box>
                    <Box display="flex" alignItems="baseline">
                        <Box
                            fontWeight="semibold"
                            color="cinza.900"
                            fontSize="18px"
                            as="h4">
                            {product?.price.price_promotion === '0.00'
                                ? product?.price.price_format
                                : product?.price.price_promotion_format}
                        </Box>
                        {product?.price.price_promotion !== '0.00' && (
                            <Badge ml="4" borderRadius="full" colorScheme="red">
                                Promoção
                            </Badge>
                        )}
                    </Box>

                    <Box as="span" color="cinza.850" fontSize="12">
                        {`${product?.price.number_times_sale.numberVez} de ${product?.price.number_times_sale.price} s/juros`}
                    </Box>
                </Box>
            </ChakraLink>
        </Link>
    )
}
