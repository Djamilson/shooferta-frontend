import {
    Box,
    Container,
    Flex,
    Icon,
    IconButton,
    Link as ChakraLink,
    Text,
    useBreakpointValue,
    useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiMenuLine } from 'react-icons/ri'
import IPolitic from '../../../../@model/politic/politic'
import { usePolitic } from '../../../../hooks/Entity/usePolitics'
import { useSiderbarDrawer } from '../../../../hooks/SideBarDrawerContext'
import { Logo01 } from '../../../Logos/Logo01'
import { SubTitle } from '../../../SubTitle'
import { Title } from '../../../Title'

type IProps = {
    meInitPolitic: IPolitic
}

function PoliticComponent({ meInitPolitic }: IProps) {
    const router = useRouter()
    const { id } = router.query    

    const {
        data: mePolitic,
        isLoading: isLoadingPolitic,
        isFetching: isFetchingPolitic,
        error: errorPolitic
    } = usePolitic(String(id), { initialData: meInitPolitic })

    const [politic, setPolitic] = useState<IPolitic>({} as IPolitic)

    useEffect(() => {
        console.log('estou pronto:', JSON.stringify(mePolitic, null, 2))

        if (
            typeof mePolitic === 'object' &&
            mePolitic !== null &&
            mePolitic.id
        ) {
            setPolitic(mePolitic)
        }
    }, [mePolitic])

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
        //onClose()
    }

    function handleSignUp() {
        router.push('/shared/signup')
        //onClose()
    }

    return (
        <Flex direction="column" flex="1" bg="cinza.400">
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
            </Flex>

            <Flex w="100%" my="6" maxWidth={1440} mx="auto" px="6">
                <Box flex="1" bg="white.900" p={6}>
                    <Box
                        mt={{ base: 4, md: 0 }}
                        color="cinza.650"
                        ml={{ md: 6 }}>
                        <Title>Nossas políticas</Title>

                        <SubTitle>
                            aqui tá encontra-se nossas políticas atualizadas,
                        </SubTitle>
                    </Box>
                    <Box mt={10} ml={{ md: 6 }}>
                        <Container maxW="xl" centerContent>
                            <Box padding="4" maxW="3xl">
                                {politic?.name}
                            </Box>
                            <Box w="100%" color="cinza.875" display="flex">
                                <Text
                                    as="p"
                                    fontWeight="400"
                                    fontFamily="inter"
                                    fontSize="16px">
                                    {politic?.description}
                                </Text>
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}

export { PoliticComponent }
