import {
    Box,
    Button as ChakraButton,
    Flex,
    Link as ChakraLink,
    Stack,
    Text,
    useBreakpointValue,
    useDisclosure,
    usePrefersReducedMotion
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FiLock, FiMail } from 'react-icons/fi'
import { MdOutlineVisibilityOff } from 'react-icons/md'
import * as yup from 'yup'
import { Button } from '../../../components/Buttons/Button'
import { Horizontal } from '../../../components/Divider/Horizontal'
import { ForgotPassword } from '../../../components/ForgotPassword'
import { MessageForgot } from '../../../components/ForgotPassword/MessageForgot'
import { Input } from '../../../components/Form/Input'
import { InputPassword } from '../../../components/Form/InputPassword'
import { NavLinkPage } from '../../../components/NavLinkPage'
import { BackgroundHeader } from '../../../components/Shared/BackgroundHeader'
import { HeaderForm } from '../../../components/Shared/HeaderForm'
import TemplateTwo from '../../../components/Template/Two'
import { useAuth } from '../../../contexts/auth'
import { getForgottenCartsUpdate } from '../../../hooks/Entity/useForgottenCartAll'
import { useCart } from '../../../hooks/useCart'
import { animationItemFloat, itemAnimationTop } from '../../../styles/animation'
import { withSSRGuest } from '../../../utils/withSSRGuest'

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória')
})

type SingInFormData = {
    email: string
    password: string
}

export default function SignIn() {
    const {
        isOpen: isOpenForgot,
        onOpen: onOpenForgot,
        onClose: onCloseForgot
    } = useDisclosure()

    const {
        isOpen: isOpenForgotMessage,
        onOpen: onOpenForgotMessage,
        onClose: onCloseForgotMessage
    } = useDisclosure()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SingInFormData>({
        resolver: yupResolver(signInFormSchema)
    })

    const { signIn } = useAuth()
    const { setCart, cart } = useCart()

    const handleSignIn: SubmitHandler<SingInFormData> = async data => {
        try {
            const meCart = cart?.map(m => {
                return { amount: m.amount, product_id: m.product.id }
            })

            await signIn({
                email: data.email,
                password: data.password
            })

            const actualCart = await getForgottenCartsUpdate(meCart || [])

            setCart(() => actualCart)
        } catch (err) {
            console.log('erro o log: aquiuie', err)
        }
    }

    const [show, setShow] = React.useState(false)
    const handleClick = () => {
        setShow(!show)
    }

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const [emailForgot, setEmailForgot] = useState<string>('')

    const prefersReducedMotion = usePrefersReducedMotion()

    const animationItemAnimationTop = prefersReducedMotion
        ? undefined
        : `${itemAnimationTop} 1s`

    const _animationItemAnimationTop = prefersReducedMotion
        ? undefined
        : `${animationItemFloat} 5s ease-in-out infinite`

    return (
        <Flex direction="row" maxWidth={1440}>
            <Box
                flex="1"
                bg="principal.900"
                flexDir="column"
                overflowX="hidden">
                <BackgroundHeader>
                    <NavLinkPage
                        href="/"
                        fontFamily="inter"
                        fontWeight="semibold"
                        w="52px"
                        h="25px"
                        fontSize="16px"
                        color="white.900"
                        _hover={{ color: 'purple.500' }}
                        _focus={{ boxShadow: 'outline' }}>
                        <Text
                            fontFamily="inter"
                            fontWeight="600"
                            fontSize="20px"
                            lineHeight="25px">
                            Shooferta
                        </Text>
                    </NavLinkPage>
                </BackgroundHeader>

                <TemplateTwo>
                    <HeaderForm
                        title=" Estamos quase lá."
                        description="Faça seu login para começar uma experiência
                            incrível."
                    />
                    <Flex
                        p={8}
                        as="form"
                        width="100%"
                        maxWidth={460}
                        borderRadius="none"
                        flexDir="column"
                        onSubmit={handleSubmit(handleSignIn)}
                        animation={animationItemAnimationTop}>
                        <Stack spacing="4">
                            <Input
                                label="email"
                                name="email"
                                type="email"
                                icon={FiMail}
                                placeholder=""
                                labelPlaceHolder="seu email"
                                color="cinza.900"
                                {...register('email', {
                                    required: true
                                })}
                                error={errors.email}
                            />
                            <InputPassword
                                label="Senha"
                                name="password"
                                labelPlaceHolder="sua senha"
                                placeholder=" "
                                icon={FiLock}
                                iconSecondary={MdOutlineVisibilityOff}
                                color="cinza.900"
                                type={show ? 'text' : 'password'}
                                {...register('password', {
                                    required: true
                                })}
                                error={errors.password}
                                handleClick={handleClick}
                                show={show}
                            />
                        </Stack>

                        <ForgotPassword
                            isOpen={isOpenForgot}
                            onClose={onCloseForgot}
                            onOpenForgotMessage={onOpenForgotMessage}
                            setEmailForgot={setEmailForgot}
                        />

                        <MessageForgot
                            isOpen={isOpenForgotMessage}
                            onClose={onCloseForgotMessage}
                            emailForgot={emailForgot}
                        />

                        <Text
                            textAlign="left"
                            fontSize="14px"
                            color="cinza.650"
                            marginTop={6}>
                            esqueceu a senha?
                            <ChakraButton
                                ml={2}
                                variant="link"
                                fontWeight="500"
                                fontSize="14px"
                                onClick={onOpenForgot}>
                                recuperar
                            </ChakraButton>
                        </Text>

                        <Button
                            type="submit"
                            mt="30px"
                            w="100%"
                            h="64px"
                            isLoading={isSubmitting}
                            isActive={true}
                            colorScheme="principal.900"
                            color="white.900"
                            _hover={{
                                opacity: 0.6
                            }}>
                            <Text fontSize="20px" fontFamily="inter">
                                Entrar
                            </Text>
                        </Button>
                        <Horizontal />
                        <Link href="/shared/signup" passHref>
                            <Text
                                textAlign="center"
                                fontSize="14px"
                                color="cinza.650"
                                marginTop={6}>
                                não tem cadastro?
                                <ChakraLink
                                    ml={2}
                                    fontWeight="500"
                                    _hover={{
                                        fontWeight: 'bold',
                                        textDecoration: 'underline'
                                    }}>
                                    cadastre-se
                                </ChakraLink>
                            </Text>
                        </Link>
                        <Link href="/shared/signup" passHref>
                            <Text
                                textAlign="center"
                                fontSize="14px"
                                color="cinza.650"
                                marginTop={6}>
                                Ao continuar com o acesso, você concorda com a
                                nossa
                                <ChakraLink
                                    ml={2}
                                    fontWeight="500"
                                    _hover={{
                                        fontWeight: 'bold',
                                        textDecoration: 'underline'
                                    }}>
                                    política de privacidade
                                </ChakraLink>
                            </Text>
                        </Link>
                    </Flex>
                </TemplateTwo>
            </Box>
        </Flex>
    )
}

export const getServerSideProps = withSSRGuest(async ctx => {
    return {
        props: {}
    }
})
