import { Box, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdHome } from 'react-icons/md'
import { RiWhatsappLine } from 'react-icons/ri'
import { IAddress } from '../../../@model/address/address'
import { IPerson } from '../../../@model/person/person'
import * as masks from '../../../components/Form/InputMask/masks'
import { ButtonLinkDialog } from '../../Buttons/ButtonLinkDialog'

type IProps = {
    person: IPerson
    handleAddress: () => void
}

function DisplayAddress({ person, handleAddress }: IProps) {
    const [address, setAddress] = useState<IAddress>({} as IAddress)

    useEffect(() => {
        if (person && person.address) {
            const meAddress = {
                ...person?.address,
                zipCodeFormat: masks.cepByMask.maskDefault(
                    person?.address.zip_code
                )
            }
            setAddress(meAddress)
        }
    }, [person])

    return (
        <Flex display="flex" flexDir="column">
            <Text
                my={4}
                as="span"
                color="cinza.850"
                fontSize="sm"
                fontWeight="700">
                {person?.name}
            </Text>
            <Box mb={4} as="span" color="cinza.850" fontSize="sm">
                {`${address?.street},
                   número: ${address?.number},
                    ${address?.complement},
                    Bairro: ${address?.neighborhood},
                    ${address?.city}-${address?.state}, CEP: ${address?.zipCodeFormat}`}
            </Box>

            <Box>
                <ButtonLinkDialog
                    mt={2}
                    title="alterar endereço de entrega"
                    color="cinza.900"
                    icon={MdHome}
                    onClick={handleAddress}
                />
                <ButtonLinkDialog
                    title="receber informações de entrega                                   "
                    color="cinza.900"
                    icon={RiWhatsappLine}
                    onClick={handleAddress}
                />
            </Box>
        </Flex>
    )
}

export { DisplayAddress }
