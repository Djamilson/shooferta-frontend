import {
    Box,
    Flex,
    Stack,
    Text,
    usePrefersReducedMotion,
    useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { differenceInCalendarYears, format, isValid, parse } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { RiUser6Line } from 'react-icons/ri'
import { useMutation } from 'react-query'
import * as yup from 'yup'
import { IUser } from '../../../@model/user/user'
import * as masks from '../../../components/Form/InputMask/masks'
import { itemAnimationLeft } from '../../../styles/animation'
import {
    dateFormatted,
    dateFormattedBirthDate
} from '../../../utils/formatDate'
import { maskCPF } from '../../../utils/formatZipCode'
import { schemaValidationCpf } from '../../../utils/schema'
import { api } from '../../../_services/apiClient'
import { queryClient } from '../../../_services/queryClient'
import { Button } from '../../Buttons/Button'
import { Datepicker } from '../../Form/DatePicker'
import { Input } from '../../Form/Input'

const perfilUpFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    cpf: schemaValidationCpf,
    birth_date: yup
        .string()
        .notRequired()
        .test('validateDate', 'data inválida!', (value: any) => {
            const formattedDate = format(new Date(value), 'dd-MM-yyyy', {
                locale: ptBR
            })
            const invalidDate = parse(formattedDate, 'dd-MM-yyyy', new Date())

            return (
                isValid(invalidDate) &&
                differenceInCalendarYears(new Date(), new Date(value)) >= 0 &&
                differenceInCalendarYears(new Date(), new Date(value)) < 100
            )
        })
})

type IUpDateFormData = {
    name: string
    cpf: string
    birth_date: Date
}

type IProps = {
    user: IUser
    updateUser: (user: IUser) => void
}

function TabUser({ user, updateUser }: IProps) {
    const prefersReducedMotion = usePrefersReducedMotion()

    const toast = useToast()

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationLeft} 1s`

    useEffect(() => {
        console.log('user?.person?.birth_date ', user)
        if (user) {
            setValue('name', user?.person.name)
            setValue(
                'cpf',
                user?.person?.cpf &&
                    masks.cpfOrCnpjMask.maskDefault(user?.person?.cpf)
            )
            setValue(
                'birth_date',
                user?.person?.birth_date && new Date(user?.person?.birth_date)
            )
            setBirthDate(
                user?.person?.birth_date && new Date(user?.person?.birth_date)
            )
        }
    }, [user])

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitting }
    } = useForm<IUpDateFormData>({
        resolver: yupResolver(perfilUpFormSchema)
    })

    const updateData = useMutation(
        async (meData: IUpDateFormData) => {
            const { name, cpf, birth_date } = meData
            console.log('=>> utalizanudoof', meData)
            const meDataPerson = {
                name,
                cpf,
                birth_date: dateFormattedBirthDate(String(birth_date))
            }

            const { data } = await api.put('persons/datas', meDataPerson)

            return data
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user')
            }
        }
    )

    const handleUpdateData: SubmitHandler<IUpDateFormData> = async data => {
        try {
          const { birth_date, cpf, name } = await updateData.mutateAsync(data)

          console.log("MEu user",JSON.stringify(user,null, 2))

            updateUser({
                ...user,
                person: {
                    ...user.person,
                    cpf,
                    name,
                    birth_date: dateFormatted(String(birth_date))
                }
            })

            toast({
                title: 'Perfil atualizado',
                description:
                    'Suas informações do perfil foram atualizados com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        } catch (error) {
            toast({
                title: 'Erro na edição.',
                description:
                    'Não foi possível editar o seu perfil, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    const [birth_date, setBirthDate] = useState<Date | [Date, Date]>()

    const handleStartDateChange =
        (dateType: any) => (date: Date | [Date, Date]) => {
            setBirthDate(date)
            setValue(dateType, date)
        }

    function dateTypeDate(itemData: Date | [Date, Date]) {
        return Array.isArray(itemData) ? itemData[0] : itemData
    }

    return (
        <Box
            flex="1"
            justifyContent="center"
            display="flex"
            animation={animationLeft}>
            <Flex
                as="form"
                width="100%"
                maxWidth={460}
                borderRadius="none"
                flexDir="column"
                onSubmit={handleSubmit(handleUpdateData)}>
                <Stack spacing={6} my={10}>
                    <Input
                        name="name"
                        type="text"
                        icon={RiUser6Line}
                        color="cinza.900"
                        placeholder=""
                        label="Nome"
                        labelPlaceHolder="seu nome"
                        {...register('name', {
                            required: true
                        })}
                        error={errors.name}
                    />

                    <Input
                        name="cpf"
                        label="CPF"
                        placeholder=""
                        labelPlaceHolder="Seu cpf"
                        {...register('cpf', {
                            required: true
                        })}
                        onChange={masks.cpfByMask.onChange}
                        error={errors.cpf}
                        color="cinza.900"
                    />

                    <Controller
                        control={control}
                        name="birth_date"
                        render={({
                            field: { onBlur, ref },
                            fieldState: { error }
                        }) => (
                            <Datepicker
                                ref={ref}
                                onChange={handleStartDateChange('birth_date')}
                                onBlur={onBlur}
                                selected={dateTypeDate(birth_date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Ex: dd/MM/yyyy"
                                label="Data de nascimento"
                                error={error}
                            />
                        )}
                        rules={{
                            required: true
                        }}
                    />
                </Stack>

                <Button
                    type="submit"
                    mt="44px"
                    w="100%"
                    h="64px"
                    isLoading={isSubmitting}
                    isActive={true}
                    colorScheme="principal.900">
                    <Text
                        color="white.900"
                        fontSize="16px"
                        fontWeight="500"
                        fontFamily="inter"
                        lineHeight="19.36px">
                        salvar alterações
                    </Text>
                </Button>
            </Flex>
        </Box>
    )
}
export { TabUser }
