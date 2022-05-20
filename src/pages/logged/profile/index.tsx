import {
    Box,
    Flex,
    SimpleGrid,
    useBreakpointValue,
    usePrefersReducedMotion,
    VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { IPerson } from '../../../@model/person/person'
import { IPhone } from '../../../@model/phone/phone'
import { Dropzone } from '../../../components/Form/Dropzone'
import { Header } from '../../../components/Header'
import { SideBar } from '../../../components/logged/Sidebar'
import { Profile as ProfileData } from '../../../components/Profile'
import { SubTitle } from '../../../components/SubTitle'
import { Title } from '../../../components/Title'
import { useAuth } from '../../../contexts/auth'
import { usePhones } from '../../../hooks/Entity/usePhones'
import { useUser } from '../../../hooks/Entity/useUsers'
import {
    itemAnimationLeft,
    itemAnimationRight
} from '../../../styles/animation'
import { withSSRAuth } from '../../../utils/withSSRAuth'

type IProps = {
    user: {
        id: string
        is_verified: boolean
        firstName: string
        person: IPerson
        roles: string[]
    }
    phones: IPhone[]
}

export default function Profilse({ user: meUser, phones: mePhones }: IProps) {
    const mt = useBreakpointValue({ base: 4, md: 0 })

    const { updateUser } = useAuth()

    const [selectedFile, setSelectedFile] = useState<File>()

    const prefersReducedMotion = usePrefersReducedMotion()

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationLeft} 1s`

    const animationRight = prefersReducedMotion
        ? undefined
        : `${itemAnimationRight} 1s`

    const {
        data: user,
        isLoading,
        isFetching,
        error
    } = useUser({
        initialData: meUser
    })

    const { data: phones } = usePhones({
        initialData: mePhones
    })

    return (
        <Flex direction="column" flex="1" bg="cinza.400">
            <Header />
            <Flex w="100%" my="6" maxWidth={1440} mx="auto" px="6">
                <SideBar animationLeft={animationLeft} />

                <Box flex="1" bg="white.900" p={6} animation={animationRight}>
                    <Box
                        mt={{ base: 4, md: 0 }}
                        color="cinza.650"
                        ml={{ md: 6 }}>
                        <Title>Meu Perfil</Title>

                        <SubTitle>
                            aqui tá seu pedido mais recente, acompanhe todos
                            pelo menu lateral meus pedidos
                        </SubTitle>
                    </Box>
                    <Box mt={mt} ml={{ md: 6 }} justifyContent="center">
                        <Flex
                            mt="20px"
                            display="flex"
                            flexDir="column"
                            align="center">
                            <VStack spacing="8">
                                <SimpleGrid
                                    minChildWidth="240px"
                                    spacing={['6', '8']}
                                    mt="10"
                                    w="100%">
                                    <Dropzone
                                        onFileUploaded={setSelectedFile}
                                    />
                                </SimpleGrid>
                            </VStack>
                        </Flex>

                        <ProfileData
                            user={user}
                            updateUser={updateUser}
                            phones={phones}
                        />
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}
export const getServerSideProps = withSSRAuth(
    async ctx => {
        return {
            props: {}
        }
    },
    {
        roles: ['Colaborador']
    }
)
