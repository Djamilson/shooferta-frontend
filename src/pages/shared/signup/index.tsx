import {
  Box, Checkbox, Flex, Link as ChakraLink, Stack,
  Text, useBreakpointValue,
  useDisclosure, usePrefersReducedMotion, useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import Router from 'next/router'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FiLock, FiMail } from 'react-icons/fi'
import { MdOutlineVisibilityOff } from 'react-icons/md'
import { RiCarLine, RiCheckLine, RiUser6Line } from 'react-icons/ri'
import * as yup from 'yup'
import { IUseRoles } from '../../../@model/user/useRoles'
import { Button } from '../../../components/Buttons/Button'
import { Input } from '../../../components/Form/Input'
import { ModalCreateAccountSuccess } from '../../../components/Modal/ModalCreateAccount'
import { NavLinkPage } from '../../../components/NavLinkPage'
import { BackgroundHeader } from '../../../components/Shared/BackgroundHeader'
import { HeaderForm } from '../../../components/Shared/HeaderForm'
import TemplateOne from '../../../components/Template/One'
import { itemAnimationTop } from '../../../styles/animation'
import { withSSRGuest } from '../../../utils/withSSRGuest'
import { api } from '../../../_services/apiClient'










const signUpFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    phone: yup.string().required('Telefone obrigatório'),
    cpf: yup.string().required('CPF obrigatório'),

    birth_date: yup.string().required('Data de nascimento obrigatório'),
    password: yup
        .string()
        .required('Senha obrigatória')
        .min(6, 'No mínimo 6 caracteres'),
    confirmPassword: yup
        .string()
        .required('Confirma senha é obrigatória')
        .oneOf([yup.ref('password')], 'As senhas estão diferentes!')
})

type SignUpFormData = {
    name: string
    email: string
    password: string
    confirmPassword: string
    phone: string
    cpf: string
    birth_date: string
}

export default function SignUp() {
    const toast = useToast()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignUpFormData>({
        resolver: yupResolver(signUpFormSchema)
    })

    const handleSignUp: SubmitHandler<SignUpFormData> = async data => {
        try {
            const nameGroup = IUseRoles.ROLECLIENT

            await api.post('users/customers/accounts', {
                name: data.name,
                email: data.email,
                phone: data.phone,
                birth_date: data.birth_date,
                password: data.password,
                cpf: data.cpf,
                nameGroup
            })

            onOpen()
        } catch (error) {
            toast({
                title: 'Erro na criação.',
                description: 'Não foi possível criar a conta, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    const [show, setShow] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleClick = () => {
        setShow(!show)
    }

    const handleClickConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const { isOpen, onOpen, onClose: chackraOnClose } = useDisclosure()

    function onClose() {
        chackraOnClose()
        Router.push('/shared/signin')
    }

    const prefersReducedMotion = usePrefersReducedMotion()

    const animationItemAnimationTop = prefersReducedMotion
        ? undefined
        : `${itemAnimationTop} 1s`

    return (
        <Flex direction="row" maxWidth={1440}>
            <ModalCreateAccountSuccess
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                icon={RiCheckLine}
                colorIcon="green.900"
                title="Conta criada"
                message="Agora você faz parte da RentX. Seja bem-vindo(a)."
            />

            <Box flex="1" bg="cinza.400" flexDir="column" overflowX="hidden">
                <BackgroundHeader>
                    <NavLinkPage
                        mt="10px"
                        href="/"
                        fontFamily="inter"
                        fontWeight="semibold"
                        w="52px"
                        h="25px"
                        fontSize="16px"
                        color="cinza.900"
                        _hover={{ color: 'purple.500' }}
                        _focus={{ boxShadow: 'outline' }}>
                        <Text
                            fontFamily="inter"
                            fontWeight="600"
                            fontSize="20px"
                            lineHeight="25px">
                            Início
                        </Text>
                    </NavLinkPage>
                </BackgroundHeader>

                <TemplateOne
                    path_image="../../../challenger.png"
                    path_imageRetangle01="../../../rectangle-cinza-01.png"
                    path_imageRetangle02="../../../rectangle-cinza-02.png">
                    <HeaderForm
                        title="Crie sua conta"
                        description="Faça seu cadastro de forma rápida e fácil."
                    />

                    <Flex
                        p={8}
                        as="form"
                        width="100%"
                        maxWidth={460}
                        borderRadius="none"
                        flexDir="column"
                        animation={animationItemAnimationTop}
                        onSubmit={handleSubmit(handleSignUp)}>
                        <Stack spacing="4">
                            <Input
                                name="name"
                                type="text"
                                icon={RiUser6Line}
                                color="cinza.900"
                                placeholder="Nome"
                                {...register('name', {
                                    required: true
                                })}
                                error={errors.name}
                            />
                            <Input
                                name="email"
                                type="email"
                                icon={FiMail}
                                color="cinza.900"
                                placeholder="Email"
                                {...register('email', {
                                    required: true
                                })}
                                error={errors.email}
                            />
                            <Checkbox
                                defaultChecked
                                fontSize="14px"
                                color="cinza.650">
                                receber e-mails promocionais
                            </Checkbox>
                            <Input
                                name="birth_date"
                                type="text"
                                icon={RiCarLine}
                                color="cinza.900"
                                placeholder="Data de nascimento"
                                {...register('birth_date', {
                                    required: true
                                })}
                                error={errors.birth_date}
                            />
                            <Input
                                name="cpf"
                                type="text"
                                icon={RiCarLine}
                                color="cinza.900"
                                placeholder="CPF"
                                {...register('cpf', {
                                    required: true
                                })}
                                error={errors.cpf}
                            />
                            <Box>
                                <Box>
                                    * gênero
                                    <Box as="span">
                                        pra gente te conhecer um pouquinho
                                        melhor :)
                                    </Box>
                                </Box>
                                <Stack
                                    spacing={[1, 5]}
                                    direction={['column', 'row']}>
                                    <Checkbox size="md" colorScheme="red">
                                        feminino
                                    </Checkbox>
                                    <Checkbox
                                        size="md"
                                        colorScheme="green"
                                        defaultChecked>
                                        masculino
                                    </Checkbox>
                                    <Checkbox
                                        size="md"
                                        colorScheme="orange"
                                        defaultChecked>
                                        não informar
                                    </Checkbox>
                                </Stack>
                            </Box>

                            <Input
                                name="phone"
                                type="text"
                                icon={RiCarLine}
                                color="cinza.900"
                                placeholder="Telefone"
                                {...register('phone', {
                                    required: true
                                })}
                                error={errors.phone}
                            />
                            <Input
                                icon={FiLock}
                                iconSecondary={MdOutlineVisibilityOff}
                                name="password"
                                type={show ? 'text' : 'password'}
                                color="cinza.900"
                                placeholder="Senha"
                                {...register('password', {
                                    required: true
                                })}
                                error={errors.password}
                                handleClick={handleClick}
                                show={show}
                            />
                            <Input
                                icon={FiLock}
                                iconSecondary={MdOutlineVisibilityOff}
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                color="cinza.900"
                                placeholder="Repetir Senha"
                                {...register('confirmPassword', {
                                    required: true
                                })}
                                error={errors.confirmPassword}
                                handleClick={handleClickConfirmPassword}
                                show={showConfirmPassword}
                            />
                        </Stack>

                        <Button
                            type="submit"
                            mt="60px"
                            w="100%"
                            h="64px"
                            isLoading={isSubmitting}
                            isActive={true}
                            colorScheme="principal.900">
                            <Text fontSize="20px">cadastrar</Text>
                        </Button>

                        <Link href="/shared/signup" passHref>
                            <Text
                                textAlign="center"
                                fontSize="14px"
                                color="cinza.650"
                                marginTop={6}>
                                criar seu cadastro Não se preocupe, nosso site é
                                seguro! Ao criar o seu cadastro, você concorda
                                com a nossa
                                <ChakraLink
                                    ml={2}
                                    fontWeight="500"
                                    _hover={{
                                        fontWeight: 'bold',
                                        textDecoration: 'underline'
                                    }}>
                                    Política de Privacidade
                                </ChakraLink>
                            </Text>
                        </Link>

                        <Link href="/shared/signup" passHref>
                            <Text
                                textAlign="center"
                                fontSize="14px"
                                color="cinza.650"
                                marginTop={6}>
                                já tenho cadastro?
                                <ChakraLink
                                    ml={2}
                                    fontWeight="500"
                                    _hover={{
                                        fontWeight: 'bold',
                                        textDecoration: 'underline'
                                    }}>
                                    entrar
                                </ChakraLink>
                            </Text>
                        </Link>
                    </Flex>
                </TemplateOne>
            </Box>
        </Flex>
    )
}

export const getServerSideProps = withSSRGuest(async ctx => {
    return {
        props: {}
    }
})
