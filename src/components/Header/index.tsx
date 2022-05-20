import {
    Flex,
    Icon,
    IconButton,
    Link as ChakraLink,
    useBreakpointValue,
    useDisclosure,
    usePrefersReducedMotion
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { RiMenuLine } from 'react-icons/ri'
import { useSiderbarDrawer } from '../../hooks/SideBarDrawerContext'
import { animationItemFloat } from '../../styles/animation'
import { DialogLogin } from '../DialogLogin'
import { Logo01 } from '../Logos/Logo01'
import { DialogMenuPerfil } from './DialogMenuPerfil'
import { HeaderCart } from './HeaderCart'
import { Profile } from './Profile'

export function Header() {
    const router = useRouter()
    const { onOpen } = useSiderbarDrawer()

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const {
        isOpen: isOpenDialogLogin,
        onOpen: onOpenDialogLogin,
        onClose: onCloseDialogLogin
    } = useDisclosure()

    const {
        isOpen: isOpenDialogMenuPerfil,
        onOpen: onOpenDialogMenuPerfil,
        onClose: onCloseDialogMenuPerfil
    } = useDisclosure()

    function handleSignIn() {
        router.push('/shared/signin')
    }

    function handleSignUp() {
        router.push('/shared/signup')
    }

    const prefersReducedMotion = usePrefersReducedMotion()

    const animationFloat = prefersReducedMotion
        ? undefined
        : `${animationItemFloat} 5s ease-in-out infinite`

    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1440}
            h="20"
            py="6"
            px="6"
            align="center"
            bg="principal.900">
            {!isWideVersion && (
                <IconButton
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="24px"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                />
            )}

            <Link href="/home" as="/home">
                <ChakraLink >
                    <Logo01 animation={animationFloat} />
                </ChakraLink>
            </Link>

            <Flex ml="auto">
                <DialogLogin
                    isOpen={isOpenDialogLogin}
                    onClose={onCloseDialogLogin}
                    handleSignIn={handleSignIn}
                    handleSignUp={handleSignUp}
                />

                <DialogMenuPerfil
                    isOpen={isOpenDialogMenuPerfil}
                    onClose={onCloseDialogMenuPerfil}
                />

                <Profile
                    showProfileData={isWideVersion}
                    onOpenDialogMenuPerfil={onOpenDialogMenuPerfil}
                    onOpenDialogLogin={onOpenDialogLogin}
                />
                <HeaderCart showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    )
}
