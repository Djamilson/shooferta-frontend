import {
    Box,
    Button,
    Center,
    Flex,
    SimpleGrid,
    useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import pagarme from 'pagarme'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsFillBasket2Fill } from 'react-icons/bs'
import * as yup from 'yup'
import { useCart } from '../../../hooks/useCart'
import { formatPrice } from '../../../utils/formatPrice'
import {
    schemaValidationCardDate,
    schemaValidationCardNumber
} from '../../../utils/schema'
import { api } from '../../../_services/apiClient'
import { Horizontal } from '../../Divider/Horizontal'
import { MeCard } from '../MeCard'

const paymentFormSchema = yup.object().shape({
    card_holder_name: yup.string().required('Nome obrigatório'),
    card_number: schemaValidationCardNumber,
    card_expiration_date: schemaValidationCardDate,
    card_cvv: yup
        .string()
        .required('Código de segurança do cartão obrigatório')
})

export type ICard = {
    card_holder_name: string
    card_number: string
    card_expiration_date: string
    card_cvv: string
}

export type IInstallment = {
    value: string
    label: string
}

type IProps = {
    total: string
}

function CartComponent({ total }: IProps) {
    const router = useRouter()
    const { cart, clearCart } = useCart()
    const toast = useToast()
    const [numberOfInstallments] = useState<number>(4)

    const {
        register: registerPayment,
        handleSubmit: handleSubmitPayment,
        trigger,
        formState: { errors: errorsPayment, isSubmitting: isSubmittingPayment }
    } = useForm<ICard>({
        resolver: yupResolver(paymentFormSchema)
    })

    const handlePayment: SubmitHandler<ICard> = async data => {
        try {
            console.log('MREUS DADOS', data)

            const month = data.card_expiration_date.slice(0, 2)
            const year = data.card_expiration_date.slice(-2)

            const newData = {
                card_number: data.card_number,
                card_holder_name: data.card_holder_name,
                card_expiration_date: `${month}${year}`,
                card_cvv: data.card_cvv
            }

            console.log('Mey data::', newData)
            console.log(
                'My Key:',
                process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY
            )

            const cardHash = await pagarme.client
                .connect({
                    encryption_key:
                        process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY
                })
                .then(client => {
                    return client.security.encrypt(newData)
                })
                .then((card_hash: any) => {
                    return card_hash
                })

            console.log('Mey card_hash::', cardHash)

            const products = cart.map(product => {
                return {
                    amount: product.amount,
                    product_id: product.product.id
                }
            })

            await api.post('orders/checkouts', {
                freight: 0,
                products,
                token: cardHash,
                installments: selectedInstallment.value,
                payment_method_id: 'card'
            })

            router.push('/logged/payment/success')

            toast({
                title: 'Sucesso',
                description: 'Compra efetuada com sucesso!',
                status: 'success',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })

            //clear cart mongo
            clearCart()
            await api.get('/forgotten/carts/destroy')
        } catch (error) {
            console.log('Error::', error)
            toast({
                title: 'Erro na compra',
                description:
                    'Erro ao tenta processo a compra, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    const [selectedInstallment, setSelectedInstallment] =
        useState<IInstallment>({} as IInstallment)

    const renderInstallments = useMemo(() => {
        const meArray = [...new Array(numberOfInstallments)].map((_, idx) => {
            const installment = idx + 1
            const meTotal = formatPrice(
                Number(
                    total
                        .replace('R$', '')
                        .replace('.', '')
                        .replace(',', '.')
                        .trim()
                ) / installment
            )
            return {
                label: `${installment} x  ${meTotal}`,
                value: `${installment}`
            }
        })
        return meArray
    }, [numberOfInstallments, total])

    useEffect(() => {
        const meTotal = formatPrice(
            Number(
                total
                    .replace('R$', '')
                    .replace('.', '')
                    .replace(',', '.')
                    .trim()
            )
        )
        setSelectedInstallment({
            label: `1 x  ${meTotal}`,
            value: `1`
        })
    }, [numberOfInstallments, total])

    function handleSelectInstallments(event: IInstallment) {

        setSelectedInstallment(event)
    }

    return (
        <Flex
            m="0"
            as="form"
            width="100%"
            borderRadius="none"
            flexDir="column"
            onSubmit={handleSubmitPayment(handlePayment)}
        >
            <MeCard
                register={registerPayment}
                trigger={trigger}
                error={errorsPayment}
                handleSelectInstallments={handleSelectInstallments}
                renderInstallments={renderInstallments}
                selectedInstallment={selectedInstallment}
            />

            <Horizontal />
            <Center flex="1">
                <Box
                    w={{ base: '100%', md: '460px' }}
                    display="flex"
                    flexDir="column"
                >
                    <SimpleGrid columns={2} spacing={2} mt={6} mb={4}>
                        <Box
                            display="flex"
                            color="cinza.650"
                            fontSize="18px"
                            fontWeight="700"
                            flexDir="row"
                            alignContent="center"
                            justifyContent="left"
                            lineHeight="22.5px"
                        >
                            Total
                        </Box>
                        <Flex align="right" flexDir="column">
                            <Box
                                as="span"
                                color="cinza.650"
                                fontSize="18px"
                                fontWeight="700"
                                lineHeight="22.5px"
                                textAlign="right"
                            >
                                {total}
                            </Box>
                            <Box
                                as="span"
                                color="cinza.650"
                                fontSize="12px"
                                textAlign="right"
                            >
                                em {selectedInstallment.label} no cartão
                            </Box>
                        </Flex>
                    </SimpleGrid>

                    <Button
                        type="submit"
                        isLoading={isSubmittingPayment}
                        mt="20px"
                        colorScheme="white.900"
                        variant="solid"
                        leftIcon={
                            <BsFillBasket2Fill
                                fontSize="22px"
                                color="white.900"
                            />
                        }
                        justifyContent="center"
                        alignItems="center"
                        bg="principal.900"
                        w="100%"
                        h="54px"
                        _hover={{
                            opacity: 0.7,
                            textDecoration: 'none'
                        }}
                        _focus={{ boxShadow: 'outline' }}
                        borderRadius="none"
                    >
                        <Box
                            as="span"
                            fontSize="20px"
                            fontFamily="Inter"
                            lineHeight="18px"
                            fontWeight="500"
                            color="white.900"
                        >
                            fechar pedido
                        </Box>
                    </Button>
                </Box>
            </Center>
        </Flex>
    )
}

export { CartComponent }
