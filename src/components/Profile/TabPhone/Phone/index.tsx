import { Badge, Box, Button, Checkbox, Text } from '@chakra-ui/react'
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri'
import { IPhone } from '../../../../@model/phone/phone'

type IProps = {
    data: IPhone
    setSelectedPhoneDelete: (phone: IPhone) => void
    setSelectedPhoneMain: (phone: IPhone) => void
    setIsLoadingUpdateMain: (loading: boolean) => void
    setSelectedEditPhone: (phone: IPhone) => void
}

export function Phone({
    data,
    setSelectedPhoneDelete,
    setSelectedPhoneMain,
    setIsLoadingUpdateMain,
    setSelectedEditPhone
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
                fontWeight="600">
                {data.phoneFormat}
            </Text>
            <Checkbox
                isChecked={data.main}
                onChange={() => {
                    setIsLoadingUpdateMain(true)
                    setSelectedPhoneMain(data)
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
                <Button
                    leftIcon={<RiEditLine />}
                    colorScheme="white.900"
                    color="principal.900"
                    fontWeight="400"
                    borderRadius="none"
                    fontSize="16px"
                    variant="link"
                    h="54px"
                    disabled={data.main}
                    py={3}
                    w="100%"
                    onClick={() => setSelectedEditPhone(data)}
                    _hover={{
                        textDecoration: `underline #DC1637`,
                        border: '1px solid',
                        borderColor: 'principal.900'
                    }}>
                    <Text>editar</Text>
                </Button>

                <Button
                    leftIcon={<RiDeleteBinLine />}
                    colorScheme="white.900"
                    color="principal.900"
                    fontWeight="400"
                    py={3}
                    borderRadius="none"
                    fontSize="16px"
                    variant="link"
                    h="54px"
                    disabled={data.main}
                    mt={{ base: 5, md: 0 }}
                    w="100%"
                    onClick={() => setSelectedPhoneDelete(data)}
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
