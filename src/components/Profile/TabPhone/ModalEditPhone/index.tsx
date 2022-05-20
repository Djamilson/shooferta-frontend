import {
    Button,
    ButtonGroup,
    Divider,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaPhoneAlt } from 'react-icons/fa'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { IPhone } from '../../../../@model/phone/phone'
import * as masks from '../../../../components/Form/InputMask/masks'
import { schemaValidationPhone } from '../../../../utils/schema'
import { api } from '../../../../_services/apiClient'
import { queryClient } from '../../../../_services/queryClient'
import { Input } from '../../../Form/Input'
import { IFormPhone } from '../ModalNewPhone'

type IProps = {
    isOpen: boolean
    onClose: () => void
    data: IPhone
}
const upPhoneFormSchema = yup.object().shape({
    phone: schemaValidationPhone
})

function ModalEditPhone({ isOpen, onClose, data }: IProps) {
    const toast = useToast()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<IFormPhone>({
        resolver: yupResolver(upPhoneFormSchema)
    })

    useEffect(() => {
        if (data?.phone) {
            setValue('phone', masks.phoneMask.maskDefault(data?.phone))
        }
    }, [data])

    const phoneData = useMutation(
        async (meData: IFormPhone) => {
            await api.put(`phones/users/${data.id}`, meData)

            return phoneData
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('phones')
            }
        }
    )
    const handleNewPhone: SubmitHandler<IFormPhone> = async data => {
        try {
            console.log('data:', data)
            await phoneData.mutateAsync(data)

            console.log('data:', data)
            onClose()

            toast({
                title: 'Telefone editado',
                description: 'Telefone foi editado com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (error) {
            toast({
                title: 'Erro na edição',
                description:
                    'Não foi possível editar o telefone, esse telefone já pode está sendo usado, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent color="cinza.875" borderRadius="0">
                <ModalHeader>Editando o telefone</ModalHeader>
                <Divider mb="6" borderColor="cinza.500" />
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex
                        as="form"
                        width="100%"
                        maxWidth={460}
                        borderRadius="none"
                        flexDir="column"
                        onSubmit={handleSubmit(handleNewPhone)}>
                        <Stack spacing={6} mt={4}>
                            <Input
                                name="phone"
                                icon={FaPhoneAlt}
                                label="Telefone"
                                placeholder=""
                                labelPlaceHolder="Novo telefone"
                                {...register('phone', {
                                    required: true
                                })}
                                onChange={masks.phoneMask.onChange}
                                error={errors.phone}
                                color="cinza.900"
                            />
                        </Stack>
                        <Divider my="6" borderColor="cinza.500" />
                        <ButtonGroup spacing="6" justifyContent="flex-end">
                            <Button
                                borderRadius="0"
                                type="submit"
                                w="auto"
                                px={10}
                                isLoading={isSubmitting}
                                isActive={true}
                                colorScheme="principal.900"
                                bg="principal.900">
                                <Text
                                    color="white.900"
                                    fontSize="16px"
                                    fontWeight="500"
                                    fontFamily="inter"
                                    lineHeight="19.36px">
                                    salvar
                                </Text>
                            </Button>

                            <Button px={10} borderRadius="0" onClick={onClose}>
                                cancelar
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export { ModalEditPhone }
