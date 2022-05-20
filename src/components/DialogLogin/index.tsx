import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Text
} from '@chakra-ui/react'
import { useRef } from 'react'
import { Button } from '../Buttons/Button'
import { Horizontal } from '../Divider/Horizontal'

type IProps = {
    isOpen: boolean
    onClose: () => void
    handleSignIn: () => void
    handleSignUp: () => void
}

export function DialogLogin({
    isOpen,
    onClose,
    handleSignIn,
    handleSignUp
}: IProps) {
    const cancelRef = useRef()
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered>
            <AlertDialogOverlay />

            <AlertDialogContent
                bg="principal.900"
                w="270px"
                ml="auto"
                mr="120px"
                borderRadius="none"
                mt="140px">
                <Box
                    w="0"
                    h="0"
                    mt="-15px"
                    ml="102px"
                    borderWidth="0 30px 30px 30px"
                    borderColor="transparent transparent #DC1637 transparent"
                    borderStyle="solid"
                />

                <AlertDialogHeader fontSize="14px" mt="40px" fontWeight="400">
                    pra ver seus pedidos e ter uma experiência personalizada,
                    acesse sua conta
                </AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody pb="60px">
                    <Button
                        mt="60px"
                        w="100%"
                        h="64px"
                        isActive={true}
                        onClick={() => handleSignIn()}
                        type="button"
                        colorScheme="cinza.800">
                        <Text
                            as="span"
                            fontFamily="inter"
                            fontWeight="400"
                            fontSize="18px">
                            Entrar
                        </Text>
                    </Button>
                    <Horizontal />
                    <Button
                        w="100%"
                        h="64px"
                        type="button"
                        isActive={true}
                        onClick={() => handleSignUp()}
                        bg="cinza.600"
                        colorScheme="cinza.800">
                        <Text
                            as="span"
                            fontWeight="400"
                            fontFamily="inter"
                            color="cinza.900">
                            Criar conta gratuita
                        </Text>
                    </Button>
                </AlertDialogBody>
            </AlertDialogContent>
        </AlertDialog>
    )
}
