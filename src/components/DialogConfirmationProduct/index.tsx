import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogOverlay,
    Box,
    Text,
    useTheme
} from '@chakra-ui/react'
import { useRef } from 'react'
import { Button } from '../Buttons/Button'
import { useRouter } from 'next/router'
import IProduct from '../../@model/product/product'

type IProps = {
    onClose: () => void
    isOpen: boolean
    product: IProduct
    isAuthenticated: boolean
}

export function DialogConfirmationProduct({
    isOpen,
    onClose,
    product,
    isAuthenticated
}: IProps) {
    const cancelRef = useRef()
    const theme = useTheme()
    const router = useRouter()

    async function handleAddProduct(id: string) {
        const meRouter = isAuthenticated
            ? `/sellerstoreids/${id}`
            : `/sellerstoreid/${id}`

        router.push(meRouter)

        onClose()
    }

    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered>
            <AlertDialogOverlay />

            <AlertDialogContent borderRadius="none">
                <AlertDialogCloseButton />
                <AlertDialogBody p="40px">
                    <Box
                        fontFamily="inter"
                        fontSize="16px"
                        color="cinza.900"
                        fontWeight="400">
                        O produto escolhido foi:
                        <Box
                            as="span"
                            color="gray.600"
                            fontSize="sm"
                            ml={2}
                            fontWeight="700">
                            {product?.subcategory.name}
                        </Box>
                    </Box>
                    <Box
                        fontFamily="inter"
                        fontSize="16px"
                        color="cinza.900"
                        fontWeight="400"
                        mt={2}>
                        Deseja continuar?
                    </Box>
                    <Box
                        display="flex"
                        mt="8"
                        alignItems="center"
                        justifyContent="center">
                        <Button
                            isActive={false}
                            colorScheme="white.900"
                            borderWidth="2px"
                            borderColor="principal.900"
                            variant="solid"
                            color="principal.900"
                            onClick={onClose}
                            mr="20px"
                            _hover={{
                                bg: `${theme.colors.white[900]}`
                            }}
                            fontFamily="inter">
                            <Text>Não, alterar</Text>
                        </Button>
                        <Button
                            isActive={true}
                            colorScheme="principal.900"
                            borderWidth="2px"
                            borderColor="principal.900"
                            variant="solid"
                            fontFamily="inter"
                            _hover={{
                                bg: `${theme.colors.principal[900]}`
                            }}
                            onClick={() => handleAddProduct(product.id)}>
                            <Text>Sim, continuar</Text>
                        </Button>
                    </Box>
                </AlertDialogBody>
            </AlertDialogContent>
        </AlertDialog>
    )
}
