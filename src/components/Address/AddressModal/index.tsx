import {
  Box,
  Button,
  Button as ButtonChakra,
  Divider,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdArrowForward } from 'react-icons/md'
import { RiCheckFill } from 'react-icons/ri'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { IAddress } from '../../../@model/address/address'
import { ILocalizationDTO } from '../../../@model/address/LocaledDTO'
import * as masks from '../../../components/Form/InputMask/masks'
import { useLocalization } from '../../../contexts/localization'
import { schemaValidationNumber } from '../../../utils/schema'
import { api } from '../../../_services/apiClient'
import { Input } from '../../Form/Input'
import { SubTitle } from '../../SubTitle'
import { Title } from '../../Title'
import { SearchAddressComponent } from '../SearchAddressComponent'

type CepFormData = {
    zipCode: string
}

type IProps = {
    isOpen: boolean
    onClose: () => void
    handleSubmitCep: (zipCode: CepFormData) => Promise<void>
    isLocalization: boolean
    localed: ILocalizationDTO
}

const paymentFormSchema = yup.object().shape({
    street: yup.string().required('Rua/quadra!'),
    number: schemaValidationNumber,
    complement: yup.string(),
    neighborhood: yup.string().required('Bairro'),
    city: yup.string().required('Cidade obrigatório!'),
    state: yup.string().required('Estado obrigatório')
})

function AddressModal({
    isOpen,
    onClose,
    handleSubmitCep,
    isLocalization,
    localed
}: IProps) {
    const toast = useToast()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<Omit<IAddress, 'id'| 'person_id'| 'main'>>({
        resolver: yupResolver(paymentFormSchema)
    })

    const createAddress = useMutation(
        async (address: Omit<IAddress, 'id' | 'person_id' | 'main'>) => {
            const newAddress = await api.post('addresses', {
                ...address,
                zip_code: localed?.address.cep
            })
            return newAddress
        },
        {
            onSuccess: () => {
                //queryClient.invalidateQueries('photos')
            }
        }
    )
    const handleAddress: SubmitHandler<
        Omit<IAddress, 'id'| 'person_id'| 'main'>
    > = async data => {
        try {
            console.log('MREUS DADOS', data)
            await createAddress.mutateAsync(data)
            onClose()

            toast({
                title: 'Sucesso',
                description: 'Endereço de entrega cadastrado com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (error) {
            console.log('Error::', error)
            toast({
                title: 'Erro no endereço',
                description:
                    'Erro ao tenta cadastra o endereço, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    useEffect(() => {
        if (isLocalization) {
            setValue('city', localed.address.city)
            setValue('neighborhood', localed.address.neighborhood)
            setValue('state', localed.address.state)
            setValue('street', localed.address.street)
        }
    }, [isLocalization, localed])

    const router = useRouter()

    function handleMyAccount() {
        router.push('/logged/addresses')
    }

    const { clearLocalization } = useLocalization()

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size="xl">
            <ModalOverlay />
            <ModalContent color="cinza.875" borderRadius="0">
                <ModalHeader>
                    <Title>
                        {isLocalization
                            ? `Complente o endereço de entrega`
                            : `Entre com CEP de entrega`}
                    </Title>
                </ModalHeader>
                <ModalBody>
                    {isLocalization ? (
                        <Flex
                            m="0"
                            as="form"
                            width="100%"
                            borderRadius="none"
                            flexDir="column"
                            onSubmit={handleSubmit(handleAddress)}>
                            <VStack spacing="8">
                                <FormControl as="fieldset">
                                    <Box
                                        flex="1"
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center">
                                        <SubTitle>Endereço</SubTitle>

                                        <Text>
                                            {localed?.address.cep}
                                            <ButtonChakra
                                                ml={4}
                                                colorScheme="teal"
                                                onClick={() =>
                                                    clearLocalization()
                                                }
                                                variant="link">
                                                alterar CEP
                                            </ButtonChakra>
                                        </Text>
                                    </Box>
                                    <Divider my="6" borderColor="cinza.500" />
                                    <Stack
                                        direction={['column']}
                                        spacing={['6', '8']}
                                        mt="10"
                                        mb={14}
                                        w="100%">
                                        <Box flex="1" display="flex">
                                            <Input
                                                name="street"
                                                label="Rua/quadra"
                                                placeholder=""
                                                isDisabled
                                                labelPlaceHolder="Rua/quadra"
                                                {...register('street', {
                                                    required: true
                                                })}
                                                error={errors.street}
                                            />
                                            <Box
                                                display="flex"
                                                w="300px"
                                                ml={8}>
                                                <Input
                                                    name="number"
                                                    label="Número Lote/Casa"
                                                    placeholder=""
                                                    labelPlaceHolder="Número Lote/Casa"
                                                    {...register('number', {
                                                        required: true
                                                    })}
                                                    error={errors.number}
                                                    onChange={
                                                        masks.numberByMask
                                                            .onChange
                                                    }
                                                />
                                            </Box>
                                        </Box>
                                        <Input
                                            name="complement"
                                            label="Complemento"
                                            placeholder=""
                                            labelPlaceHolder="Complemento"
                                            {...register('complement', {
                                                required: true
                                            })}
                                            error={errors.complement}
                                        />
                                        <Input
                                            name="neighborhood"
                                            label="Bairro"
                                            placeholder=""
                                            labelPlaceHolder="Bairro"
                                            {...register('neighborhood', {
                                                required: true
                                            })}
                                            error={errors.neighborhood}
                                        />

                                        <SimpleGrid
                                            columns={[1, 2]}
                                            spacing={8}>
                                            <Input
                                                name="city"
                                                label="Cidade"
                                                placeholder=""
                                                labelPlaceHolder="Cidade"
                                                {...register('city', {
                                                    required: true
                                                })}
                                                error={errors.city}
                                            />
                                            <Input
                                                name="state"
                                                label="State"
                                                placeholder=""
                                                labelPlaceHolder="Estado"
                                                {...register('state', {
                                                    required: true
                                                })}
                                                error={errors.state}
                                            />
                                        </SimpleGrid>
                                    </Stack>
                                </FormControl>
                            </VStack>
                            <Box
                                flex="1"
                                display="flex"
                                justifyContent="flex-end"
                                alignItems="center"
                                mb={5}>
                                <ButtonChakra
                                    h="54px"
                                    w={{ base: '100%', md: '260px' }}
                                    mt={{ base: 5, md: 0 }}
                                    borderRadius="none"
                                    _hover={{
                                        textDecoration: `underline #fff`
                                    }}
                                    bg="principal.900"
                                    color="white.900"
                                    leftIcon={<RiCheckFill fontSize={22} />}
                                    type="submit"
                                    isLoading={isSubmitting}>
                                    salvar
                                </ButtonChakra>
                            </Box>
                        </Flex>
                    ) : (
                        <Box
                            flex="1"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            flexDir="column"
                            mb={10}>
                            <SearchAddressComponent
                                handleSubmit={handleSubmitCep}
                            />
                            <Button
                                mt={10}
                                leftIcon={<MdArrowForward fontSize="18px" />}
                                justifyContent="center"
                                alignItems="center"
                                bg="none"
                                w="100%"
                                h="48px"
                                _hover={{
                                    opacity: 0.7,
                                    textDecoration: 'none'
                                }}
                                _focus={{ boxShadow: 'outline' }}
                                onClick={handleMyAccount}
                                borderRadius="none"
                                variant="link">
                                <Box
                                    as="span"
                                    fontSize="16px"
                                    fontFamily="Inter"
                                    lineHeight="14px"
                                    fontWeight="400"
                                    color="cinza.825">
                                    clicando aqui você pode editar o endereço
                                    antes de continuar!
                                </Box>
                            </Button>
                        </Box>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export { AddressModal }
