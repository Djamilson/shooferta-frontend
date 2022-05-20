import {
  Box,
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
import React, { FormEvent } from 'react'
import { RiMenuLine } from 'react-icons/ri'
import { useSiderbarDrawer } from '../../../hooks/SideBarDrawerContext'
import  UseStickyHeader  from '../../../hooks/useSticky'
import { itemAnimationTop } from '../../../styles/animation'
import { DialogLogin } from '../../DialogLogin'
import { Logo01 } from '../../Logos/Logo01'
import { DialogMenuPerfil } from '../DialogMenuPerfil'
import { HeaderCart } from '../HeaderCart'
import { Profile } from '../Profile'
import { SearchBox } from '../SearchBox'

type IProps = {
    handleSearch: (event: FormEvent) => void
}

export function HeaderSearch({ handleSearch }: IProps) {
    const { isSticky, boxShadow } = UseStickyHeader()
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

    const animationItemAnimationTop = prefersReducedMotion
        ? undefined
        : `${itemAnimationTop} 300ms`

    return !!isSticky ? (
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
                <ChakraLink>
                    <Logo01 />
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

                {isWideVersion && (

                        <SearchBox handleSearch={handleSearch} />

                )}

                <Profile
                    showProfileData={isWideVersion}
                    onOpenDialogMenuPerfil={onOpenDialogMenuPerfil}
                    onOpenDialogLogin={onOpenDialogLogin}
                />
                <HeaderCart showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    ) : (
        <Flex
            as="header"
            w="100%"
            maxWidth={1440}
            h="20"
            py="6"
            px="6"
            align="center"
            bg="principal.900"
            zIndex="5"
            animation={animationItemAnimationTop}
            css={{
                height: '80px',
                position: `fixed`,
                transition: `top 0.5s ease-in-out`,
            }}>
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
                <ChakraLink>
                    <Logo01 />
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

                {isWideVersion && (
                    <Box w={{ base: '100%', md: '60%' }}>
                        <SearchBox handleSearch={handleSearch} />
                    </Box>
                )}

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
