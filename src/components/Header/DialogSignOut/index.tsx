import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react'
import { useRef } from 'react'

type IProps = {
    onClose: () => void
    isOpen: boolean
    onClick: () => void
}

function DialogSignOut({ onClose, isOpen, onClick }: IProps) {
    const cancelRef = useRef()
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered>
            <AlertDialogOverlay />

            <AlertDialogContent color="cinza.875" borderRadius={0}>
                <AlertDialogHeader>Sair do sistema</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    Tem certeza que deseja sair da aplicação?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button borderRadius={0} ref={cancelRef} onClick={onClose}>
                        Não, sair
                    </Button>
                    <Button
                        borderRadius={0}
                        colorScheme="red"
                        ml={3}
                        onClick={() => onClick()}>
                        Sim, sair
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export { DialogSignOut }
