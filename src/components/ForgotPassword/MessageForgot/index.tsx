import React, { useRef } from 'react'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box
} from '@chakra-ui/react'

type IProps = {
    onClose: () => void
    isOpen: boolean
    emailForgot?: string
}

export function MessageForgot({ onClose, isOpen, emailForgot }: IProps) {
    const cancelRef = useRef()

    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered>
            <AlertDialogOverlay />

            <AlertDialogContent color="cinza.650" borderRadius="none">
                <AlertDialogHeader>email enviado!</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    <Box fontSize="14px" my={8}>
                        caso exista uma conta com o djamilson@gmail.com que você
                        digitou, vamos enviar um e-mail para
                        <Box as="span" px={2}>
                            {emailForgot}
                        </Box>
                        com as instruções e o link para você trocar a senha. se
                        você não receber o e-mail em alguns minutos, verifique a
                        sua caixa de spam ou tente novamente.
                    </Box>
                </AlertDialogBody>
            </AlertDialogContent>
        </AlertDialog>
    )
}
