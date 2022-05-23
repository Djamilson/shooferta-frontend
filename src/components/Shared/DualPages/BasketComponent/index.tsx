import { ChevronRightIcon } from '@chakra-ui/icons'
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    usePrefersReducedMotion,
    useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import ICategory from '../../../../@model/category/category'
import { IMenuPolitics } from '../../../../@model/politic/menuPolitics'
import { INewProduct } from '../../../../@model/product/productCart'
import { Horizontal } from '../../../../components/Divider/Horizontal'
import { Footer } from '../../../../components/Footer'
import { Header } from '../../../../components/Header'
import { HeaderMessage } from '../../../../components/HeaderMessage'
import { MessageToastPersonality } from '../../../../components/MessageToastPersonality'
import { MenuCategory } from '../../../../components/SideBar/MenuCategory'
import { useAuth } from '../../../../contexts/auth'
import {
    TypeCategory,
    useCategories
} from '../../../../hooks/Entity/useCategories'
import { removeItemForgottenCarts } from '../../../../hooks/Entity/useForgottenCartAll'
import { usePolitics } from '../../../../hooks/Entity/usePolitics'
import { useCart } from '../../../../hooks/useCart'
import {
    itemAnimationLeft,
    itemAnimationRight,
    itemAnimationTop
} from '../../../../styles/animation'
import { formatPrice } from '../../../../utils/formatPrice'
import { ChakraLoading } from '../../../Loading/ChakraLoading'
import { Title } from '../../../Title'
import { Freight } from './Freight'
import { MeBasket } from './MeBasket'
import { OrderSummary } from './OrderSummary'

type IProps = {
    meInitCategories: ICategory[]
    meInitMenuPolitics: IMenuPolitics
}

function BasketComponent({ meInitCategories, meInitMenuPolitics }: IProps) {
    const router = useRouter()
    const toast = useToast()

    const { isAuthenticated, user } = useAuth()

    const { cart, removeProduct, updateProductAmount } = useCart()

    const {
        data: categories,
        isLoading: isLoadingCategories,
        isFetching: isFetchingCategories,
        error: errorCategories
    } = useCategories(TypeCategory.MENU, {
        initialData: { data: meInitCategories }
    })

    const {
        data: menusPolitics,
        isLoading: isLoadingMenuPolitics,
        isFetching: isFetchingMenuPolitics,
        error: errorMenuPolitics
    } = usePolitics({
        initialData: meInitMenuPolitics
    })

    async function handleProductIncrement(product: INewProduct) {
        const data = {
            product_id: product.product.id,
            amount: product.amount + 1,
            isAuthenticated
        }
        updateProductAmount(data)
    }

    async function handleProductDecrement(product: INewProduct) {
        const data = {
            product_id: product.product.id,
            amount: product.amount - 1,
            isAuthenticated
        }
        updateProductAmount(data)
    }

    async function handleRemoveProduct(productId: string) {
        removeProduct(productId, isAuthenticated)

        if (isAuthenticated) {
            removeItemForgottenCarts(productId)
        }
    }

    const cartFormatted = useMemo(
        () =>
            cart &&
            cart.map((item: INewProduct) => {
                const subtotal =
                    Number(item.product.price.price_promotion) > 0
                        ? Number(item.product.price.price_promotion) *
                          item.amount
                        : Number(item.product.price.price) * item.amount

                return {
                    subtotal: formatPrice(subtotal),
                    amount: item.amount,
                    product: {
                        ...item.product,
                        price: {
                            ...item.product.price,
                            price_promotion_format: formatPrice(
                                Number(item.product.price.price_promotion)
                            ),

                            price_format: formatPrice(
                                Number(item.product.price.price)
                            )
                        }
                    }
                }
            }),
        [cart]
    )

    function handleConfirmation() {
        if (isAuthenticated) {
            if (cart && cart.length > 0) {
                router.push(`/logged/payment/${user.person.id}`)
            } else {
                toast({
                    title: 'Atenção!',
                    description:
                        'Você ainda não tem produto na cesta, tente adicionar produto antes de continuar!',
                    status: 'warning',
                    duration: 3000,
                    position: 'top-right',
                    isClosable: true
                })
            }
        } else {
            router.push('/shared/signin')
        }
    }

    function handleAddProduct() {
        router.push(
            isAuthenticated
                ? `/collections/${categories[1].id}`
                : `/collection/${categories[1].id}`
        )
    }

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

    const prefersReducedMotion = usePrefersReducedMotion()

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationLeft} 1s`

    const animationRight = prefersReducedMotion
        ? undefined
        : `${itemAnimationRight} 1s`

    const animationItemAnimationTop = prefersReducedMotion
        ? undefined
        : `${itemAnimationTop} 300ms`

    return (
        <Flex
            display="flex"
            justifyContent="space-between"
            overflowX="hidden"
            flexDir="column"
            bg="cinza.400"
            p="0"
            m="0"
        >
            <HeaderMessage />
            <Header />
            {isLoadingCategories && <ChakraLoading />}
            {!!categories?.data && (
                <MenuCategory
                    categories={categories?.data}
                    animation={animationItemAnimationTop}
                    position="relative"
                />
            )}
            <Breadcrumb
                spacing="8px"
                shadow="md"
                separator={<ChevronRightIcon color="gray.500" />}
            >
                <BreadcrumbItem>
                    <BreadcrumbLink href="#">página inicial</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href="#">eletrônicos</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">Contact</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <MessageToastPersonality />

            <MessageToastPersonality />

            <Box p={6} display={{ md: 'flex' }}>
                <Box
                    mt={{ base: 4, md: 0 }}
                    p={{ base: 4, md: 6 }}
                    bg="white.900"
                    color="cinza.825"
                    flex="1"
                    animation={animationLeft}
                >
                    <Title>minha cesta</Title>
                    <MeBasket
                        cartFormatted={cartFormatted}
                        handleProductIncrement={handleProductIncrement}
                        handleProductDecrement={handleProductDecrement}
                        handleRemoveProduct={handleRemoveProduct}
                    />
                    <Horizontal />
                    <Freight status_freight={true} />
                </Box>

                <OrderSummary
                    total={total}
                    totalQt={totalQt}
                    handleAddProduct={handleAddProduct}
                    handleConfirmation={handleConfirmation}
                    animation={animationRight}
                    personId={user?.person.id}
                />
            </Box>

            {isLoadingMenuPolitics && <ChakraLoading />}

            {!!categories?.data && !!menusPolitics && (
                <Footer
                    categories={categories.data}
                    menusPolitics={menusPolitics}
                />
            )}
        </Flex>
    )
}

export { BasketComponent }
