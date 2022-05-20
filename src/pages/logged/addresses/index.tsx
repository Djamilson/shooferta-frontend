import {
    Box,
    Flex,
    SimpleGrid,
    Spinner,
    useDisclosure,
    usePrefersReducedMotion,
    useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useMutation } from 'react-query'
import { IAddress } from '../../../@model/address/address'
import { Address } from '../../../components/Address'
import { DialogExcluirAddress } from '../../../components/Address/DialogExcluirAddress'
import { ButtonLink } from '../../../components/ButtonLink'
import { Header } from '../../../components/Header'
import { SideBar } from '../../../components/logged/Sidebar'
import { MessageComponent } from '../../../components/MessageComponent'
import { SubTitle } from '../../../components/SubTitle'
import { Title } from '../../../components/Title'
import { useAuth } from '../../../contexts/auth'
import { useAddresses } from '../../../hooks/Entity/useAddresses'
import { itemAnimationRight } from '../../../styles/animation'
import { withSSRAuth } from '../../../utils/withSSRAuth'
import { api } from '../../../_services/apiClient'
import { queryClient } from '../../../_services/queryClient'

type IProps = {
    meInitialAddresses: IAddress[]
}

export default function Addresses({ meInitialAddresses }: IProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [selectedAddressEdit, setSelectedAddressEdit] = useState<IAddress>(
        {} as IAddress
    )
    const [selectedAddressDelete, setSelectedAddressDelete] =
        useState<IAddress>({} as IAddress)

    const { user } = useAuth()

    function handleOnClose() {
        onClose()
        setSelectedAddressDelete(undefined)
    }

    const { data: addresses } = useAddresses({
        initialData: meInitialAddresses
    })

    //selected address is open dialog
    useEffect(() => {
        if (
            typeof selectedAddressEdit === 'object' &&
            selectedAddressEdit !== null &&
            selectedAddressEdit.id
        ) {
            onOpen()
        }
    }, [selectedAddressEdit])

    //selected address is open dialog delete
    useEffect(() => {
        if (
            typeof selectedAddressDelete === 'object' &&
            selectedAddressDelete !== null &&
            selectedAddressDelete.id
        ) {
            onOpen()
        }
    }, [selectedAddressDelete])

    const deleteAddress = useMutation(
        async () => {
            await api.delete(`addresses/${selectedAddressDelete.id}`)

            return
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('addresses')
            }
        }
    )

    async function handleDelete() {
        try {
            await deleteAddress.mutateAsync()

            toast({
                title: 'Endereço excluido!',
                description: 'O endereço foi excluido com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (error) {
            console.log(error)
            let message =
                'Ocorreu uma falha ao tentar excluir, tente novamente!'

            toast({
                title: 'Falha ao tentar excluir!',
                description: message,
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } finally {
            handleOnClose()
        }
    }

    const updateAddressMain = useMutation(
        async () => {
            await api.put(`addresses/main/addresses/${selectedAddressMain.id}`)

            return
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('addresses')
            }
        }
    )

    const [isLoadingUpdateMain, setIsLoadingUpdateMain] =
        useState<boolean>(false)

    async function handleUpdateMain() {
        try {
            setIsLoadingUpdateMain(true)
            await updateAddressMain.mutateAsync()

            toast({
                title: 'Endereço alterado!',
                description: 'O endereço principal foi alterado com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (error) {
            console.log(error)
            let message =
                'Ocorreu uma falha ao tentar alterar o endereço principal, tente novamente!'

            toast({
                title: 'Falha ao tentar atualizar o endereço!',
                description: message,
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } finally {
            setSelectedAddressMain(undefined)
            setIsLoadingUpdateMain(false)
        }
    }

    const [selectedAddressMain, setSelectedAddressMain] = useState<IAddress>(
        {} as IAddress
    )
    //selectedAddressMain address setMain
    useEffect(() => {
      console.log("Emdereço", typeof addresses)
      console.log('Emdereço', JSON.stringify
        (addresses, null, 2))
      console.log(
          typeof addresses === 'object' &&
              addresses !== null &&
              addresses.length > 0
      )

        if (
            typeof selectedAddressMain === 'object' &&
            selectedAddressMain !== null &&
            selectedAddressMain.id
        ) {
            handleUpdateMain()
        }
    }, [selectedAddressMain])

    const prefersReducedMotion = usePrefersReducedMotion()

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationRight} 1s`

    return (
        <Flex direction="column" flex="1" bg="cinza.400">
            <Header />
            <Flex w="100%" my="6" maxWidth={1440} mx="auto" px="6">
                <SideBar animationLeft={animationLeft} />

                <Box flex="1" bg="cinza.400" p={6}>
                    <Box
                        mt={{ base: 4, md: 0 }}
                        color="cinza.650"
                        ml={{ md: 6 }}
                    >
                        <Box display={{ md: 'flex' }}>
                            <Title>endereços</Title>
                        </Box>
                        <SubTitle>
                            aqui você pode cadastrar, alterar ou excluir um dos
                            seus endereços
                        </SubTitle>
                        <Box display={{ md: 'flex' }} my={10}>
                            <ButtonLink
                                maxWidth="250px"
                                h="48px"
                                mt={{ base: 5, md: 0 }}
                                ml={{ base: 0, md: 'auto' }}
                                colorText="principal.900"
                                icon={FiPlus}
                                _hover={{
                                    textDecoration: `underline #DC1637`,
                                    border: '1px solid'
                                }}
                                border="2px solid"
                                borderColor="principal.900"
                                href="/logged/addresses/new"
                            >
                                cadastrar novo endereço
                            </ButtonLink>
                        </Box>
                    </Box>
                    <Box flex="1" mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                        {isLoadingUpdateMain && (
                            <Flex justify="center">
                                <Spinner
                                    color="red.500"
                                    size="lg"
                                    thickness="2px"
                                />
                            </Flex>
                        )}
                        <SimpleGrid
                            flex="1"
                            gap="4"
                            minChildWidth="320px"
                            my="10"
                        >
                            {selectedAddressDelete && (
                                <DialogExcluirAddress
                                    isOpen={isOpen}
                                    onClose={handleOnClose}
                                    data={selectedAddressDelete}
                                    handleDelete={handleDelete}
                                />
                            )}

                            {!(typeof addresses === 'object' &&
                                addresses !== null &&
                                addresses.length >
                                    0) && (
                                        <MessageComponent
                                            title="Ooops! não conseguimos encontrar endereço!"
                                            message="Você ainda não tem endereço cadastrado!"
                                        />
                                    )}
                            {user &&
                                addresses?.map((address: IAddress) => {
                                    return (
                                        <Address
                                            key={address.id}
                                            data={address}
                                            user={user}
                                            setSelectedAddressDelete={
                                                setSelectedAddressDelete
                                            }
                                            setSelectedAddressMain={
                                                setSelectedAddressMain
                                            }
                                            setIsLoadingUpdateMain={
                                                setIsLoadingUpdateMain
                                            }
                                        />
                                    )
                                })}
                        </SimpleGrid>
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
