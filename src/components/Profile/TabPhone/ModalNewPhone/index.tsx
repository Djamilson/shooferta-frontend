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
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaPhoneAlt } from 'react-icons/fa'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import * as masks from '../../../../components/Form/InputMask/masks'
import { schemaValidationPhone } from '../../../../utils/schema'
import { api } from '../../../../_services/apiClient'
import { queryClient } from '../../../../_services/queryClient'
import { Input } from '../../../Form/Input'

type IProps = {
    isOpen: boolean
    onClose: () => void
}
const upPhoneFormSchema = yup.object().shape({
    phone: schemaValidationPhone
})

export type IFormPhone = {
    phone: string
}

function ModalNewPhone({ isOpen, onClose }: IProps) {
    const toast = useToast()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<IFormPhone>({
        resolver: yupResolver(upPhoneFormSchema)
    })

    const phoneData = useMutation(
        async (meData: IFormPhone) => {
            await api.post('phones/users', meData)

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
            reset()

            console.log('data:', data)
            onClose()

            toast({
                title: 'Telefne criado',
                description: 'Telefone foi criado com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (error) {
            console.log(error.message)

            let message = 'Não foi possível cria o telefone, tente novamente!'

            console.log(error.response.data.statusCode)
            if (error.response.data.statusCode === 401) {
                message =
                    'Esse número de telefone já está cadastrado, tente novamente!'
            }

            toast({
                title: 'Erro na criação.',
                description: message,
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
                <ModalHeader>Criando novo telefone</ModalHeader>
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

export { ModalNewPhone }
