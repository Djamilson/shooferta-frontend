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
import { ISearchAddress } from '../../../../@model/address/searchAddress'
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
import { itemAnimationRight } from '../../../../styles/animation'
import { getStateUfName } from '../../../../utils/getStateName'
import { schemaValidationNumber } from '../../../../utils/schema'
import { withSSRAuth } from '../../../../utils/withSSRAuth'
import { api } from '../../../../_services/apiClient'
import { queryClient } from '../../../../_services/queryClient'
import { getStateUfSigla } from '../../../../utils/getStateSigla'

type CepFormData = {
    zipCode: string
}

export const addressFormSchema = yup.object().shape({
    street: yup
        .string()
        .required('Você precisa entrar com o CEP para a busca da Rua/quadra!'),
    number: schemaValidationNumber,
    complement: yup.string(),
    neighborhood: yup.string().required('Bairro'),
    city: yup.string().required('Cidade obrigatório!'),
    state: yup.string().required('Estado obrigatório')
})

type IProps = {
    meInitialStates: IBGEUFResponse[]
}

export default function NewAddress({ meInitialStates }: IProps) {
    const toast = useToast()
    const router = useRouter()
    const { localed, getLocalization, getFreight, setLocalization } =
        useLocalization()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<Omit<IAddress, 'id' | 'person_id' | 'main'>>({
        resolver: yupResolver(addressFormSchema)
    })

    const createAddress = useMutation(
        async (address: Omit<IAddress, 'id' | 'person_id' | 'main'>) => {
            console.log('Tenho que salvar?', address)

            const newAddress = await api.post('addresses', address)
            return newAddress
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('addresses')
            }
        }
    )
    const handleAddress: SubmitHandler<
        Omit<IAddress, 'id' | 'person_id' | 'main'>
    > = async data => {
        try {
            if (!localed?.address.cep) {
                toast({
                    title: 'Erro',
                    description:
                        'Falta o CEP do endereço, tente adicionar o CEP!',
                    status: 'error',
                    duration: 3000,
                    position: 'top-right',
                    isClosable: true
                })
                return
            }

        
            await createAddress.mutateAsync({
                ...data,
                zip_code: localed?.address.cep,
                state: getStateUfSigla(data.state)
            })
            router.push('/logged/addresses')

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
    const [searchAddress, setSearchAddress] = useState<ISearchAddress>(
        {} as ISearchAddress
    )

    useEffect(() => {
        if (
            typeof searchAddress === 'object' &&
            searchAddress !== null &&
            searchAddress.state
        ) {
            setValue('city', searchAddress?.city)
            setValue('neighborhood', searchAddress?.neighborhood)
            setValue('state', getStateUfName(searchAddress?.state))
            setValue('street', searchAddress?.street)
        }
    }, [searchAddress])

    async function handleOnChangeAddress(zipCode: CepFormData) {
        try {
            const melocalizantion = await getLocalization(zipCode)

            setSearchAddress(melocalizantion)

            const newLocalizationFreight = await getFreight(melocalizantion)

            setLocalization(newLocalizationFreight)
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
                            aqui você pode cadastrar, alterar ou excluir um dos
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
                                handleSubmit={handleOnChangeAddress}
                            />
                        </Stack>

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
