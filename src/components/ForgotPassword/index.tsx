import React, { useRef } from 'react'

import {
    Stack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button
} from '@chakra-ui/react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FiMail } from 'react-icons/fi'

import { api } from '../../_services/apiClient'
import { Input } from '../Form/Input'

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido')
})

type IProps = {
    onClose: () => void
    isOpen: boolean
    onOpenForgotMessage: () => void
    setEmailForgot: (email: string) => void
}

type SingInFormData = {
    email: string
}

export function ForgotPassword({
    onClose,
    isOpen,
    setEmailForgot,
    onOpenForgotMessage
}: IProps) {
    const cancelRef = useRef()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SingInFormData>({
        resolver: yupResolver(signInFormSchema)
    })

    const handleSubmitForgotPassword: SubmitHandler<
        SingInFormData
    > = async data => {
        try {
            await api.post('/password/forgot', {
                email: data.email
            })
            onClose()
            setEmailForgot(data.email)
            onOpenForgotMessage()
        } catch {}
    }

    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered>
            <AlertDialogOverlay />

            <AlertDialogContent color="cinza.650" borderRadius="none">
                <AlertDialogHeader>trocar a senha</AlertDialogHeader>
                <AlertDialogCloseButton />

                <AlertDialogBody>
                    <Box fontSize="14px">
                        <Box as="span">
                            identifique-se para receber um e-mail com as
                            instruções e o link para criar uma nova senha.
                        </Box>

                        <Box
                            mt={6}
                            as="form"
                            width="100%"
                            maxWidth={460}
                            borderRadius="none"
                            onSubmit={handleSubmit(handleSubmitForgotPassword)}>
                            <Stack spacing="4">
                                <Input
                                    label="e-mail"
                                    name="email"
                                    type="email"
                                    icon={FiMail}
                                    placeholder="Ex: fulanocosta@gmail.com"
                                    color="cinza.900"
                                    {...register('email', {
                                        required: true
                                    })}
                                    error={errors.email}
                                />
                            </Stack>

                            <AlertDialogFooter my={8} p="0">
                                <Button
                                    ref={cancelRef}
                                    onClick={onClose}
                                    fontWeight={400}
                                    variant="link"
                                    mr={10}>
                                    cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    colorScheme="red"
                                    ml={3}
                                    w="180px"
                                    borderRadius="none">
                                    enviar
                                </Button>
                            </AlertDialogFooter>
                        </Box>
                    </Box>
                </AlertDialogBody>
            </AlertDialogContent>
        </AlertDialog>
    )
}
