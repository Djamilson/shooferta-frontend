import {
    Box,
    Flex,
    Stack,
    Text,
    usePrefersReducedMotion,
    useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FiLock } from 'react-icons/fi'
import { MdOutlineVisibilityOff } from 'react-icons/md'
import * as yup from 'yup'
import { itemAnimationButton } from '../../../styles/animation'
import { api } from '../../../_services/apiClient'
import { Button } from '../../Buttons/Button'
import { Input } from '../../Form/Input'

const upDataPasswordFormSchema = yup.object().shape({
    old_password: yup.string().required('Sua senha atual é obrigatória!'),
    password: yup
        .string()
        .required('Nova senha é obrigatória!')
        .min(6, 'No mínimo 6 caracteres'),

    confirmPassword: yup
        .string()
        .required('Confirma senha é obrigatória!')
        .oneOf([yup.ref('password')], 'As senhas estão diferentes!')
})

type UpPasswordFormData = {
    password: string
    confirmPassword: string
    old_password: string
}

type IProps = {}

function TabPassword({}: IProps) {
    const prefersReducedMotion = usePrefersReducedMotion()
    const toast = useToast()
    const [show, setShow] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false)

    const animationButton = prefersReducedMotion
        ? undefined
        : `${itemAnimationButton} 1s`

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        reset: resetPassword,
        formState: {
            errors: errorsPassword,
            isSubmitting: isSubmittingPassword
        }
    } = useForm<UpPasswordFormData>({
        resolver: yupResolver(upDataPasswordFormSchema)
    })

    const handleSubmitForgotPassword: SubmitHandler<
        UpPasswordFormData
    > = async data => {
        try {
            await api.put('/persons/passwords', {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.confirmPassword
            })

            resetPassword()
            toast({
                title: 'Perfil atualizado',
                description: 'Sua senha foi atualizada com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (error) {
            toast({
                title: 'Erro na edição',
                description:
                    'Não foi possível atualizar sua senha, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    const handleClick = () => {
        setShow(!show)
    }

    const handleClickConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <Box
            flex="1"
            justifyContent="center"
            display="flex"
            animation={animationButton}>
            <Flex
                m="0"
                as="form"
                width="100%"
                maxWidth={460}
                borderRadius="none"
                flexDir="column"
                onSubmit={handleSubmitPassword(handleSubmitForgotPassword)}>
                <Stack spacing={6} my={10}>
                    <Input
                        name="old_password"
                        type="password"
                        icon={FiLock}
                        color="cinza.900"
                        placeholder="Senha atual"
                        {...registerPassword('old_password', {
                            required: true
                        })}
                        error={errorsPassword.old_password}
                    />
                    <Input
                        icon={FiLock}
                        iconSecondary={MdOutlineVisibilityOff}
                        name="password"
                        type={show ? 'text' : 'password'}
                        color="cinza.900"
                        placeholder="Nova senha"
                        {...registerPassword('password', {
                            required: true
                        })}
                        error={errorsPassword.password}
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
                        {...registerPassword('confirmPassword', {
                            required: true
                        })}
                        error={errorsPassword.confirmPassword}
                        handleClick={handleClickConfirmPassword}
                        show={showConfirmPassword}
                    />
                </Stack>

                <Button
                    type="submit"
                    mt="24px"
                    w="100%"
                    h="64px"
                    isLoading={isSubmittingPassword}
                    isActive={true}
                    colorScheme="principal.900">
                    <Text
                        color="white.900"
                        fontSize="16px"
                        fontWeight="500"
                        fontFamily="inter"
                        lineHeight="19.36px">
                        Salvar Alterações
                    </Text>
                </Button>
            </Flex>
        </Box>
    )
}

export { TabPassword }
