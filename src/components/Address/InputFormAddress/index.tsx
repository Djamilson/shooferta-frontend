import { SearchIcon } from '@chakra-ui/icons'
import { Box, SimpleGrid, Stack, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { IAddress } from '../../../@model/address/address'
import { useCities } from '../../../hooks/Entity/useCities'
import { useStates } from '../../../hooks/Entity/useStates'
import { IconButton } from '../../Buttons/IconButton'
import { Input } from '../../Form/Input'
import * as masks from '../../Form/InputMask/masks'
import { CityModal } from '../CityModal'
import { StateModal } from '../StateModal'

export type errorsAddress = {
    number?: FieldError
    street?: FieldError
    complement?: FieldError
    zip_code?: FieldError
    neighborhood?: FieldError
    city?: FieldError
    state?: FieldError
}

export type IBGEUFResponse = {
    name: string
    sigla: string
}

export type IBGECityResponse = {
    id: string
    name: string
}

type IProps = {
    errors: errorsAddress
    meInitialStates: IBGEUFResponse[]
    register: UseFormRegister<Omit<IAddress, 'id' | 'person_id' | 'main'>>
    setValue: UseFormSetValue<Omit<IAddress, 'id' | 'person_id' | 'main'>>
}

function InputFormAddress({
    register,
    errors,
    meInitialStates,
    setValue
}: IProps) {
    const { data: ufs } = useStates({
        initialData: meInitialStates
    })

    const [selectedState, setSelectedState] = useState<IBGEUFResponse>(
        {} as IBGEUFResponse
    )
    const [selectedCity, setSelectedCity] = useState<IBGECityResponse>(
        {} as IBGECityResponse
    )

    const { data: cities } = useCities(selectedState?.sigla)

    function handleSelectedState(value: IBGEUFResponse) {
        setSelectedState(value)
        onCloseState()
    }

    function handleSelectedCity(value: IBGECityResponse) {
        setSelectedCity(value)
        onCloseCity()
    }

    const {
        isOpen: isOpenState,
        onOpen: onOpenState,
        onClose: onCloseState
    } = useDisclosure()

    const {
        isOpen: isOpenCity,
        onOpen: onOpenCity,
        onClose: onCloseCity
    } = useDisclosure()

    useEffect(() => {
        setValue('city', selectedCity?.name)
    }, [selectedCity])

    useEffect(() => {
        setValue('state', selectedState?.name)
    }, [selectedState])

    function handleOnOpenState() {
        onOpenState()
        setSelectedCity(undefined)
    }
    return (
        <Stack
            direction={['column']}
            spacing={['6', '8']}
            mt="10"
            mb={14}
            w="100%">
            <Box flex="1" display="flex">
                <Input
                    name="street"
                    label="Rua/quadra"
                    placeholder=""
                    isDisabled
                    labelPlaceHolder="Rua/quadra"
                    {...register('street', {
                        required: true
                    })}
                    error={errors.street}
                />
                <Box display="flex" w="300px" ml={8}>
                    <Input
                        name="number"
                        label="Número Lote/Casa"
                        placeholder=""
                        labelPlaceHolder="Número Lote/Casa"
                        {...register('number', {
                            required: true
                        })}
                        error={errors.number}
                        onChange={masks.numberByMask.onChange}
                    />
                </Box>
            </Box>
            <Input
                name="complement"
                label="Complemento"
                placeholder=""
                labelPlaceHolder="Complemento"
                {...register('complement', {
                    required: true
                })}
                error={errors.complement}
            />
            <Input
                name="neighborhood"
                label="Bairro"
                placeholder=""
                labelPlaceHolder="Bairro"
                {...register('neighborhood', {
                    required: true
                })}
                error={errors.neighborhood}
            />

            <SimpleGrid columns={[1, 2]} spacing={8}>
                <Box display="flex" alignItems="flex-end">
                    {ufs?.length > 0 && (
                        <StateModal
                            isOpen={isOpenState}
                            onClose={onCloseState}
                            states={ufs}
                            title="Selecione o estado"
                            handleSelectedState={handleSelectedState}
                        />
                    )}
                    <Input
                        disabled
                        name="state"
                        label="Estado"
                        color="cinza.875"
                        placeholder=""
                        labelPlaceHolder="Selecione o estado"
                        {...register('state', {
                            required: true
                        })}
                        error={errors.state}
                    />
                    <IconButton
                        label="Busca estado"
                        borderRadius="none"
                        fontSize="22px"
                        w="60px"
                        h="50px"
                        onClick={() => handleOnOpenState()}
                        ml={4}
                        aria-label="Search state"
                        icon={<SearchIcon />}
                    />
                </Box>
                <Box display="flex" alignItems="flex-end">
                    {cities?.length > 0 && (
                        <CityModal
                            isOpen={isOpenCity}
                            onClose={onCloseCity}
                            cities={cities}
                            title="Selecione a cidade"
                            handleSelectedCity={handleSelectedCity}
                        />
                    )}

                    <Input
                        disabled
                        name="city"
                        label="Cidade"
                        color="cinza.875"
                        placeholder=""
                        labelPlaceHolder="Cidade"
                        {...register('city', {
                            required: true
                        })}
                        error={errors.city}
                    />

                    <IconButton
                        label="Busca cidade"
                        borderRadius="none"
                        fontSize="22px"
                        w="60px"
                        h="50px"
                        onClick={onOpenCity}
                        ml={4}
                        aria-label="Search city"
                        icon={<SearchIcon />}
                    />
                </Box>
            </SimpleGrid>
        </Stack>
    )
}

export { InputFormAddress }
