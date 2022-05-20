import { Avatar, Flex, Icon, Spinner, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { AiOutlineCamera } from 'react-icons/ai'
import { useMutation } from 'react-query'
import { useAuth } from '../../../contexts/auth'
import { api } from '../../../_services/apiClient'

interface Props {
    onFileUploaded: (file: File) => void
}

export function Dropzone({ onFileUploaded, ...rest }: Props) {
    const [isLoading, setIsLoading] = useState(false)

    const { updateUser, user } = useAuth()
    const toast = useToast()

    const [selectedFileUrl, setSelectedFileUrl] = useState('')

    const updateAvatar = useMutation(
        async (avatarData: FormData) => {
            const { data: retur } = await api.patch('/users/avatar', avatarData)

            updateUser({
                ...user,
                person: {
                    ...user.person,
                    avatar: retur.avatar,
                    avatar_url: retur.avatar_url
                }
            })

            return { data: retur }
        },
        {
            onSuccess: () => {
                //queryClient.invalidateQueries('brands')
                // queryClient.invalidateQueries('brand')
            }
        }
    )

    useEffect(() => {
        setSelectedFileUrl(user?.person?.avatar_url)
    }, [user])

    const onDrop = useCallback(async acceptedFiles => {
        const file = acceptedFiles?.[0]

        if (!file) {
            return
        }

        setIsLoading(true)

        try {
            const data = new FormData()

            data.append('file', file)
            const fileUrl = URL.createObjectURL(file)

            setSelectedFileUrl(fileUrl)
            await updateAvatar.mutateAsync(data)

            toast({
                title: 'Avatar atualizado',
                description: 'Seu avatar foi atualizado com sucesso! 👍',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (e) {
            setIsLoading(false)

            toast({
                title: 'Erro na edição do avatar',
                description: e.message,
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })

            return
        }

        setIsLoading(false)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.gif', '.jpeg', '.jpg']
        }
    })

    return (
        <Flex mt="20px" display="flex" flexDir="column" flex="1">
            {selectedFileUrl ? (
                <Avatar w="200px" h="200px" src={selectedFileUrl} />
            ) : (
                <Avatar w="200px" h="200px" />
            )}

            <Flex
                justify="center"
                align="center"
                textAlign="center"
                position="relative"
                aria-label="Logout"
                left="150px"
                top="-55px"
                borderRadius="none"
                w="40px"
                h="40px"
                bg="principal.900"
                fontSize="22"
                _hover={{
                    bg: 'rgba(255, 0, 0, 0.4)',
                    textDecoration: 'none'
                }}
                _focus={{ boxShadow: 'outline' }}
                {...getRootProps()}>
                <input aria-label="Search" {...getInputProps()} />

                {isLoading ? (
                    <Spinner />
                ) : isDragActive ? (
                    <Icon as={AiOutlineCamera} color="white.900" />
                ) : (
                    <Icon as={AiOutlineCamera} color="white.900" />
                )}
            </Flex>
        </Flex>
    )
}
