import {
    Box,
    ButtonGroup,
    Divider,
    Flex,
    SimpleGrid,
    Spinner,
    Text,
    useDisclosure,
    usePrefersReducedMotion,
    useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { IPhone } from '../../../@model/phone/phone'
import { itemAnimationLeft } from '../../../styles/animation'
import { api } from '../../../_services/apiClient'
import { queryClient } from '../../../_services/queryClient'
import { Button } from '../../Buttons/Button'
import { MessageComponent } from '../../MessageComponent'
import { DialogExcluirPhone } from './DialogExcluirPhone'
import { ModalEditPhone } from './ModalEditPhone'
import { ModalNewPhone } from './ModalNewPhone'
import { Phone } from './Phone'

type IProps = {
    phones: IPhone[]
}

function TabPhone({ phones }: IProps) {
    const prefersReducedMotion = usePrefersReducedMotion()

    const toast = useToast()

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationLeft} 1s`

    const {
        isOpen: isOpenPhone,
        onOpen: onOpenPhone,
        onClose: onClosePhone
    } = useDisclosure()

    const {
        isOpen: isOpenEditPhone,
        onOpen: onOpenEditPhone,
        onClose: onCloseEditPhone
    } = useDisclosure()

    const [selectedEditPhone, setSelectedEditPhone] = useState<IPhone>(
        {} as IPhone
    )

    function handleOnCloseEditPhone() {
        onCloseEditPhone()
        setSelectedEditPhone(undefined)
    }

    const [selectedPhoneDelete, setSelectedPhoneDelete] = useState<IPhone>(
        {} as IPhone
    )

    const [selectedPhoneMain, setSelectedPhoneMain] = useState<IPhone>(
        {} as IPhone
    )

    const [isLoadingUpdateMain, setIsLoadingUpdateMain] =
        useState<boolean>(false)

    const {
        isOpen: isOpenDeletePhone,
        onOpen: onOpenDeletePhone,
        onClose: onCloseDeletePhone
    } = useDisclosure()

    function handleOnClose() {
        onCloseDeletePhone()
        setSelectedPhoneDelete(undefined)
    }

    //selected Phone is open dialog delete
    useEffect(() => {
        if (
            typeof selectedPhoneDelete === 'object' &&
            selectedPhoneDelete !== null &&
            selectedPhoneDelete.id
        ) {
            onOpenDeletePhone()
        }
    }, [selectedPhoneDelete])

    //selected Phone is open dialog edit
    useEffect(() => {
        if (
            typeof selectedEditPhone === 'object' &&
            selectedEditPhone !== null &&
            selectedEditPhone.id
        ) {
            onOpenEditPhone()
        }
    }, [selectedEditPhone])

    const deletePhone = useMutation(
        async () => {
            await api.delete(`phones/${selectedPhoneDelete.id}`)

            return
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('phones')
            }
        }
    )

    async function handleDelete() {
        try {
            await deletePhone.mutateAsync()

            toast({
                title: 'Telefone excluido!',
                description: 'O telefone foi excluido com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (error) {
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

    const updatePhoneMain = useMutation(
        async () => {
            await api.patch(`phones/main/${selectedPhoneMain.id}`)

            return
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('phones')
            }
        }
    )

    async function handleUpdateMain() {
        try {
            setIsLoadingUpdateMain(true)
            await updatePhoneMain.mutateAsync()

            toast({
                title: 'Telefone alterado!',
                description: 'O telefone principal foi alterado com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (error) {
            console.log(error)
            let message =
                'Ocorreu uma falha ao tentar alterar o telefone principal, tente novamente!'

            toast({
                title: 'Falha ao tentar atualizar o telefone!',
                description: message,
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } finally {
            setSelectedPhoneMain(undefined)
            setIsLoadingUpdateMain(false)
        }
    }

    //selectedPhoneMain address setMain
    useEffect(() => {
        if (
            typeof selectedPhoneMain === 'object' &&
            selectedPhoneMain !== null &&
            selectedPhoneMain.id
        ) {
            handleUpdateMain()
        }
    }, [selectedPhoneMain])

    return (
        <Box
            flex="1"
            justifyContent="center"
            display="flex"
            flexDir="column"
            animation={animationLeft}>
            <ButtonGroup spacing="6" justifyContent="flex-end">
                <Button
                    type="button"
                    mt="24px"
                    px={10}
                    py={6}
                    onClick={onOpenPhone}
                    isActive={true}
                    colorScheme="principal.900">
                    <Text
                        color="white.900"
                        fontSize="16px"
                        fontWeight="500"
                        fontFamily="inter"
                        lineHeight="19.36px">
                        novo telefone
                    </Text>
                </Button>
            </ButtonGroup>
            <Divider my="6" borderColor="cinza.500" />
            <ModalNewPhone isOpen={isOpenPhone} onClose={onClosePhone} />

            <ModalEditPhone
                data={selectedEditPhone}
                isOpen={isOpenEditPhone}
                onClose={handleOnCloseEditPhone}
            />

            {selectedPhoneDelete && (
                <DialogExcluirPhone
                    isOpen={isOpenDeletePhone}
                    onClose={handleOnClose}
                    data={selectedPhoneDelete}
                    handleDelete={handleDelete}
                />
            )}

            {isLoadingUpdateMain && (
                <Flex justify="center">
                    <Spinner color="red.500" />
                </Flex>
            )}
            <SimpleGrid
                flex="1"
                gap="4"
                animation={animationLeft}
                minChildWidth="320px"
                my="10">
                {phones?.length < 1 && (
                    <MessageComponent
                        title="Ooops! não conseguimos encontrar telefone!"
                        message="Você ainda não tem telefone cadastrado!"
                    />
                )}

                {phones?.length > 0 &&
                    phones.map((phone: IPhone) => {
                        return (
                            <Phone
                                key={phone.id}
                                data={phone}
                                setSelectedPhoneDelete={setSelectedPhoneDelete}
                                setSelectedEditPhone={setSelectedEditPhone}
                                setSelectedPhoneMain={setSelectedPhoneMain}
                                setIsLoadingUpdateMain={setIsLoadingUpdateMain}
                            />
                        )
                    })}
            </SimpleGrid>
        </Box>
    )
}
export { TabPhone }
