import {
    Box,
    Center,
    HStack,
    Stack,
    usePrefersReducedMotion
} from '@chakra-ui/react'
import creditCardType from 'credit-card-type'
import { useState } from 'react'
import { FieldError } from 'react-hook-form'
import {
    RiBankCardLine,
    RiCalendarLine,
    RiSecurePaymentFill,
    RiUser3Line
} from 'react-icons/ri'
import * as masks from '../../../components/Form/InputMask/masks'
import { itemAnimationLeft } from '../../../styles/animation'
import { Input } from '../../Form/Input'
import { InputMask } from '../../Form/InputMask'
import { IInstallment } from '../CartComponent'
import { InfoCard } from '../InfoCard'
import { SelectBase } from '../Select'

type ErrorsPayment = {
    card_holder_name?: FieldError
    card_number?: FieldError
    card_expiration_date?: FieldError
    card_cvv?: FieldError
    installment?: FieldError
}

type IProps = {
    trigger: any
    register: any
    error: ErrorsPayment
    handleSelectInstallments: (event: any) => void
    selectedInstallment: IInstallment
    renderInstallments: IInstallment[]
}

type ICardType = {
    niceType: string
    type: string
    code: { name: string; size: number }
}

function MeCard({
    trigger,
    register,
    error,
    handleSelectInstallments,
    renderInstallments,
    selectedInstallment
}: IProps) {
    const [nameCart, setNameCart] = useState('')
    const [numberCart, setNumberCart] = useState('')
    const [cardExpiration, setCardExpiration] = useState('')
    const [securityCodeCart, setSecurityCodeCart] = useState('')
    const [cardType, setCardType] = useState<ICardType>({} as ICardType)

    const [flipped, setFlipped] = useState<boolean>(false)

    function handleChangeNumber(e: any) {
        masks.cardNumberByMask.onChange(e)
        setCardType(creditCardType(e.currentTarget.value)[0])
        setFlipped(false)
        setNumberCart(e.currentTarget.value)
    }

    function handleChangeName(e: any) {
        masks.lettlerByMask.onChange(e)
        setFlipped(false)
        setNameCart(e.currentTarget.value)
    }

    function handleInputChangeExpiration(e: any) {
        masks.cardDateMask.onChange(e)
        setFlipped(false)
        setCardExpiration(e.currentTarget.value)
    }

    function handleChangeSecurityCode(e: any) {
        if (cardType?.code?.size === 4) {
            masks.cardCVV4ByMask.onChange(e)
        } else {
            masks.cardCVV3ByMask.onChange(e)
        }
        setSecurityCodeCart(e.currentTarget.value)
        setFlipped(true)
    }

    const prefersReducedMotion = usePrefersReducedMotion()

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationLeft} 300ms`

    return (
        <Box
            p={6}
            display={{ md: 'flex' }}
            justifyContent="center"
            alignItems="center"
        >
            <Center>
                <Stack spacing="4" maxWidth={460} animation={animationLeft}>
                    <Input
                        type="text"
                        data-checkout="card_holder_name"
                        id="card_holder_name"
                        name="card_holder_name"
                        color="cinza.900"
                        icon={RiUser3Line}
                        onBlur={() => trigger('card_holder_name')}
                        label="Nome do titular do cartão"
                        labelPlaceHolder="digite o nome do titular do cartão"
                        placeholder=""
                        {...register('card_holder_name', {
                            required: true
                        })}
                        error={error.card_holder_name}
                        onChange={handleChangeName}
                    />

                    <InputMask
                        name="card_number"
                        label="Numero do cartão"
                        labelPlaceHolder="digite o número cartão"
                        placeholder=""
                        icon={RiBankCardLine}
                        color="cinza.900"
                        data-checkout="card_number"
                        onBlur={() => trigger('card_number')}
                        {...register('card_number', {
                            required: true
                        })}
                        error={error.card_number}
                        onChange={handleChangeNumber}
                    />

                    <HStack spacing="24px">
                        <Input
                            label="Data de validade"
                            labelPlaceHolder="MM/AAAA"
                            placeholder=""
                            color="cinza.900"
                            name="card_expiration_date"
                            icon={RiCalendarLine}
                            onBlur={() => trigger('card_expiration_date')}
                            {...register('card_expiration_date', {
                                required: true
                            })}
                            error={error.card_expiration_date}
                            onChange={handleInputChangeExpiration}
                        />

                        <InputMask
                            label="Código de segurança"
                            labelPlaceHolder="CVV"
                            placeholder=""
                            name="card_cvv"
                            color="cinza.900"
                            data-checkout="card_cvv"
                            icon={RiSecurePaymentFill}
                            onBlur={() => trigger('card_cvv')}
                            {...register('card_cvv', {
                                required: true
                            })}
                            error={error.card_cvv}
                            onChange={handleChangeSecurityCode}
                        />
                    </HStack>

                    <SelectBase
                        selectedInstallment={selectedInstallment}
                        renderInstallments={renderInstallments}
                        handleSelectInstallments={handleSelectInstallments}
                    />
                </Stack>
            </Center>
            <InfoCard
                flipped={flipped}
                numberCart={numberCart}
                cardExpiration={cardExpiration}
                nameCart={nameCart}
                type={cardType?.type}
                securityCodeCart={securityCodeCart}
            />
        </Box>
    )
}

export { MeCard }
