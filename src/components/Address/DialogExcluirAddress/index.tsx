import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Text,
    useTheme
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { IAddress } from '../../../@model/address/address'
import { Button } from '../../Buttons/Button'
import { DataAddress } from '../DataAddress'

type IProps = {
    onClose: () => void
    isOpen: boolean
    data: IAddress
    handleDelete: () => Promise<void>
}

export function DialogExcluirAddress({
    isOpen,
    onClose,
    data,
    handleDelete
}: IProps) {
    const cancelRef = useRef()
    const theme = useTheme()

    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

    async function handleConfirmaDelete() {
        setIsLoadingDelete(true)
        await handleDelete()
        setIsLoadingDelete(true)
    }

    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered>
            <AlertDialogOverlay />

            <AlertDialogContent borderRadius="none" color="cinza.900">
                <AlertDialogHeader
                    px="40px"
                    pt="40px"
                    fontFamily="inter"
                    fontSize="22px"
                    color="cinza.900">
                    Excluir?
                </AlertDialogHeader>
                <AlertDialogCloseButton
                    mt="40px"
                    mr="40px"
                    _hover={{ bg: 'white.900' }}
                />
                <AlertDialogBody p="20px">
                    <Box
                        p="40px"
                        as="span"
                        color="cinza.650"
                        fontSize="16px"
                        fontWeight="700">
                        tem certeza que quer excluir este endereço?
                    </Box>

                 
                    <DataAddress
                        data={data}
                        pt="20px"
                        px="40px"
                        fontFamily="inter"
                        fontSize="16px"
                        color="cinza.900"
                        fontWeight="400"
                    />
                    <Box
                        display="flex"
                        my="8"
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
                            <Text>Não, cancelar</Text>
                        </Button>
                        <Button
                            isActive={true}
                            colorScheme="principal.900"
                            borderWidth="2px"
                            borderColor="principal.900"
                            color="white.900"
                            variant="solid"
                            fontFamily="inter"
                            isLoading={isLoadingDelete}
                            _hover={{
                                bg: `${theme.colors.principal[900]}`
                            }}
                            onClick={() => handleConfirmaDelete()}>
                            <Text>Sim, excluir</Text>
                        </Button>
                    </Box>
                </AlertDialogBody>
            </AlertDialogContent>
        </AlertDialog>
    )
}
