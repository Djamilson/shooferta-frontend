import {
  Box,
  Button,
  Button as ButtonChakra,
  Divider,
  Flex,
  FormControl,
  Stack,
  usePrefersReducedMotion,
  useToast,
  VStack
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FiArrowLeft } from 'react-icons/fi'
import { RiCheckFill } from 'react-icons/ri'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { IAddress } from '../../../../@model/address/address'
import {
  IBGEUFResponse,
  InputFormAddress
} from '../../../../components/Address/InputFormAddress'
import { SearchAddressComponent } from '../../../../components/Address/SearchAddressComponent'
import { Header } from '../../../../components/Header'
import { SideBar } from '../../../../components/logged/Sidebar'
import { SubTitle } from '../../../../components/SubTitle'
import { Title } from '../../../../components/Title'
import { useLocalization } from '../../../../contexts/localization'
import { useAddressById } from '../../../../hooks/Entity/useAddresses'
import { itemAnimationRight } from '../../../../styles/animation'
import { getStateUfName } from '../../../../utils/getStateName'
import { getStateUfSigla } from '../../../../utils/getStateSigla'
import { onlyNumbers } from '../../../../utils/only-numbers'
import { withSSRAuth } from '../../../../utils/withSSRAuth'
import { api } from '../../../../_services/apiClient'
import { queryClient } from '../../../../_services/queryClient'

type CepFormData = {
    zipCode: string
}

const updateFormSchema = yup.object().shape({
    street: yup.string().required('Rua/quadra!'),
    number: yup.string(),
    complement: yup.string(),
    neighborhood: yup.string().required('Bairro'),
    city: yup.string().required('Cidade obrigatório!'),
    state: yup.string().required('Estado obrigatório')
})

type IProps = {
    meInitialAddresses: IAddress
    meInitialStates: IBGEUFResponse[]
}

export default function EditAddress({
    meInitialAddresses,
    meInitialStates
}: IProps) {
    const toast = useToast()
    const router = useRouter()
    const addressId = router.query.id
    const {
        isLocalization,
        localed,
        getLocalization,
        getFreight,
        setLocalization
    } = useLocalization()

    const { data: address } = useAddressById(String(addressId), {
        initialData: meInitialAddresses
    })

    const {
        register,
        handleSubmit: handleSubmitAddress,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<Omit<IAddress, 'id' | 'person_id' | 'main'>>({
        resolver: yupResolver(updateFormSchema)
    })

    const updateAddress = useMutation(
        async (addressIn: IAddress) => {
            const meUpdateAddress = {
                ...address,
                ...addressIn,
                number: onlyNumbers(addressIn.number),
                zip_code: selectedZipCode.zipCode,
                state: getStateUfSigla(addressIn.state)
            }

            console.log('meUpdateAddress::', meUpdateAddress)
            const newAddress = await api.put('addresses', meUpdateAddress)

        
            return newAddress
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('addresses'),
                    queryClient.invalidateQueries(`address-${addressId}`)
            }
        }
    )
    const handleUpdateAddress: SubmitHandler<IAddress> = async data => {
        try {
            console.log('MREUS DADOS', data)
            await updateAddress.mutateAsync(data)
            router.push('/logged/addresses')

            toast({
                title: 'Sucesso',
                description: 'Endereço de entrega atualizardo com sucesso!',
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
                    'Erro ao tenta atualizar o endereço, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    const [selectedZipCode, setSelectedZipCode] = useState<CepFormData>(
        {} as CepFormData
    )
    useEffect(() => {
        console.log('address:', address)
        if (typeof address === 'object' && address !== null && address.id) {

            setValue('neighborhood', address.neighborhood)
            setValue('street', address.street)
            setValue('number', address.number)
            setValue('complement', address.complement)
            setValue('state', getStateUfName(address.state))
            setValue('city', address.city)
            setSelectedZipCode({ zipCode: address.zip_code })
        }
    }, [address])

    useEffect(() => {
        if (
            typeof selectedZipCode === 'object' &&
            selectedZipCode !== null &&
            selectedZipCode.zipCode &&
            typeof localed?.address === 'object' &&
            localed?.address !== null &&
            localed?.address.state
        ) {
            setValue('city', localed?.address.city)
            setValue('neighborhood', localed?.address.neighborhood)
            setValue('state', getStateUfName(localed?.address.state))
            setValue('street', localed?.address.street)
        }
    }, [isLocalization, localed])

    async function handleOnChangeAddress(zipCode: CepFormData) {
        try {
            const melocalizantion = await getLocalization(zipCode)

            const newLocalizationFreight = await getFreight(melocalizantion)

            setLocalization(newLocalizationFreight)
            setSelectedZipCode(zipCode)
        } catch (error) {}
    }
    const prefersReducedMotion = usePrefersReducedMotion()

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationRight} 1s`

    return (
        <Flex direction="column" flex="1" bg="cinza.400">
            <Header />
            <Flex w="100%" my="6" maxWidth={1440} mx="auto" px="6">
                <SideBar animationLeft={animationLeft} />

                <Box flex="1" bg="white.900" p={6}>
                    <Box
                        mt={{ base: 4, md: 0 }}
                        color="cinza.650"
                        ml={{ md: 6 }}>
                        <Box display={{ md: 'flex' }}>
                            <Title>endereços</Title>
                        </Box>
                        <SubTitle>
                            aqui você pode atualizarr, alterar ou excluir um dos
                            seus endereços
                        </SubTitle>
                        <Box mt={6} mb={10}>
                            <Button
                                maxWidth="250px"
                                h="48px"
                                borderRadius="0"
                                mt={{ base: 5, md: 0 }}
                                ml={{ base: 0, md: -5 }}
                                color="principal.900"
                                bg="none"
                                leftIcon={<FiArrowLeft />}
                                _hover={{
                                    textDecoration: `underline #DC1637`,
                                    border: '1px solid',
                                    marginLeft: 0
                                }}
                                onClick={() => router.back()}>
                                voltar
                            </Button>
                        </Box>
                    </Box>

                    <Box
                        flex="1"
                        mt={{ base: 4, md: 0 }}
                        ml={{ md: 6 }}
                        color="cinza.875">
                        <Stack
                            direction={['column']}
                            spacing={['6', '8']}
                            mt="10"
                            mb={6}
                            w="100%">
                            <SubTitle>Busca o endereço</SubTitle>
                            <Divider my="6" borderColor="cinza.500" />

                            <SearchAddressComponent
                                zipCode={selectedZipCode}
                                handleSubmit={handleOnChangeAddress}
                            />
                        </Stack>

                        <Flex
                            m="0"
                            as="form"
                            width="100%"
                            borderRadius="none"
                            flexDir="column"
                            onSubmit={handleSubmitAddress(handleUpdateAddress)}>
                            <VStack spacing="8">
                                <FormControl as="fieldset">
                                    <Box
                                        flex="1"
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center">
                                        <SubTitle>
                                            {localed?.address?.state
                                                ? 'Muito bom! seu endereço foi carregado. Complete-o.'
                                                : 'Faça a busca do endereço antes!'}
                                        </SubTitle>
                                    </Box>
                                    <Divider my="6" borderColor="cinza.500" />
                                    <InputFormAddress
                                        errors={errors}
                                        register={register}
                                        meInitialStates={meInitialStates}
                                        setValue={setValue}
                                    />
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
