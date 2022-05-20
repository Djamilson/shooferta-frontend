import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogOverlay,
    Box,
    Stack,
    useDisclosure
} from '@chakra-ui/react'
import { useRef } from 'react'
import {
    RiMapPinLine,
    RiContactsLine,
    RiLogoutBoxRLine,
    RiShoppingBag3Line,
    RiUser6Line,
    RiCoupon3Line
} from 'react-icons/ri'
import { useAuth } from '../../../contexts/auth'
import { NavButton } from '../../SideBar/NavButton'

import { NavLink } from '../../SideBar/SidebarSubCategory/NavLink'
import { DialogSignOut } from '../DialogSignOut'

type IProps = {
    isOpen: boolean
    onClose: () => void
}

export function DialogMenuPerfil({ isOpen, onClose }: IProps) {
    const cancelRef = useRef()
    const { signOut } = useAuth()

    const {
        isOpen: isOpenSignOut,
        onOpen: onOpenSignOut,
        onClose: onCloseSignOut
    } = useDisclosure()

    function handleSignOut() {
        onClose()
        onOpenSignOut()
    }

    function handleOnClickSignOut() {
        onCloseSignOut()
        signOut()
    }

    return (
        <>
            <DialogSignOut
                onClose={onCloseSignOut}
                onClick={handleOnClickSignOut}
                isOpen={isOpenSignOut}
            />
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered>
                <AlertDialogOverlay />

                <AlertDialogContent
                    bg="white.900"
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
                        borderColor="transparent transparent #fff transparent"
                        borderStyle="solid"
                    />
                    <AlertDialogBody pb="60px">
                        <Stack
                            spacing={4}
                            align="flex-start"
                            py={6}
                            color="red">
                            <NavLink
                                href="/home"
                                icon={RiUser6Line}>
                                ver minha conta
                            </NavLink>
                            <NavLink
                                href="/logged/requests"
                                icon={RiShoppingBag3Line}>
                                meus pedidos
                            </NavLink>
                            <NavLink
                                href="/logged/coupons"
                                icon={RiCoupon3Line}>
                                meus vales
                            </NavLink>

                            <NavLink
                                icon={RiContactsLine}
                                href="/logged/profile">
                                cadastro
                            </NavLink>
                            <NavLink
                                icon={RiMapPinLine}
                                href="/logged/addresses">
                                endereço
                            </NavLink>

                            <NavButton
                                icon={RiLogoutBoxRLine}
                                onClick={handleSignOut}>
                                Sair
                            </NavButton>
                        </Stack>
                    </AlertDialogBody>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
