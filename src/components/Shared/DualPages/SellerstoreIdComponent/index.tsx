import { ChevronRightIcon, Icon } from '@chakra-ui/icons'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Image,
  Text,
  usePrefersReducedMotion
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { BsFillBasket2Fill } from 'react-icons/bs'
import { FiPackage } from 'react-icons/fi'
import ICategory from '../../../../@model/category/category'
import { IMenuPolitics } from '../../../../@model/politic/menuPolitics'
import IProduct from '../../../../@model/product/product'
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
import { usePolitics } from '../../../../hooks/Entity/usePolitics'
import { useDetailsProductByProductId } from '../../../../hooks/Entity/useProducts'
import { useCart } from '../../../../hooks/useCart'
import {
  itemAnimationLeft,
  itemAnimationRight,
  itemAnimationTop
} from '../../../../styles/animation'
import { ChakraLoading } from '../../../Loading/ChakraLoading'

type IProps = {
    meInitCategories: ICategory[]
    meInitProduct: IProduct
    meInitMenuPolitics: IMenuPolitics
}

export default function SellerStoreIdComponent({
    meInitCategories,
    meInitProduct,
    meInitMenuPolitics
}: IProps) {
    const router = useRouter()
    const { id } = router.query

    const { isAuthenticated } = useAuth()
    const { addProduct } = useCart()

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

    const {
        data: product,
        isLoading: isLoadingProduct,
        isFetching: isFetchingProduct,
        error: errorProduct
    } = useDetailsProductByProductId(String(id), {
        initialData: meInitProduct
    })

    async function handleAddBasket(id: string) {
        try {
            await addProduct({
                productId: id,
                href: isAuthenticated ? `/baskets` : `/basket`,
                isAuthenticated
            })
        } catch (err) {
            console.log('Vamos começar a corrigir', err)
        }
    }

    const prefersReducedMotion = usePrefersReducedMotion()

    const animationLeft = prefersReducedMotion
        ? undefined
        : `${itemAnimationLeft} 1s`

    const animationRight = prefersReducedMotion
        ? undefined
        : `${itemAnimationRight} 1s`

    const animationItemAnimationTop = prefersReducedMotion
        ? undefined
        : `${itemAnimationTop} 1s`

    return (
        <Flex
            display="flex"
            justifyContent="space-between"
            overflowX="hidden"
            flexDir="column"
            bg="cinza.400"
            p="0"
            m="0">
            <HeaderMessage />
            <Header />

            {isLoadingCategories && <ChakraLoading />}
            {!!categories?.data && (
                <MenuCategory
                    categories={categories?.data}
                    animation={animationItemAnimationTop}
                    position="fixed"
                />
            )}
            <Breadcrumb
                spacing="8px"
                shadow="md"
                separator={<ChevronRightIcon color="gray.500" />}>
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

            <Flex w="100%" my="6" maxWidth={1440} mx="auto" px="6">
                <Box
                    p={4}
                    flex="1"
                    display={{ md: 'flex', sm: 'flex' }}
                    bg="white.900">
                    <Box animation={animationLeft}>
                        {product?.thumbnail_url ? (
                            <Image
                                width={{ md: 40, sm: 40 }}
                                src={product?.thumbnail_url}
                                alt={product?.subcategory.name}
                            />
                        ) : (
                            <Icon
                                as={FiPackage}
                                color="red.500"
                                w={200}
                                h={200}
                                py={12}
                            />
                        )}

                        <Text
                            maxWidth={{ md: 200 }}
                            mt={6}
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="18px"
                            color="cinza.800"
                            letterSpacing="wide"
                            fontSize="14"
                            noOfLines={[1, 3]}>
                            {product?.subcategory.name}
                        </Text>
                    </Box>
                    <Box
                        flex={1}
                        display={{ sm: 'flex' }}
                        mt={{ base: 4, md: 0 }}
                        ml={{ md: 6 }}
                        mb={{ base: 6, md: 0 }}
                        pl={{ md: 40, sm: 40 }}
                        alignItems="flex-start"
                        justifyContent="center"
                        flexDir="column"
                        animation={animationItemAnimationTop}>
                        <Box
                            letterSpacing="wide"
                            fontFamily="inter"
                            fontWeight="700"
                            color="cinza.900"
                            fontSize="48px"
                            lineHeight="52px">
                            oooba,
                        </Box>
                        <Box
                            as="span"
                            color="cinza.900"
                            fontFamily="inter"
                            fontWeight="700"
                            fontSize="24px">
                            o produto tá quase na cesta {`:)`}
                        </Box>
                    </Box>

                    <Box
                        mt={{ base: 1, md: 0 }}
                        px={{ base: 0, md: 6, sm: 8 }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        animation={animationRight}>
                        <Button
                            leftIcon={<BsFillBasket2Fill fontSize="22px" />}
                            justifyContent="center"
                            alignItems="center"
                            bg="principal.900"
                            w="100%"
                            h="48px"
                            _hover={{
                                opacity: 0.7,
                                textDecoration: 'none'
                            }}
                            _focus={{ boxShadow: 'outline' }}
                            onClick={() => handleAddBasket(product.id)}
                            borderRadius="none">
                            <Box
                                as="span"
                                fontSize="20px"
                                fontFamily="Inter"
                                lineHeight="18px"
                                fontWeight="500"
                                color="white.900">
                                ir para a cesta
                            </Box>
                        </Button>
                    </Box>
                </Box>
            </Flex>

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

export { SellerStoreIdComponent }
