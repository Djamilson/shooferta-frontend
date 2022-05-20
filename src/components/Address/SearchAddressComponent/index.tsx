import { Box, Button, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import * as masks from '../../../components/Form/InputMask/masks'
import { formatZipCodeInPoint } from '../../../utils/formatZipCode'
import { schemaValidationCep } from '../../../utils/schema'
import { InputMask } from '../../Form/InputMask'

const cepFormSchema = yup.object().shape({
    zipCode: schemaValidationCep
})

type CepFormData = {
    zipCode: string
}

type IProps = {
    handleSubmit: (cep: CepFormData) => Promise<void>
    zipCode?: CepFormData
}

function SearchAddressComponent({
    handleSubmit: meHandleSubmit,
    zipCode
}: IProps) {
    const toast = useToast()

    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<CepFormData>({
        resolver: yupResolver(cepFormSchema)
    })

    const handleCEP: SubmitHandler<CepFormData> = async data => {
        try {
            await meHandleSubmit({ zipCode: data.zipCode })
        } catch (error) {
            toast({
                title: 'Erro na busca do endereço.',
                description:
                    'Não foi possível buscar o endereço, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    useEffect(() => {
        console.log('zipCode:', zipCode)
        if (zipCode?.zipCode) {
            setValue('zipCode', formatZipCodeInPoint(zipCode?.zipCode))
        }
    }, [zipCode])

    return (
        <Box
            as="form"
            width="100%"
            maxWidth={460}
            borderRadius="none"
            mt="2"
            mb={4}
            onSubmit={handleSubmit(handleCEP)}>
            <Box display="flex">
                <InputMask
                    label="Seu cep"
                    labelPlaceHolder="Cep ex: 00.000-000"
                    placeholder=""
                    name="zipCode"
                    onBlur={() => trigger('zipCode')}
                    {...register('zipCode', {
                        required: true
                    })}
                    error={errors.zipCode}
                    onChange={masks.cepByMask.onChange}
                    autoComplete="off"
                />

                <Box display="flex" mb={4}>
                    <Button
                        isLoading={isSubmitting}
                        type="submit"
                        ml={2}
                        borderRadius="none"
                        w="50px"
                        h="50px"
                        color="principal.900"
                        colorScheme="teal"
                        variant="outline">
                        OK
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export { SearchAddressComponent }
