import { Badge, Box, Button, Checkbox, Text } from '@chakra-ui/react'
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri'
import { IAddress } from '../../@model/address/address'
import { IUser } from '../../@model/user/user'
import { ButtonLink } from '../ButtonLink'
import { DataAddress } from './DataAddress'

type IProps = {
    data: IAddress
    user: IUser
    setSelectedAddressDelete: (address: IAddress) => void
    setSelectedAddressMain: (address: IAddress) => void
    setIsLoadingUpdateMain: (loading: boolean) => void
}

export function Address({
    data,
    user,
    setSelectedAddressDelete,
    setSelectedAddressMain,
    setIsLoadingUpdateMain
}: IProps) {
    return (
        <Box
            p={['6', '8']}
            bg="white.900"
            borderRadius="none"
            color="cinza.650"
            pb="4"
            _hover={{
                borderBottom: '2px solid',
                textDecoration: 'none',
                borderBottomColor: 'red',
                transform: 'translateY(-10px) translateX(-25px)',
                borderLeft: '1px solid',
                bg: 'cinza.350',
                color: 'cinza.875',

                borderLeftColor: 'cinza.600'
            }}>
            <Text
                fontSize="lg"
                mb="4"
                borderBottom="1px solid"
                borderColor="cinza.750"
                py={2}
                 fontWeight="600"
            >
                {user.person.name}
            </Text>
            <DataAddress
                data={data}
                fontFamily="inter"
                fontSize="16px"
                color="cinza.900"
                fontWeight="400"
            />
            <Checkbox
                isChecked={data.main}
                onChange={() => {
                    setIsLoadingUpdateMain(true)
                    setSelectedAddressMain(data)
                }}>
                {data?.main ? (
                    <Badge colorScheme="green" borderRadius="0">
                        Este é o endereço principal
                    </Badge>
                ) : (
                    'Tornar principal'
                )}
            </Checkbox>
            <Box display={{ md: 'flex' }} mt={{ md: 10 }}>
                <ButtonLink
                    w="100%"
                    h="48px"
                    mt={{ base: 5, md: 0 }}
                    _hover={{
                        textDecoration: `underline #DC1637`,
                        border: '1px solid',
                        borderColor: 'principal.900'
                    }}
                    colorText="principal.900"
                    icon={RiEditLine}
                    href={`/logged/addresses/${data.id}`}>
                    editar
                </ButtonLink>

                <Button
                    leftIcon={<RiDeleteBinLine />}
                    colorScheme="white.900"
                    color="principal.900"
                    fontWeight="400"
                    borderRadius="none"
                    fontSize="16px"
                    variant="link"
                    h="54px"
                    disabled={data.main}
                    mt={{ base: 5, md: 0 }}
                    w="100%"
                    onClick={() => setSelectedAddressDelete(data)}
                    _hover={{
                        textDecoration: `underline #DC1637`,
                        border: '1px solid',
                        borderColor: 'principal.900'
                    }}>
                    <Text>excluir</Text>
                </Button>
            </Box>
        </Box>
    )
}
