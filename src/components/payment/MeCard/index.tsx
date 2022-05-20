import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  keyframes,
  Stack,
  Text,
  usePrefersReducedMotion
} from '@chakra-ui/react'
import creditCardType from 'credit-card-type'
import { motion } from 'framer-motion'
import { ChangeEvent, useState } from 'react'
import { FieldError } from 'react-hook-form'
import {
  RiBankCardLine,
  RiCalendarLine,
  RiSecurePaymentFill,
  RiUser3Line
} from 'react-icons/ri'
import * as masks from '../../../components/Form/InputMask/masks'
import {
  itemAnimationLeft,
  itemAnimationRight
} from '../../../styles/animation'
import { Input } from '../../Form/Input'
import { InputMask } from '../../Form/InputMask'
import { Select } from '../../Form/Select'

/*const PaymentCard = dynamic(() => import('react-payment-card-component'), {
    ssr: false
})*/

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
    handleSelectInstallments: (event: ChangeEvent<HTMLSelectElement>) => void
    renderInstallments: {
        label: string
        value: string
    }[]
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
    renderInstallments
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

    const animationRight = prefersReducedMotion
        ? undefined
        : `${itemAnimationRight} 300ms`

    const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`

    const animation = `${animationKeyframes} 2s ease-in-out infinite`

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

                    <Select
                        name="installment"
                        label="Número de parcelas"
                        id="idInstallment"
                        color="cinza.900"
                        onChange={handleSelectInstallments}
                        options={renderInstallments}
                        {...register('installment')}
                        error={error.installment}
                    />
                </Stack>
            </Center>
            <Box
                w={{ base: '100%', md: '360px' }}
                display={{ md: 'flex' }}
                ml={{ md: 6 }}
                mt={{ base: 6 }}
                animation={animationRight}
            >
                <Center display="flex" flexDir="column">
                    <Box
                        as={motion.div}
                        animation={animation}
                        padding="2"
                        bgGradient="linear(to-l, #7928CA, #FF0080)"
                        width="12"
                        height="12"
                        display="flex"
                    />

                    <Flex
                        p={5}
                        shadow="md"
                        w="22em"
                        h="12em"
                        borderWidth="1px"
                        borderRadius="lg"
                    >
                        <Box flex="1">
                            <Image
                                borderRadius="5"
                                width="60px"
                                src="/chip.png"
                                alt="chip"
                            />
                            <Text
                                fontWeight="600"
                                letterSpacing="2px"
                                mt={4}
                                color="cinza.800"
                                fontSize="16"
                            >
                                {numberCart}
                            </Text>
                            <Text
                                fontWeight="400"
                                color="cinza.800"
                                fontSize="14"
                                my={1}
                            >
                                <Text
                                    fontWeight="400"
                                    color="cinza.800"
                                    fontSize="12"
                                >
                                    VÁLIDO ATÉ
                                </Text>
                                {cardExpiration !== ''
                                    ? cardExpiration
                                    : 'dd/yyyy'}
                            </Text>
                            <Heading
                                fontWeight="500"
                                color="cinza.800"
                                fontSize="16"
                            >
                                {nameCart}
                            </Heading>
                        </Box>
                        <Center w="60px">
                            <Image
                                borderRadius="5"
                                width="60px"
                                src="/chip.png"
                                alt="chip"
                            />
                            <Text>{cardType.niceType}</Text>
                        </Center>
                    </Flex>

                    <Box
                        shadow="md"
                        w="22em"
                        h="12em"
                        borderRadius="lg"
                        bgImage="url('/background-card.png')"
                        bgPosition="center"
                        bgRepeat="no-repeat"
                        display="flex"
                        flexDir="column"
                        justifyContent="center"
                    >
                        <Box
                            shadow="md"
                            mt="25px"
                            w="22em"
                            h="2.8em"
                            border="0"
                            bg="#242400"
                        />

                        <Box
                            mt="20px"
                            h="2.8em"
                            display="flex"
                            mx="2em"
                            w="18em"
                        >
                            <Box
                                w="15em"
                                h="2.8em"
                                border="0"
                                bgImage="url('/card-back02.png')"
                                bgPosition="center"
                                bgRepeat="no-repeat"
                            />
                            <Box
                                w="8em"
                                h="2.8em"
                                border="0"
                                bgImage="url('/card-back02.png')"
                                bgPosition="center"
                                bgRepeat="no-repeat"
                                display="flex"
                                justifyContent="end"
                                alignItems="center"
                            >
                                <Text
                                    color="cinza.800"
                                    fontWeight="semibold"
                                    letterSpacing="wide"
                                    fontSize="14"
                                    mr="20px"
                                >
                                    {securityCodeCart}
                                </Text>
                            </Box>
                        </Box>

                        <Box
                            mx="2em"
                            w="18em"
                            h="2.4em"
                            border="0"
                            bgImage="url('/background03.png')"
                            bgPosition="center"
                            bgRepeat="no-repeat"
                        ></Box>
                    </Box>
                </Center>
            </Box>
        </Box>
    )
}

export { MeCard }
