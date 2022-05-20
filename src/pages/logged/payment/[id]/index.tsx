import { AddIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  TabList,
  TabPanel,
  TabPanels,
  Tabs, useDisclosure,
  useTheme,
  useToast
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { shade } from 'polished'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsExclamationLg } from 'react-icons/bs'
import * as yup from 'yup'
import { IPerson } from '../../../../@model/person/person'
import { INewProduct } from '../../../../@model/product/productCart'
import { AddressModal } from '../../../../components/Address/AddressModal'
import { DisplayAddress } from '../../../../components/Address/DisplayAddress'
import { Horizontal } from '../../../../components/Divider/Horizontal'
import { Input } from '../../../../components/Form/Input'
import { Header } from '../../../../components/Header'
import { CartComponent } from '../../../../components/payment/CartComponent'
import { PurchaseSummary } from '../../../../components/payment/PurchaseSummary'
import { TabCar } from '../../../../components/payment/TabCard'
import { Title } from '../../../../components/Title'
import { useLocalization } from '../../../../contexts/localization'
import { usePersonById } from '../../../../hooks/Entity/useUsers'
import { useCart } from '../../../../hooks/useCart'
import { formatPrice } from '../../../../utils/formatPrice'
import { withSSRAuth } from '../../../../utils/withSSRAuth'

const cuoponFormSchema = yup.object().shape({
    cuopon: yup
        .string()
        .required('digite o código do seu cupom ou vale é obrigatório!')
})

type CuoponFormData = {
    cuopon: string
}

type InputProps = (data: string, val: string) => void

type IProps = {
    meInitPerson: IPerson
}

type CepFormData = {
    zipCode: string
}

export default function Payment({ meInitPerson }: IProps) {
    const [isActive, setIsActive] = useState<boolean>(true)
    const theme = useTheme()
    const toast = useToast()
    const { cart } = useCart()

    function handleCloseButton() {
        setIsActive(false)
    }

    function handleAddress() {
        //onOpen()
        //router.push('/shared/signin')
    }

    const [value, setValue] = useState('1')

    const {
        register: registerCuopon,
        handleSubmit: handleSubmitCuopon,
        formState: { errors: errorsCuopon }
    } = useForm<CuoponFormData>({
        resolver: yupResolver(cuoponFormSchema)
    })

    const handleCuopon: SubmitHandler<CuoponFormData> = async data => {
        try {
            console.log('SEU Cuopon', data)
        } catch {
            toast({
                title: 'Erro de Cuopon.',
                description:
                    'Cálculo de frete indisponível no momento, tente novamente!',
                status: 'error',
                duration: 3000,
                position: 'top-right',
                isClosable: true
            })
        }
    }

    const [tabIndex, setTabIndex] = useState(0)

    const confirm = data => console.log(data)

    const cardNumberRef = useRef(false)
    const [useInstallments, setInstallments] = useState([
        {
            installments: 1,
            recommended_message: 'Parcelas'
        }
    ])

    const total = useMemo(
        () =>
            cart &&
            formatPrice(
                cart.reduce((sumTotal: number, productCart: INewProduct) => {
                    const subtotal =
                        Number(productCart.product.price.price_promotion) > 0
                            ? Number(
                                  productCart.product.price.price_promotion
                              ) * productCart.amount
                            : Number(productCart.product.price.price) *
                              productCart.amount

                    return sumTotal + subtotal
                }, 0)
            ),
        [cart]
    )

    const totalQt = useMemo(
        () =>
            cart &&
            cart.reduce((sumQt: number, productCart: INewProduct) => {
                return sumQt + productCart.amount
            }, 0),
        [cart]
    )

    const {
        isOpen: isOpenAddress,
        onOpen: onOpenAddress,
        onClose: onCloseAddress
    } = useDisclosure()

    const router = useRouter()
    const { id } = router.query

    const {
        data: person,
        isLoading: isLoadingPerson,
        isFetching: isFetchingPerson,
        error: errorPerson
    } = usePersonById(String(id), {
        initialData: meInitPerson
    })

    useEffect(() => {

      console.log("Person:::",person)
        if (person && !person?.address_id) {
        onOpenAddress()
         }
    }, [person])

    const {
        getLocalization,
        getFreight,
        isLocalization,
        setLocalization,
        localed
    } = useLocalization()

    async function handleSubmitCep(zipCode: CepFormData) {
        try {
            const melocalizantion = await getLocalization(zipCode)
            console.log('Estou com endereço', melocalizantion)

            const newLocalizationFreight = await getFreight(melocalizantion)

            setLocalization(newLocalizationFreight)
        } catch (error) {
            console.log('error na busca do endereço', error)
        }
    }

    return (
        <Flex direction="column" flex="1" bg="white.900">
            <Header />
            <Flex
                w="100%"
                my="6"
                maxWidth={1440}
                flexDir="column"
                mx="auto"
                px="6"
                color="cinza.825">
                <SimpleGrid flex="1" gap="4" minChildWidth="320px">
                    <Box
                        mt={{ base: 4, md: 0 }}
                        p={{ base: 4, md: 6 }}
                        bg="white.900">
                        <Title
                            fontSize={{
                                base: '14px',
                                md: '16px',
                                lg: '18px'
                            }}>
                            endereço de entrega
                        </Title>
                        <AddressModal
                            isOpen={isOpenAddress}
                            onClose={onCloseAddress}
                            handleSubmitCep={handleSubmitCep}
                            isLocalization={isLocalization}
                            localed={localed}
                        />
                        <Horizontal />
                        {isActive && (
                            <Box
                                h="64px"
                                w="100%"
                                pl={6}
                                pr={4}
                                flex="1"
                                display="flex"
                                alignItems="center"
                                borderRadius="none"
                                bg="reviews.850"
                                color="cinza.650"
                                _hover={{
                                    bg: shade(
                                        0.2,
                                        `${theme.colors.reviews[850]}`
                                    ),
                                    textDecoration: 'none'
                                }}
                                _focus={{ boxShadow: 'outline' }}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignContent="center"
                                    flex="1">
                                    <Icon
                                        as={BsExclamationLg}
                                        color="reviews.900"
                                        fontSize={23}
                                        mt={1}
                                    />
                                    <Box
                                        display="flex"
                                        alignItems="left"
                                        flexDir="column">
                                        <Box
                                            as="span"
                                            px={4}
                                            fontWeight="400"
                                            fontSize="12px">
                                            faz tempo que não compra com a
                                            gente?
                                        </Box>
                                        <Box
                                            as="span"
                                            px={4}
                                            fontWeight="400"
                                            fontSize="12px">
                                            revise seu endereço para evitar
                                            problemas na entrega.
                                        </Box>
                                    </Box>
                                    <IconButton
                                        onClick={() => handleCloseButton()}
                                        aria-label="Close"
                                        icon={<AddIcon />}
                                    />
                                </Box>
                            </Box>
                        )}
                        <DisplayAddress
                            person={person}
                            handleAddress={handleAddress}
                        />
                    </Box>

                    <PurchaseSummary
                        totalQt={totalQt}
                        total={total}
                        handleAddress={handleAddress}
                    />
                </SimpleGrid>

                <Box flex="1" m={{ base: 4, md: 6 }}>
                    <Horizontal />

                    <Title
                        fontSize={{
                            base: '14px',
                            md: '16px',
                            lg: '18px'
                        }}>
                        opções de frete
                    </Title>

                    <RadioGroup onChange={setValue} value={value}>
                        <Stack
                            border="1px solid"
                            borderColor="principal.900"
                            spacing={[1, 5]}
                            maxW="200px"
                            mt={{ base: 4, md: 6 }}
                            p={{ base: 4, md: 6 }}
                            direction={['column', 'row']}>
                            <Radio value="1" />

                            <Box as="span" pl={2}>
                                receba até 09 de de fevereiro
                            </Box>
                        </Stack>
                    </RadioGroup>
                    <Horizontal />

                    <Accordion
                        allowToggle
                        color="cinza.650"
                        borderRadius="none">
                        <AccordionItem border="none">
                            <h2>
                                <AccordionButton>
                                    <Box
                                        flex="1"
                                        display="flex"
                                        py={2}
                                        mr="auto"
                                        alignItems="center"
                                        justifyContent="space-between">
                                        <Title
                                            ml={-4}
                                            fontSize={{
                                                base: '14px',
                                                md: '16px',
                                                lg: '18px'
                                            }}>
                                            possui cupom ou vale?
                                        </Title>
                                        <AccordionIcon fontSize={30} />
                                    </Box>
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} px={{ base: 4, md: 10 }}>
                                <Box
                                    w="100%"
                                    display="flex"
                                    flexDir="column"
                                    mt={6}>
                                    <Box
                                        as="form"
                                        width="100%"
                                        maxWidth={460}
                                        borderRadius="none"
                                        mt="2"
                                        mb={4}
                                        onSubmit={handleSubmitCuopon(
                                            handleCuopon
                                        )}>
                                        <Box display="flex">
                                            <Input
                                                label="digite o código do seu cupom ou vale"
                                                name="cuopon"
                                                placeholder="Digite o Cupom"
                                                borderColor={`${theme.colors.cinza[700]}`}
                                                borderWidth="1px"
                                                {...registerCuopon('cuopon', {
                                                    required: true
                                                })}
                                                error={errorsCuopon.cuopon}
                                            />
                                            <Box display="flex" mt="10px">
                                                <Button
                                                    type="submit"
                                                    ml={2}
                                                    mt="14px"
                                                    borderRadius="none"
                                                    w="150px"
                                                    h="50px"
                                                    color="principal.900"
                                                    colorScheme="teal"
                                                    variant="outline">
                                                    aplicar
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <Horizontal />

                    <Title
                        fontSize={{
                            base: '14px',
                            md: '16px',
                            lg: '18px'
                        }}
                        mb={6}>
                        formas de pagamento
                    </Title>

                    <Tabs
                        defaultIndex={0}
                        onChange={index => {
                            setTabIndex(index)
                        }}
                        variant="line"
                        id="table01">
                        <TabList>
                            <TabCar
                                tabIndex={tabIndex}
                                domain={0}
                                title="Cartão de crédito"
                            />
                            <TabCar
                                tabIndex={tabIndex}
                                domain={1}
                                title="Boleto"
                            />
                            <TabCar
                                tabIndex={tabIndex}
                                domain={2}
                                title="Pix"
                            />
                        </TabList>

                        <TabPanels>
                            <TabPanel mt="24px" p="0" alignItems="center">
                                <Box
                                    flex="1"
                                    justifyContent="center"
                                    display="flex">
                                    <CartComponent total={total} />
                                </Box>
                            </TabPanel>
                            <TabPanel mt="24px" p="0"></TabPanel>
                            <TabPanel mt="24px" p="0"></TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </Flex>
    )
}

export const getServerSideProps = withSSRAuth(
    async ctx => {
        return {
            props: {}
        }
    },
    {
        roles: ['Colaborador']
    }
)
