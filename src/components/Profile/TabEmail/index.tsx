import {
    Box,
    Flex,
    Stack,
    Text,
    usePrefersReducedMotion,
    useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FiMail } from 'react-icons/fi'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { IUser } from '../../../@model/user/user'
import { itemAnimationRight } from '../../../styles/animation'
import { api } from '../../../_services/apiClient'
import { queryClient } from '../../../_services/queryClient'
import { Button } from '../../Buttons/Button'
import { Input } from '../../Form/Input'

type IUpDateFormEmail = {
    email: string
}

const upDateEmailFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido')
})

type IProps = { user: IUser; updateUser: (user: IUser) => void }

function TabEmail({ user, updateUser }: IProps) {
    const prefersReducedMotion = usePrefersReducedMotion()
    const toast = useToast()

    const animationRight = prefersReducedMotion
        ? undefined
        : `${itemAnimationRight} 1s`

    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        setValue: setValueEmail,
        formState: { errors: errorsEmail, isSubmitting: isSubmittingEmail }
    } = useForm<IUpDateFormEmail>({
        resolver: yupResolver(upDateEmailFormSchema)
    })

    useEffect(() => {
        if (user) {
            setValueEmail('email', user?.person.email)
        }
    }, [user])

    const updateEmail = useMutation(
        async (email: IUpDateFormEmail) => {
            console.log('Email:', email)

            const newEmail = await api.patch('persons/emails', email)

            return newEmail
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user')
            }
        }
    )

    const handleUpdateEmail: SubmitHandler<
        IUpDateFormEmail
    > = async dataEmail => {
        try {
            await updateEmail.mutateAsync(dataEmail)

            updateUser({
                ...user,
                person: {
                    ...user.person,
                    email: dataEmail.email
                }
            })

            toast({
                title: 'Email atualizado',
                description:
                    'Suas informações do perfil foram atualizados com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (error) {
            toast({
                title: 'Erro na edição.',
                description:
                    'Não foi possível editar o seu perfil, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    return (
        <Box
            flex="1"
            justifyContent="center"
            display="flex"
            animation={animationRight}>
            <Flex
                as="form"
                width="100%"
                maxWidth={460}
                borderRadius="none"
                flexDir="column"
                onSubmit={handleSubmitEmail(handleUpdateEmail)}>
                <Stack spacing={6} my={10}>
                    <Input
                        name="email"
                        type="email"
                        icon={FiMail}
                        color="cinza.900"
                        placeholder="Email"
                        {...registerEmail('email', {
                            required: true
                        })}
                        error={errorsEmail.email}
                    />
                </Stack>

                <Button
                    type="submit"
                    mt="24px"
                    w="100%"
                    h="64px"
                    isLoading={isSubmittingEmail}
                    isActive={true}
                    colorScheme="principal.900">
                    <Text
                        color="white.900"
                        fontSize="16px"
                        fontWeight="500"
                        fontFamily="inter"
                        lineHeight="19.36px">
                        salvar alterações
                    </Text>
                </Button>
            </Flex>
        </Box>
    )
}

export { TabEmail }
