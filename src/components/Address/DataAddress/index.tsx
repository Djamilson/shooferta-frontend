import { Text, TextProps } from '@chakra-ui/react'
import { IAddress } from '../../../@model/address/address'

interface IProps extends TextProps {
    data: IAddress
}

function DataAddress({ data, ...rest }: IProps) {

  return (
        <Text fontSize="lg" mb="4" {...rest}>
            {`${data.street},
                   número: ${data.number},
                    ${data.complement},
                    Bairro: ${data.neighborhood},
                    ${data.city}-${data.state}, CEP: ${data.zipCodeFormat}`}
        </Text>
    )
}

export { DataAddress }
