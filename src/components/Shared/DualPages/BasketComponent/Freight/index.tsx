import { Box, Flex } from '@chakra-ui/react'
import { useLocalization } from '../../../../../contexts/localization'
import { SearchAddressComponent } from '../../../../Address/SearchAddressComponent'

type CepFormData = {
    zipCode: string
}

type IProps = {
    status_freight: boolean
}
function Freight({ status_freight }: IProps) {
    const {
        localed,
        isLocalization,
        getLocalization,
        getFreight,
        setLocalization
    } = useLocalization()

    async function handleSubmit(zipCode: CepFormData) {
        //api do nextjs
        try {
            const melocalizantion = await getLocalization(zipCode)

            const newLocalizationFreight = await getFreight(melocalizantion)

            setLocalization(newLocalizationFreight)
        } catch (error) {}
    }

    return !isLocalization ? (
        <SearchAddressComponent handleSubmit={handleSubmit} />
    ) : (
        <>
            <Flex display="flex" justifyContent="space-between" my={6}>
                <Box display="flex" flexDir="column">
                    <Box as="span" color="gray.600" fontSize="sm">
                        receba até
                    </Box>
                    <Box
                        as="span"
                        fontFamily="inter"
                        fontWeight="700"
                        color="gray.600"
                        fontSize="sm">
                        {isLocalization && localed?.freights[0].formatedData}
                    </Box>
                </Box>
                <Box display="flex" flexDir="column">
                    <Box
                        as="span"
                        textDecoration={
                            status_freight ? 'line-through' : 'none'
                        }
                        color="gray.600"
                        fontSize="sm"
                        textAlign="right">
                        {isLocalization && localed?.freights[0].formatedValor}
                    </Box>
                    <Box
                        textAlign="right"
                        as="span"
                        fontFamily="inter"
                        fontWeight="700"
                        color="gray.600"
                        fontSize="sm">
                        frete grátis
                    </Box>
                </Box>
            </Flex>
            <Box
                mb={4}
                as="span"
                color="cinza.850"
                fontSize="sm"
                display="flex"
                flexDir="column">
                <Box my={1} as="span" color="cinza.850" fontSize="sm">
                    {isLocalization && localed?.address?.street}
                </Box>
                <Box as="span" color="cinza.850" fontSize="sm">
                    {`${isLocalization && localed?.address?.neighborhood}, `}
                    {`${isLocalization && localed?.address?.city} `}-
                    {` ${isLocalization && localed?.address?.state}`}
                </Box>
                <Box mt={4} mb={2} as="span" color="cinza.850" fontSize="sm">
                    mais formas de entrega
                </Box>
            </Box>
        </>
    )
}

export { Freight }
