import { Avatar, Box, HStack, Text, useTheme } from '@chakra-ui/react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { RiUser6Line } from 'react-icons/ri'
import { useAuth } from '../../contexts/auth'
import { Button } from '../Buttons/Button'

interface ProfileProps {
    showProfileData?: boolean
    onOpenDialogMenuPerfil: () => void
    onOpenDialogLogin: () => void
}

export function Profile({
    showProfileData = true,
    onOpenDialogLogin,
    onOpenDialogMenuPerfil
}: ProfileProps) {
    const theme = useTheme()

    const { isAuthenticated, user } = useAuth()

    return (
        <HStack display="flex" justifyContent="flex-end">
            {isAuthenticated ? (
                <Button
                    isActive={false}
                    bg="principal.900"
                    onClick={() => onOpenDialogMenuPerfil()}
                    _hover={{ bg: `${theme.colors.principal[900]}` }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center">
                        <Text
                            as="span"
                            fontFamily="inter"
                            fontWeight="semibold"
                            color="white.900"
                            fontSize="16px"
                            w="79px"
                            textAlign="right"
                            lineHeight="26px"
                            mr={4}>
                            {user?.firstName}
                        </Text>
                        {user?.person?.avatar_url ? (
                            <Avatar
                                size="md"
                                name="Djamilson Alves da Costa"
                                src={user?.person?.avatar_url}
                            />
                        ) : (
                            <Avatar
                                bg="cinza.500"
                                h="34px"
                                w="34px"
                                icon={
                                    <RiUser6Line
                                        color="cinza.700"
                                        fontSize="1.4rem"
                                    />
                                }
                            />
                        )}
                    </Box>
                </Button>
            ) : (
                <Button
                    isActive={false}
                    bg="principal.900"
                    onClick={onOpenDialogLogin}
                    _hover={{
                        bg: `${theme.colors.principal[900]}`
                    }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center">
                        <Box
                            w="160px"
                            flexDir="column"
                            display="flex"
                            justifyContent="flex-end"
                            mr="10px">
                            <Text
                                as="span"
                                fontFamily="inter"
                                fontWeight="500"
                                fontSize="14px"
                                textAlign="right"
                                lineHeight="18px"
                                letterSpacing="wide">
                                olá, faça seu login
                            </Text>
                            <Box display="flex" justifyContent="flex-end">
                                <MdOutlineKeyboardArrowDown
                                    color="cinza.700"
                                    fontSize="1.5rem"
                                />
                                <Text
                                    as="span"
                                    fontFamily="inter"
                                    fontWeight="500"
                                    fontSize="14px"
                                    textAlign="right"
                                    lineHeight="18px"
                                    ml={0.5}
                                    letterSpacing="wide">
                                    ou cadastre-se
                                </Text>
                            </Box>
                        </Box>

                        <Avatar
                            bg="cinza.500"
                            h="34px"
                            w="34px"
                            icon={
                                <RiUser6Line
                                    color="cinza.700"
                                    fontSize="1.4rem"
                                />
                            }
                        />
                    </Box>
                </Button>
            )}
        </HStack>
    )
}
