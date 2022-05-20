import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { FiPackage } from 'react-icons/fi'
import { INewProduct } from '../../../../../@model/product/productCart'
import { useLocalization } from '../../../../../contexts/localization'
import { PhotoComponent } from '../../../../Product/Photo'

type IProps = {
    cartFormatted: INewProduct[]
    handleProductIncrement: (product: INewProduct) => void
    handleProductDecrement: (product: INewProduct) => void
    handleRemoveProduct: (id: string) => void
}

function MeBasket({
    cartFormatted,
    handleProductIncrement,
    handleProductDecrement,
    handleRemoveProduct
}: IProps) {
    const { isLocalization, localed } = useLocalization()

    return (
        <Table variant="simple">
            <TableCaption>meus produtos</TableCaption>
            <Thead>
                <Tr>
                    <Th>produto</Th>
                    <Th textAlign="center">qtd.</Th>
                    <Th textAlign="center">entrega</Th>
                    <Th textAlign="center">preço</Th>
                </Tr>
            </Thead>
            <Tbody>
                {cartFormatted?.length < 1 && (
                    <Tr>
                        <Td colSpan={4}>Não temos produto na cesta!</Td>
                    </Tr>
                )}
                {cartFormatted?.map(product => {
                    return (
                        <Tr key={product.product.id}>
                            <Td>
                                <Box
                                    flex="1"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="flex-start">
                                    {product.product?.subcategory && (
                                        <PhotoComponent
                                            w="130px"
                                            photoUrl={
                                                product.product?.thumbnail_url
                                            }
                                            name={
                                                product.product.subcategory.name
                                            }
                                            icon={FiPackage}
                                            iconColor="red.500"
                                            iconDimension="200"
                                        />
                                    )}

                                    <Box
                                        as="span"
                                        ml={8}
                                        color="cinza.800"
                                        fontSize="sm"
                                        noOfLines={[1, 3]}>
                                        {product.product.subcategory.name}
                                    </Box>
                                </Box>
                            </Td>
                            <Td textAlign="center" ml={0} p={0}>
                                <Box display="flex" flexDir="column">
                                    <ButtonGroup
                                        size="sm"
                                        isAttached
                                        alignItems="center"
                                        justifyContent="center"
                                        border="1px solid"
                                        borderColor="cinza.700"
                                        variant="outline">
                                        <IconButton
                                            border="none"
                                            borderRadius="none"
                                            aria-label="decrement-product"
                                            disabled={
                                                product.amount <= 1
                                            }
                                            onClick={() =>
                                                handleProductDecrement(product)
                                            }
                                            _hover={{
                                                bg: 'white.900'
                                            }}
                                            icon={
                                                <MinusIcon color="principal.900" />
                                            }
                                        />
                                        <Box
                                            as="span"
                                            w="45px"
                                            textAlign="center">
                                            {product.amount}
                                        </Box>
                                        <IconButton
                                            borderRadius="none"
                                            border="none"
                                            _hover={{
                                                bg: 'white.900'
                                            }}
                                            aria-label="increment-product"
                                            onClick={() =>
                                                handleProductIncrement(product)
                                            }
                                            icon={
                                                <AddIcon color="principal.900" />
                                            }
                                        />
                                    </ButtonGroup>

                                    <Button
                                        mt={2}
                                        borderRadius="none"
                                        colorScheme="teal"
                                        variant="link"
                                        fontFamily="inter"
                                        fontWeight="400"
                                        fontSize={12}
                                        onClick={() =>
                                            handleRemoveProduct(
                                                product.product.id
                                            )
                                        }>
                                        remove
                                    </Button>
                                </Box>
                            </Td>
                            <Td textAlign="center" ml={0} p={0}>
                                <Box w="98px" textAlign="center" mx={3}>
                                    {isLocalization && (
                                        <Box
                                            as="span"
                                            color="gray.600"
                                            fontSize="sm">
                                            {`receba até segunda-feira, ${localed?.freights[0].formatedData}`}
                                        </Box>
                                    )}
                                </Box>
                            </Td>
                            <Td>
                                <Stack
                                    w="100px"
                                    direction={['column']}
                                    spacing="14px">
                                    <Box
                                        as="span"
                                        fontWeight="bold"
                                        textDecoration="line-through">
                                        {product.product.price.price_format}
                                    </Box>
                                    <Box as="span" fontWeight="bold">
                                        {
                                            product.product.price
                                                .price_promotion_format
                                        }
                                    </Box>
                                </Stack>
                            </Td>
                        </Tr>
                    )
                })}
            </Tbody>
        </Table>
    )
}

export { MeBasket }
